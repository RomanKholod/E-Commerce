const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 8000;

const siteRoutes = require('./controller/routes/siteRoutes');
//const authRoutes = require('./routes/authRoutes');


app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,

}));
app.set('view engine', 'ejs');


app.use('/', siteRoutes);
app.use('/about',siteRoutes);
app.use('/catalog', siteRoutes);
app.use('/profile',siteRoutes);

app.use('/registration', siteRoutes);
app.use('/login', siteRoutes);
app.use('/logout',siteRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




