const Model = require('./model');
const Car = require('./car');

class User extends Model {
  static table() {
    return 'users';
  }

  static async load(id) {
    const obj = new this();
    const dbQuery = `SELECT * FROM ${this.table()} WHERE id = ${id}`;
    const response = await Model.doQuery(dbQuery);
    obj.data = response[0];
    return obj;
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
