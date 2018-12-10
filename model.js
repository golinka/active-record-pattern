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

  static async loadAll() {
    const dbQuery = `SELECT * FROM ${this.table()}`;
    const response = await this.doQuery(dbQuery);
    const classObjects = response.map(data => {
      const obj = new this();
      obj.data = data;
      return obj;
    });
    return classObjects;
  }

  static async load(id) {
    const obj = new this();
    const childModel = new this.prototype.constructor();
    
    if (typeof childModel.hasMany !== 'undefined') {
      childModel.hasMany.map(async (hasIt) => {
        const hasItAll = await hasIt.model.loadAll();
        const itTable = hasIt.model.table();
        const hasItFK = hasIt.foreignKey;

        const has = hasItAll.filter(item => {
          if (item.data[hasItFK] === id) {
            const itemObject = new hasIt.model;
            itemObject.data = item;
            return itemObject;
          }
        });

        obj[itTable] = has;
      });
    }

    const dbQuery = `SELECT * FROM ${this.table()} WHERE ${childModel.pk} = ${id}`;
    const response = await Model.doQuery(dbQuery);

    obj.data = response[0];
    return obj;
  }

  save() {
    let dbQuery = null;
    if (!this.data.id) {
      const fields = Object.keys(this.data).join(', ');
      const values = Object.values(this.data).map(value => {
        return typeof value === 'string' ? `'${value}'` : value;
      }).join(', ');

      dbQuery = `INSERT INTO ${this.constructor.table()} (${fields}) VALUES (${values})`;
      return Model.doQuery(dbQuery)
        .then(response => {
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
}

module.exports = Model;