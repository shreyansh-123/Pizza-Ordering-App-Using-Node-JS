const User = require("../../models/user")

const admin = async (req, res, next) => {
    try {
        if(req.cookies.key)
        {
    const data = await User.findById(req.cookies.key);
    if(data.role == 'admin')
    {
        next();
    }
    else{
        res.redirect('/customer/orders');
    }
        }
        else
        {
            res.redirect('/customer/orders');
        }
    }
    catch (e) {
        res.redirect('/');
    }
} 

module.exports = admin;