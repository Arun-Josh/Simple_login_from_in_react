const router = require('express').Router();

router.route('/').post((req,res)=>{
    console.log(req.body)
    res.status(200).json("success")
})

module.exports = router;