'use strict'

const db = require('../settings/db')

module.exports = class User {

    constructor(id, name, email, password) {
        this.ID = id
        this.NAME = name
        this.EMAIL = email
        this.PASSWORD = password
    }

    static getId() {
        return this.ID
    }

    static getName() {
        return this.NAME
    }

    static getEmail() {
        return this.EMAIL
    }

    static getPassword() {
        return this.PASSWORD
    }


    static findByEmail(Email) {
        var user
        const sql = `SELECT * FROM users WHERE email=?`;
        const data = [Email];
        db.query(sql, data, function(err, results) {
            if(err) {
                console.log(err);
            } else {
                var field = results[0] 
                console.log(field.name);
                user = new User(field.id, field.name, field.email, field.password)
            }
        });

        return user
    }

    static insertIntoDB() {

    }

}