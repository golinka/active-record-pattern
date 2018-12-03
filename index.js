require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const User = require('./user');
const Car = require('./car');

global.db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

global.db.query = util.promisify(global.db.query);


// Открыть с БД и вывести в консоль сузествующего пользователя с машинами [Not done]
// const user = new User();
// user.pk = 2;
// user.load();

// Создать нового пользователя [Done]
// const createUser = new User();
// createUser.pk = 5;
// createUser.fields = [createUser.pk, 'Artem', 'Holinka', 22, 'M'];
// createUser.save();

// // Изменить имя пользователю [Done]
// const updateUser = new User();
// updateUser.fields = [5, 'Vlad', 'Ivanov', 25, 'M'];
// updateUser.save();

// Удалить пользователя [Done]
// const deleteUser = new User();
// deleteUser.pk = 5;
// deleteUser.delete();

// Добавить пользователю новую машину
