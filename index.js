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

// Get user
// const user = new User();
// user.load(1)
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

// Get all users
// User.loadAll()
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

// Открыть с БД и вывести в консоль сузествующего пользователя с машинами [Not done]


// Создать нового пользователя [Done]
(async function () {
  const createUser = new User();
  createUser.data = {
    first_name: 'Artem',
    last_name: 'Holinka',
    age: 22,
    gender: 'F'
  };
  await createUser.save();

  // Изменить имя пользователю [Done]
  createUser.data.first_name = 'Vlad'
  await createUser.save();

  // Удалить пользователя [Done]
  await createUser.delete();
})();

// Добавить пользователю новую машину
