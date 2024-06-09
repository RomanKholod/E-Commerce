const userModel = require('../model/usersModel'); // Імпорт моделі

const userController = {
    changePassword: (req, res) => {
        if (req.session.user) {
            const { email } = req.session.user;
            const { newPassword } = req.body;
            userModel.updateUserPassword(email, newPassword, (updateError) => {
                if (updateError) {
                    console.error('Помилка при оновленні паролю: ' + updateError);
                    return res.status(500).send('Помилка оновлення паролю');
                }
                req.session.user.password_ = newPassword;
                res.status(200).send('Пароль успішно оновлено');
            });
        }
    },

    changeUsername: (req, res) => {
        if (req.session.user) {
            const { email } = req.session.user;
            const { newUsername } = req.body;
            userModel.updateUsername(email, newUsername, (updateError) => {
                if (updateError) {
                    console.error('Помилка при оновленні імені користувача: ' + updateError);
                    return res.status(500).send('Помилка оновлення імені користувача');
                }
                req.session.user.username = newUsername;
                res.status(200).send('Імя користувача успішно оновлено');
            });
        }
    },

    registerUser: (req, res) => {
        const { username, email, password, roles } = req.body;
        userModel.registerUser({ username, email, password_, roles }, (insertError, insertResult) => {
            if (insertError) {
                console.error('Помилка при реєстрації: ' + insertError);
                return res.status(500).send('Помилка реєстрації');
            }
            console.log('User registered with ID: ' + insertResult.insertId);
            res.status(200).json({
                message_email: null,
                message_pass: null,
                redirectTo: '/login'
            });
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;
        userModel.getUserByEmail(email, (error, user) => {
            if (error) {
                console.error('Помилка при перевірці електронної пошти: ' + error);
                return res.status(500).send('Помилка перевірки електронної пошти');
            }
            if (!user) {
                return res.status(401).json({
                    message_pass_log: null,
                    message_email_log: 'Користувача з такою електронною поштою не існує.',
                });
            }

            if (user.password_ !== password) {
                res.status(401).json({
                    message_pass_log: 'Неправильний пароль',
                    message_email_log: null,
                });
            } else {
                req.session.user = user;
                res.status(200).json({ username: user.username, email, roles: user.roles });
            }
        });
    },

    ProfilePage: (req, res) => {
        if (req.session.user) {
            const { username, email, roles } = req.session.user;
            
            // Рендеримо шаблон "profile.ejs" та передаємо дані
            res.render('profile', { username: username, email: email, roles: roles });
        } else {
            res.status(401).send('Потрібно увійти');
        }
    },


};


module.exports = userController;
