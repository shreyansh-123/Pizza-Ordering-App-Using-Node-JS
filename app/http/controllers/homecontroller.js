const Menu = require('../../models/menu');
const Controller = () => {
    return {
        async index (req, res) {
            const pizza = await Menu.find();
            console.log(pizza);
            res.render('home', {pizza:pizza});
        }
    }
}

module.exports = Controller;