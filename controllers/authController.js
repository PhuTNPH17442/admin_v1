const session = require('express-session');

const login = async (req, res, next) => {
    res.render('login')
}

const login1 = async (req, res, next) => {
    const email = req.body.email
    if (req.body.email === 'test@email.com' && req.body.password === 'password') {
        req.session.user = {email};
        return res.redirect('/');
    }

    return res.status(401).send({ message: 'Email hoặc mật khẩu sai' });
};
module.exports = {
    login1,
    login
}