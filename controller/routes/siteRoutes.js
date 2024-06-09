const express = require('express');
const router = express.Router();
const userController = require('../userController');



router.get('/', (req, res) => {
  //res.sendFile('main.html', { root: 'public' });
  if (req.session.user) {
      const { username, email, roles, } = req.session.user;
    
      // Рендеримо шаблон "profile.ejs" та передаємо дані
      res.render('main', { username: username, email: email, roles: roles,loggedIn: true  });
  } else {
      res.render('main',{loggedIn: false});
  }
});

router.get('/catalog', (req, res) => {
  res.sendFile('catalog.html', { root: 'views' });
});

router.get('/about', (req, res) => {
  res.sendFile('about.html',{ root: 'views' });
 
});

router.get('/logout', (req, res) => {
  // Видалення сесії (якщо ви використовуєте сесії)
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session: ' + err);
      } else {
          // Відправити користувача на головну сторінку або куди завгодно
          res.redirect('/');
      }
  });
});    


router.get('/profile', (req, res) => {
  if (req.session.user) {
      const { username, email, roles } = req.session.user;
      
      // Рендеримо шаблон "profile.ejs" та передаємо дані
      res.render('profile', { username: username, email: email, roles: roles});
  } else {
      res.status(401).send('Потрібно увійти');
  }
});

router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

router.get('/register', (req, res) => {
  res.sendFile('registration.html', { root: 'views' });
});


router.get('/profile', userController.ProfilePage);

// Додайте цей маршрут до вашого контролера
router.post('/checkpassword', (req, res) => {
  if (req.session.user) {
      const { email, password_ } = req.session.user;
      const { currentPassword } = req.body;

      if (currentPassword === password_) {
          // Поточний пароль вірний
          res.status(200).send('Поточний пароль вірний');
      } else {
          res.status(401).send('Неправильний поточний пароль');
      }
  } else {
      res.status(401).send('Потрібно увійти');
  }
});

router.post('/changepassword', userController.changePassword);
router.post('/changeusername', userController.changeUsername);
router.post('/register', userController.registerUser);
router.post('/login', userController.login);

// Додайте інші маршрути на необхідний момент

module.exports = router;
