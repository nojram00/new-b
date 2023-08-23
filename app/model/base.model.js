const connection = require('../config/mysql.config')
class Model {
    constructor(table){
        this.table = table;
    }

    sample(){
        return this.table
    }

    select(cols = '*'){
        this.query = `SELECT ${cols} FROM ${this.table}`
        return this
    }

    /**
     *
     * @param table {string} the table you want to join
     * @param args {string} arguments after 'ON' clause. (Ex: "table1.id = table2.id")
     */
    join(table,args){
        this.query += ` JOIN ${table} ON ${args}`
        return this
    }

    /**
     *
     * @param args {string} arguments after 'WHERE' clause. (Ex: "id = 4", "BETWEEN 4 AND 5", "LIKE b%", etc.)
     */
    where(args){
        this.query += ` WHERE ${args}`
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
