const express = require('express')
	, signupRoute = require('./src/routers/signup')
	, loginRoute=require('./src/routers/login')
	, logoutRoute = require('./src/routers/logout')
	, homeRoute = require('./src/routers/home')
	, cardRoute= require('./src/routers/card')
	, userRoutes = require('./src/routers/users')
	, searchRoute = require('./src/routers/search')
	, chatroomRoute = require('./src/routers/chatroom')
	, passresetRoute = require('./src/routers/passreset')
	, profileRoute = require('./src/routers/profile')
	, infoRoute = require('./src/routers/aboutus')
	, passport = require('passport')
	, { localLogin } = require('./src/passport/passporthandler')
	, session = require('cookie-session')
	, parser=require('cookie-parser')
	, path = require('path')
	, SocketIO=require('socket.io')
	, http=require('http')
	, {	getMessagesByRoomId,createMessage} = require('./src/controllers/message')
	, { updateUserParticipationData, updateUserLastMsgForCard } = require('./src/controllers/user')
	, { updateCardLastMsg } = require('./src/controllers/card');

const app = express()  			//creates server
app.use(parser('78500013de3ad7e727718102f8137ffd31ec2490adf9a739'))
const httpServer=http.createServer(app);
const io=SocketIO(httpServer);

app.set('view engine', 'ejs'); 	app.set('views','./src/views'); //code to handle ejs files
app.use(express.static(path.join(__dirname, './src/public')));   // to set src/public folder to lookup for static files
app.use(express.static(path.join(__dirname, './assets/images')));
app.use(express.json());	app.use(express.urlencoded({extended: true}))  // code to read post request


app.use(session({
	secret: '78500013de3ad7e727718102f8137ffd31ec2490adf9a739',
	name: 'session',
	maxAge: 30*24*60*60*1000,	// cookies will be removed after 30 days
	secure: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use('local', localLogin);

// Setting base directory
global.__basedir = __dirname;

// ROUTES THAT SHOULD NOT CALL THE MIDDLEWARES WRITTEN BELOW ==============================================================
app.use('/signup', signupRoute);
app.use('/login',loginRoute);


let usersockets = {};
let cardLastMessage={};
let activeUsers = {};
let soctochat = {};
let trendingCount = [];
let loggedInUser;

// MIDDLEWARES ==============================================================

function trendingCounter(req, res, next) {
	if(trendingCount != null) {
		res.cookie('trendingCount', trendingCount);
	}
	else {
		trendingCount = req.cookies.trendingCount;
	}
	next();
}

function saveTrendingCounter(req, res, next) {
	res.cookie('trendingCount', trendingCount);
	next();
}

function getLoggedInUser(req, res, next) {
	loggedInUser = req.user;
	next();
}

app.use(getLoggedInUser);
app.use(trendingCounter);


// ROUTES ==============================================================
app.use('/passreset',passresetRoute);
app.use('/logout', logoutRoute);
app.use('/profile', profileRoute);
app.use('/users', userRoutes);
app.use('/card',cardRoute);
app.use('/search', searchRoute);
app.use('/chatroom', chatroomRoute);
app.use('/about',infoRoute);
app.use('/', homeRoute);



// TEST DB ==============================================================
const {db} = require('./src/db/database')





// WEBSOCKETS ==============================================================


io.on('connection', (socket) => {

    socket.emit('connected')
    socket.on('send_msg', async (data) => {
        // if we use io.emit, everyone gets it
		// if we use socket.broadcast.emit, only others get it
		usersockets[data.user] = socket.id
 		if(data.message=="inc#U")
 		{
 		
			if(data.cardId in activeUsers)
			activeUsers[data.cardId]+=1;
			else
			activeUsers[data.cardId]=1;

			// Logic for handling trending cards
			let item = null;
			trendingCount.forEach(card => {
				if(card.id == data.cardId)
					item = card;
			})
			if(item == null)
				trendingCount.push({"id": data.cardId, "freq": 1});
			else
				item.freq++;

			app.use(saveTrendingCounter);		// Updates session with latest data
			soctochat[socket.id]=data.cardId;
			data["activeId"]=activeUsers[data.cardId]-1;
            io.emit('recv_msg', data);
		}
		else
		{
			
			const done = await createMessage({message:data.message,author:data.user, roomID:data.cardId, uid:data.uid});
        	if (data.message.startsWith('@')) {
				//data.message = "@a: hello"	// split at :, then remove @ from beginning
            	let recipient = data.message.split(':')[0].substr(1)
            	let rcptSocket = usersockets[recipient]
            	io.to(rcptSocket).emit('recv_msg', data)
			}
			else {
				cardLastMessage[data.cardId]=done.mid;
				data["activeId"]=activeUsers[data.cardId]-1;
            	io.emit('recv_msg',data);
			}
			// Updates current user's participated cards info in the DB
			await updateUserParticipationData(loggedInUser, data.cardId, done.mid);
		}
	})
	socket.on('disconnecting', async(reason) => {
		let cardID = soctochat[socket.id];
		// update state table for user
		if(cardLastMessage[cardID]){
			await updateCardLastMsg(cardID, cardLastMessage[cardID]);
			await updateUserLastMsgForCard(loggedInUser, cardID, cardLastMessage[cardID]);
		}
		// Update active users count
		activeUsers[cardID] = activeUsers[cardID]-1;
	  });

})



//activation of port
const PORT = process.env.PORT || 2121;
httpServer.listen(PORT, console.log(`Server started on port ${PORT}`))
