const router= require('express').Router();
router.post('/login',(req,res)=>{
    res.send('login successful');
})
router.post('/signup',(req,res)=>{
    res.send('signup successful');
})
module.exports=router;
