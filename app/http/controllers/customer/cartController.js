const cartControllers = () => {
    return {
        cart(req, res) {
            res.render('customers/cart');
        },

        update(req, res) {
            if(!req.session.cart)
            {
                req.session.cart = {
                    items: {},
                    totalqty: 0,
                    total: 0
                }
            }
            const cart = req.session.cart;
            if(!cart.items[req.body._id])
            {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalqty = cart.totalqty + 1;
                cart.total = cart.total + req.body.price;
            }
            else
            {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalqty = cart.totalqty + 1;
                cart.total = cart.total + req.body.price;
            }

           return res.json({totalqty: req.session.cart.totalqty});
        }
    }
}

module.exports = cartControllers;