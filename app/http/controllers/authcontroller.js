const data = require('../../models/user');
const bcrypt = require('bcrypt');

const authControllers = () => {
    return {
        login(req, res) {
                res.render('auth/login');
        },

        register(req, res) {
            res.render('auth/register');
        },

       async postregister(req, res) {
            const {name, email, password} = req.body;
            if(!name || !email || !password)
            {
                req.flash('error', "All fields are required");
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            data.exists({email: email}, (e, r) => {
                if(r)
                {
                    {
                        req.flash('error', "Email already exists");
                        req.flash('name', name);
                        req.flash('email', email);
                        return res.redirect('/register');
                    }
                }
            })


            try {
            const hashpass = await bcrypt.hash(password, 8);
            const User = new data({
                name,
                email,
                password: hashpass
            })

            const save = await User.save();
            res.redirect('/login');
        }
        catch(e) {
            req.flash('error', "Somthing went wrong");
            res.redirect('/login');
            console.log(e);
        }
        },

        async postlogin(req, res) {
            try {
            const {email, password} = req.body;

            const finddata = await data.findOne({email});
            console.log(finddata);
            if(!finddata)
            {
                req.flash('error', "Invalid Email or Password");
                req.flash('email', email);
                res.redirect('/login');
            }
            else {
           const match = await bcrypt.compare(password, finddata.password);

            if(!match)
            {
                req.flash('error', "Invalid Email or Password");
                req.flash('email', email);
                res.redirect('/login');
            }
            else {
                res.cookie('key', finddata._id);
                console.log(match._id);
                res.redirect('/');
            }
        }
    }
    catch (e) {
        res.redirect('/login');
        req.flash('error', "Something went wrong");
    }
        },

        logout(req, res) {
            res.clearCookie('key');
            req.session.destroy();
            res.redirect('/login');
        }
    }
    
}

module.exports = authControllers;