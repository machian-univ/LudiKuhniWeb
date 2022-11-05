'use strict'

exports.getHomePage = (req, res) => {
    res.sendFile("../Views/homePage.html", { root: __dirname })
}