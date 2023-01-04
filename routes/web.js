const Controller = require('../app/http/controllers/homecontroller');
const authController = require('../app/http/controllers/authcontroller');
const cartController = require('../app/http/controllers/customer/cartcontroller');
const orderController = require('../app/http/controllers/customer/ordercontroller');
const adminorderController = require('../app/http/controllers/admin/ordercontroller');
const statusController = require('../app/http/controllers/admin/statuscontroller');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');

const routes = (app) => {
    app.get('/', auth, Controller().index)
    
    app.get('/cart', auth, cartController().cart)

    app.post('/update-cart', auth, cartController().update)
    
    app.get('/login', authController().login)

    app.post('/login', authController().postlogin)

    app.get('/logout', authController().logout)
    
    app.get('/register', authController().register)

    app.post('/register', authController().postregister)

    app.post('/order', auth, orderController().order)

    app.get('/customer/orders', auth, orderController().index)

    app.get('/customer/orders/:id', auth, orderController().track)

    app.get('/admin/orders', admin, adminorderController().orderadmin)

    app.post('/admin/order/status', admin, statusController().orderstatus)
}

module.exports = routes;