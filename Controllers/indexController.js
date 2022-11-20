'use strict'

exports.getMainPage = (req, res) => {  
    
    var isAuth = req.isAuthenticated()
    res.render('pug/index_main.pug', {isUser: isAuth})
}