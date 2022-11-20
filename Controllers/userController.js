'use strict'

const db = require('../settings/db');

exports.getHomePage = async (req, res) => {

    const username = req.user.name
    const userID = req.user.id
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

        result = orderList
    } 

    res.render('../Views/pug/user.pug', {
        orders: result, 
        message: "Пока Ваш список заказов пуст!", 
        name_user: username
    })
}