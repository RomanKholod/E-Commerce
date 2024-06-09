const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1',
    database: 'Usersdb',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

const userModel = {
    getUserByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            const user = results[0];
            callback(null, user);
        });
    },

    updateUserPassword: (email, newPassword, callback) => {
        db.query('UPDATE users SET password_ = ? WHERE email = ?', [newPassword, email], (updateError) => {
            if (updateError) {
                callback(updateError);
            } else {
                callback(null);
            }
        });
    },

    updateUsername: (email, newUsername, callback) => {
        db.query('UPDATE users SET username = ? WHERE email = ?', [newUsername, email], (updateError) => {
            if (updateError) {
                callback(updateError);
            } else {
                callback(null);
            }
        });
    },


    registerUser: (user, callback) => {
        db.query('INSERT INTO users SET ?', user, (insertError, insertResult) => {
            if (insertError) {
                callback(insertError, null);
            } else {
                console.log('User registered with ID: ' + insertResult.insertId);
                callback(null, insertResult);
            }
        });
    },
};

module.exports = userModel;

