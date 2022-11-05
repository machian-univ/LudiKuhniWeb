'use strict'

const User = require("../Models/User")

exports.getMainPage = (req, res) => {

    // Создаётся объект promise
    var test
    let promise = new Promise((resolve) => {
    // Тут должна быть ваша функция, из-за которой весь код будет приостановлен
    
    test = User.findByEmail("test1@mail.ru");
     setTimeout(() => {
        resolve(1);
     }, 1000)
    //Как только функция завершила свое действие, вызываем следующий метод, который продолжит выполнение кода:
    }).then(() => {console.log(test.NAME)})
    
    res.sendFile("/Views/mainPage.html", { root: __dirname })
}