//dependencies 
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
/* Add file into config folder for your API keys - Remember to add the Keys file to your .gitignore */
const keys = require('./config/keys');

//port
const PORT = process.env.PORT || 3000;

const app = express();

//set view engine
app.set('view engine', "ejs");

//encrypt cookies - save for 24 hours
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport 
app.use(passport.initialize());
app.use(passport.session());

//connet to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb database');
});

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {console.log('App listening on port ' + PORT)});