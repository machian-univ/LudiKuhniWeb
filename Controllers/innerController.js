'use strict'

const User = require("../Models/User")

exports.getMainPage = (req, res) => {
    
    // res.sendFile("/Views/mainPage.html", { root: 'C:/Users/machy/VSCProjects/LudiKuhniWeb' })
    // res.sendFile("/Views/build/index_main.html", { root: __dirname })

    
    res.render("../Views/pug/index_main")
}