const User = require("../../models/user")

const auth = async (req, res, next) => {
    try {
        if(req.cookies.key)
        {
    const data = await User.findById(req.cookies.key);
        }
        else
        {
            res.redirect('/login');      
        }
        next();
    }
    catch (e) {
        res.redirect('/login');
        console.log(req.cookies);
    }
} 

module.exports = auth;