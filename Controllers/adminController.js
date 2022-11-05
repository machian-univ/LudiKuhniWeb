'use strict'

exports.getAdminPanel = (req, res) => {
    res.sendFile('../Views/adminPanel.html')
}