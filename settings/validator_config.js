const { check, body } = require('express-validator')

var SignUpValidate = [
    body('username')
        .escape()
        .ltrim(' ')
        .rtrim(' '),
    body('name')
        .escape()
        .ltrim(' ')
        .rtrim(' '),
    body('password')
        .escape(),
    check('username', 'Некорректный Email.')
        .isEmail(),
    check('name')
        .isLength({ min: 3 }).withMessage("Имя должно содержать минимум 3 символа."),
    check('password')
        .isLength({ min: 6 }).withMessage('Пароль должен содержать миниммум 6 символов.')
        .isLength({ max: 20 }).withMessage('Пароль должен содержать максимум 20 символов.')
        .matches('[0-9]').withMessage('Пароль должен содержать минимум одну цифру.')
        .matches('[a-zA-Z]').withMessage('Пароль должен содержать минимум одну латинскую букву.')
        .isAlphanumeric().withMessage('Пароль должен состоять из цифр и латиских букв.')
    ]

var SignInValidate = [
    body('username')
        .escape()
        .ltrim(' ')
        .rtrim(' '),
    body('password')
        .escape(),
    check('username')
        .isEmail(),
    check('password')
        .isLength({ min: 6, max: 20 })
        .matches('[0-9]')
        .matches('[a-zA-Z]')
        .isAlphanumeric()
]

module.exports = { SignUpValidate, SignInValidate }