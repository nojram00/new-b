const express = require('express')
const connection = require('./config/mysql.config')
const { Sample } = require('./model/sample.model')
const app = express()
const port = 8082

app.get('/', (req, res) => {
    // sample = new Sample()
    // let results
    connection.query('SELECT * FROM employee_tb', (err, results) => {
        if (err) {
            console.error(err)
            return
        }
        res;
        console.log(results)
        res.json(results)
    })
})

app.get('/employees', (req, res) => {
    const sample = new Sample()
    sample.select().execute((err, results) => {
        if (err) {
            res.send(err).status(400)
            return
        }
        res.json(results).status(200)
    })
})

app.listen(port, () => [
    console.log(`Listen on ${port}`)
])
