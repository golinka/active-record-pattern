const Model = require('./model');

class Car extends Model {
  static table() {
    return 'cars';
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
    this.fields = ['id', 'user_id', 'model', 'year'];
  }
}

module.exports = Car;
