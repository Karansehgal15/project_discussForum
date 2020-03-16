const route=require('express').Router()
, {createUserLocal,findUserById, findUserByParams} = require('../controllers/user')

route.get('/',(req,res)=>{
    res.redirect('newprofile.html');
})

route.get('/data',async(req,res)=>{
    try {
        let fname=req.user.firstName;                       let lname=req.user.lastName;
        let mob=req.user.mobile_number;                     let prof=req.user.empDet;                           
        let state=req.user.state;                           let city=req.user.city;
        let hobbies=req.user.hobbies;                       let zip=req.user.zip;
        let socialH=req.user.socialH;                       let edu=req.user.eduDet;
        let mail=req.user.email;
        let obj={lname:lname,fname:fname,mob:mob,prof:prof,mail:mail,state:state,zip:zip,city:city,hobbies:hobbies,socialH:socialH,edu:edu};
        res.send(obj);
    }
    catch (err) {
        console.log("not able to fetch data");
    }
    
})

route.post('/updatePersonalDet',async(req,res)=>{
    try{
      
        const user=await findUserByParams({email:req.user.email});
        user.update({   state:req.body.state, city:req.body.city, zip:req.body.zip, email:req.body.email,mobile_number:req.body.mobno,
                        firstName:req.body.firstName,lastName:req.body.lastName ,empDet:req.body.prof},
                        {fields:['state','city','zip','email','mobile_number','firstName','lastName','empDet']}).then(
                    ()=>{});

        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})
route.post('/updateHobDet',async(req,res)=>{
    try{
      
        const user=await findUserByParams({email:req.user.email});
        user.update({   hobbies:req.body.hobbies},{fields:['hobbies']}).then(()=>{});
        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})
route.post('/updateEduDet',async(req,res)=>{
    try{
        console.log("my edu:")
        const user=await findUserByParams({email:req.user.email});
        user.update({   eduDet:req.body.eduDet},{fields:['eduDet']}).then(()=>{});
        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})
route.post('/updateSocialHDet',async(req,res)=>{
    try{
      
        const user=await findUserByParams({email:req.user.email});
        user.update({   socialH:req.body.socialH},{fields:['socialH']}).then(()=>{});
        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})

module.exports=route