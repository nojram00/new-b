const connection = require('../config/mysql.config')
class Model {
    constructor(table){
        this.table = table;
    }

    sample(){
        return this.table
    }

    select(){
        this.query = `SELECT * FROM ${this.table}`
        return this
    }


    execute(out){
        connection.query(this.query, (err, results) => {
            if (err) {
                out(err, null)
                return
            }
            out(null, results)
        })
    }
}

module.exports = { Model }
