const express = require('express');
const router = express.Router();

// Simula una base de datos de usuarios en memoria
let users = [];

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        req.session.user = { email: user.email, role: user.role };
        res.redirect('/products');
    } else {
        res.redirect('/login');
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const role = email === 'iprisy@hotmail.com' ? 'admin' : 'usuario';

    users.push({ email, password, role });
    res.redirect('/login');
});

router.get('/products', (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    res.render('products', { user: req.session.user });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
