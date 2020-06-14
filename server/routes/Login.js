const router = require('express').Router();
const User = require('../models/user.model.js')

router.route('/').post((req,res)=>{
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    User.countDocuments({'email': email, 'password': password})
    .then(count => {
        console.log(count)
        if (count == 0){
            res.json('no');
        }
        else{
            User.findOne({'email': email, 'password': password})
                .then(user =>{
                    res.json(user)
                })
        }
    })
    .catch(err => { res.status(400).json({ message: "" + err }) });
})

module.exports = router;