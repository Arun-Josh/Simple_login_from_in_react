const router = require('express').Router();

router.route('/').post((req,res)=>{
    console.log(req)
})

module.exports = router;