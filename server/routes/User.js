const router = require('express').Router();

router.route('/').get((req,res) => {
    User.find()
        .then(users =>{
            res.json(users)
        })
})
router.route('/add').post((req,res)=>{
    const userData = req.body;
    User.countDocuments({'email': userData.email })
        .then(count => {
            if (count == 0){
                const newUser = new User(userData);
                newUser.save()
                    .then(() => res.json('success'))
            }
            else{
                res.json('duplicate')
            }
        })
        .catch(err => { res.status(400).json({ message: "" + err }) });
})

module.exports = router;