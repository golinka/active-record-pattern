class Model {

  static doQuery(query) {
    return global.db.query(query)
    .then(result => {
      return result;
    })
    .catch(error => {
      return error.message;
    });
  }

  static loadAll() {
    const dbQuery = `SELECT * FROM ${this.table()}`;
    return this.doQuery(dbQuery);
  }

  save() {
    let dbQuery = null;
    if (!this.alreadySaved) {
      const fields = Object.keys(this.data).join(', ');
      const values = Object.values(this.data).map(value => {
        return typeof value === 'string' ? `'${value}'` : value;
      }).join(', ');

      dbQuery = `INSERT INTO ${this.constructor.table()} (${fields}) VALUES (${values})`;
      return Model.doQuery(dbQuery)
        .then(response => {
          this.alreadySaved = true;
          this.data.id = response.insertId;
        });
    } else {
      let keysValues = '';
      const keys = Object.keys(this.data);

      keys.map(key => {
        if (typeof this.data[key] === 'string') {
          keysValues += `${key} = '${this.data[key]}', `;
        } else {
          keysValues += `${key} = ${this.data[key]}, `;
        }
      });

      keysValues = keysValues.slice(0, -2); // remove the extra ', '

      dbQuery = `UPDATE ${this.constructor.table()} SET ${keysValues} WHERE ${this.pk} = ${this.data.id}`;
      return Model.doQuery(dbQuery);
    }
  }

  delete() {
    const dbQuery = `DELETE FROM ${this.constructor.table()} WHERE ${this.pk} = ${this.data.id}`;
    return Model.doQuery(dbQuery);
  }

  addCar() {
    const car = new this.hasMany[0].model();
    car.data = this.car;
    return car.save();
  }
}

module.exports = Model;