const express = require('express')
	, router = express.Router()
  , nodemailer=require('nodemailer')
  , {createUserLocal, findUserByParams} = require('../controllers/user')
	, {pass2hash} = require('../utils/passwordUtils')

let otp={};
router.post('/checkPass', async (req, res) => {
   console.log(req.body.otp);
   console.log(otp[req.body.email]);
  if(req.body.otp==otp[req.body.email]){
    const user = await findUserByParams({email: req.body.email});
    const passhash = await pass2hash(req.body.pass);
    user.update({password:passhash },{fields:['password']}).then(()=>{});
    res.send({status:"success"});
  }else{
    res.send({status:"failed"});
  }
  
 
   
})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'servicefromlivediscussion@gmail.com',
      pass: 'ourweb#7'
    }
  });
  
  var mailOptions = {
    from: 'servicefromlivediscussion@gmail.com',
    to: '',
    subject: 'Password Reset Mail',
    text: ''
  };
  


router.post('/',  async(req,res)=>{
    try{
    
       code="";
       for(let i=0;i<6;i++){
            code+=Math.floor(Math.random() * 10);
       }
       otp[req.body.email]=code;
       mailOptions.text="your authentication code is: "+code;
       mailOptions.to=req.body.email;
       transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
    }
    catch(err)
    {
        console.log("updation failed");
    }
})

module.exports = router;
