const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// Configurarea middleware-ului
app.use(session({
    secret: 'your_secret_key', // Înlocuiește cu o cheie secretă sigură
    resave: false,
    saveUninitialized: true
}));

// Servirea fișierelor statice
app.use(express.static('public'));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta pentru gestionarea logării
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Verificarea emailului cu expresie regulată
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.send('Invalid email format');
    }

    // Aici poți adăuga logica pentru verificarea parolei și autentificarea utilizatorului
    if (email === 'test@example.com' && password === 'password') {
        req.session.user = email;
        res.redirect('/main.html');
    } else {
        res.send('Invalid email or password');
    }
});

// Ruta 404 (trebuie să fie ultima)
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
