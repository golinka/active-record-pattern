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

// Get all users
(async function() {
  const allUsers = await User.loadAll();
})();

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
(async function () {
  const newCar = new Car();
  newCar.data = {
    model: 'Audi',
    year: 2009
  };

  const happyUser = await User.load(136);
  await happyUser.addCar(newCar);
  console.log(happyUser);
})();