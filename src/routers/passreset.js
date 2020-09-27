const express = require('express')
	, router = express.Router()
    , nodemailer=require('nodemailer')

let otp={};
router.post('/checkPass', (req, res) => {
    res.send({status:"success"})
   
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
    to: 'karansehgal151998@gmail.com',
    subject: 'Password Reset Mail',
    text: ''
  };
  


router.post('/',  async(req,res)=>{
    try{
       console.log("post recieved");
       code="";
       for(let i=0;i<6;i++){
            code+=Math.floor(Math.random() * 10);
       }
       otp[req.body.email]=code;
       mailOptions.text="your authentication code is: "+code;
       transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
       console.log(req.body.email);
    }
    catch(err)
    {
        console.log("updation failed");
    }
})

module.exports = router;
