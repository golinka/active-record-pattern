class Model {

  static doQuery(query) {
    return new Promise((resolve, reject) => {
      global.db.query(query)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error.message);
        });
    })
  }

  static loadAll() {
    const dbQuery = `SELECT * FROM ${this.table()}`;
    return this.doQuery(dbQuery);
  }

  load(id) {
    const dbQuery = `SELECT * FROM ${this.constructor.table()} WHERE ${this.pk} = ${id}`;
    return Model.doQuery(dbQuery);
  }

  save(id) {
    const fields = Object.keys(this.data).join(', ');
    const values = Object.values(this.data).map(value => {
      return typeof value === 'string' ? `'${value}'` : value;
    }).join(', ');

    let keysValues = '';
    for (let key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        if (typeof this.data[key] === 'string') {
          keysValues += `${key} = '${this.data[key]}', `;
        } else {
          keysValues += `${key} = ${this.data[key]}, `;
        }
      }
    }
    keysValues = keysValues.slice(0, -2); // remove the extra ', '

    let dbQuery = null;
    if (typeof id === 'undefined') {
      dbQuery = `INSERT INTO ${this.constructor.table()} (${fields}) VALUES (${values})`;
    } else {
      dbQuery = `UPDATE ${this.constructor.table()} SET ${keysValues} WHERE ${this.pk} = ${id}`;
    }

    return Model.doQuery(dbQuery);
  }

  delete(id) {
    const dbQuery = `DELETE FROM ${this.constructor.table()} WHERE ${this.pk} = ${id}`;
    return Model.doQuery(dbQuery);
  }

  addCar() {
    const car = new this.hasMany[0].model();
    car.data = this.car;
    return car.save();
  }
}

module.exports = Model;