const Order = require('../../../models/orders');
const status = () => {
    return {
        orderstatus(req,res) {
            Order.updateOne({_id: req.body.orderId}, {status: req.body.status}, (er, data) => {
                if(er)
                {
                    console.log(req.body.status);
                }
                res.redirect('/admin/orders');
            })
        }
    }
}

module.exports = status;