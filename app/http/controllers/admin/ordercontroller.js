const moment = require('moment');

const Orders = require('../../../models/orders');

const orderController = () => {
    return {
        async orderadmin(req, res) {
            const data = await Orders.find({'status': {$ne: 'Completed'}}, null, {sort: {'createdAt': -1}}).populate('customer_id', '-password');
            if(req.xhr) {
                return res.json(data)
            } else {
             return res.render('admin/orders')
            }
        }
    }
}

module.exports = orderController;