class Model {

  save() {
    const [ id, first_name, last_name, age, gender ] = this.fields;
    let query = null;

    if (this.pk !== 'id') {
      query = `INSERT INTO ${this.constructor.table()} VALUES (${id}, "${first_name}", "${last_name}", ${age}, "${gender}")`;
    } else {
      query = `UPDATE ${this.constructor.table()} SET id = ${id}, first_name = "${first_name}", last_name = "${last_name}", age = ${age}, gender = "${gender}" WHERE id = ${id}`;
    }

    global.db.query(query)
      .then((results) => {
        console.log(results);
      })
      .catch(error => {
        console.log(error)
      });
  }

  // Not done
  async load(pk) {
    if (typeof this.hasMany === 'object') {
      // do some with model
      const user = await global.db.query(`SELECT * FROM ${this.constructor.table()} WHERE id = ${this.pk}`);
      user.cars = [];
      user.cars.push('Porshe');
      // console.log(user);
      const cars = this.hasMany.model.load(this.pk);
      console.log(cars);
    } else {
      const cars = await global.db.query(`SELECT * FROM ${this.hasMany.model.constructor.table()} WHERE id = ${pk}`);
    }

    console.log();
  }

  loadAll() {
    global.db.query(`SELECT * FROM ${this.constructor.table()}`)
      .then((results) => {
        console.log(results);
      })
      .catch(error => {
        console.log(error)
      });
  }

  delete() {
    global.db.query(`DELETE FROM ${this.constructor.table()} WHERE id = ${this.pk}`)
      .then((results) => {
        console.log(results);
      })
      .catch(error => {
        console.log(error)
      });
  }
}

module.exports = Model;