const Model = require('./model');
const Car = require('./car');

class User extends Model {
  static table() {
    return 'users';
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
