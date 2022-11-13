'use strict'
const db = require('../settings/db');

exports.getHomePage = async (req, res) => {

    var orderList
    
    const userID = req.session.passport.user
    let result = await db.awaitQuery("SELECT * FROM orders WHERE userID = ?", [userID])
    if(result.length) {

        orderList = await Promise.all(result.map(async (orderItem) => {
    
            var order = {
            title: orderItem.title,
            discription: orderItem.discription,
            status: undefined
            }
            
            const statusID = orderItem.statusID
            let result = await db.awaitQuery("SELECT * FROM statuses WHERE id = ?", [statusID])
            order.status = result[0].title
    
            return order
        }))
    
        res.send(orderList)
    } else {

        res.send("Пока Ваш список заказов пуст!")
    }
    
}