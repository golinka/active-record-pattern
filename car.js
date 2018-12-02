const Model = require('./model');

class Car extends Model {
  static table() {
    return 'cars';
  }

  constructor() {
    this.pk = 'id';
    this.fields = ['id', 'user_id', 'model', 'year'];

    super();
  }
}

module.exports = User;
