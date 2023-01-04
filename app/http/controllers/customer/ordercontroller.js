const Orders = require('../../../models/orders');
const moment = require('moment');
const orderController = () => {
    return {
async order(req, res) {
    try {
    const {phone, address} = req.body; 

    if(!phone || !address)
    {
        res.redirect('/cart');
    }
    else
    {
    const data = new Orders({
        customer_id: req.cookies.key,
        phone: phone,
        address: address,
        items: req.session.cart.items
    })

    await data.save();
    delete req.session.cart;
    req.flash('success', "Order placed successfully");
    res.redirect('/customer/orders');
    //req.session.destroy();
}
    }
catch(e) {
    console.log(e);
    res.redirect('/cart');
}
},
     async index(req, res) {
        const data = await Orders.find({customer_id: req.cookies.key}, null, { sort: ({"createdAt": -1}) } );
        res.render('customers/orders', {data, moment});
      },

     async track(req, res) {
        const data = await Orders.findById(req.params.id);
        res.render('customers/singleOrder', {order: data});
     }
    }
}

module.exports = orderController;