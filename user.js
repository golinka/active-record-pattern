const Model = require('./model');
const Car = require('./car');

class User extends Model {
  static table() {
    return 'users';
  }

  async addCar(car) {
    const tableName = car.constructor.table();
    const user_id = this.data[this.hasMany[0].primaryKey];

    car.data[this.hasMany[0].foreignKey] = user_id;
    await car.save();

    if (typeof this[tableName] !== 'undefined') {
      this[tableName].push(car);
    } else {
      this[tableName] = [];
      this[tableName].push(car);
    }
  }

  constructor() {
    super();
    
    this.pk = 'id';
    this.fields = ['id', 'first_name', 'last_name', 'age', 'gender'];
    this.hasMany = [
      {
        model: Car,
        primaryKey: 'id',
        foreignKey: 'user_id'
      }
    ];
  }
}

module.exports = User;
