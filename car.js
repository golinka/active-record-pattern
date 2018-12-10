const Model = require('./model');

class Car extends Model {
  static table() {
    return 'cars';
  }

  static load(id) {
    const dbQuery = `SELECT * FROM ${this.table()} WHERE id = ${id}`;
    return Model.doQuery(dbQuery);
  }

  constructor() {
    super();
    
    this.pk = 'id';
    this.fields = ['id', 'user_id', 'model', 'year'];
  }
}

module.exports = Car;
