const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    database:'hris_db',
    password: ''
})

connection.connect( (err) => {
    if(err){
        console.error("MySQL Message: Connection failed... " + err)
        return
    }
    console.log("MySQL Message: Connection established...")
})

module.exports = connection
