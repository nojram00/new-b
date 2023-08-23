const express = require('express')
const connection = require('./config/mysql.config')
const { Sample } = require('./model/sample.model')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const app = express()
const port = 8082

ra = require('crypto').randomBytes(64).toString('hex')
console.log(ra)

dotenv.config();

process.env.TOKEN_SECRET;



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


app.post('/createUser', (req, res) => {
    const token = generateAccessToken({username: req.body.username})
    res.json(token).status(200)
})

app.post('/login', authenticate, (req, res) => {
    const token = generateAccessToken({username: req.body.username})
    res.json(token).status(200)
})

function authenticate(res, req, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token==null) return res.sample(401)

    jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
        console.log(err)

        if (err) return res.status(403)

        req.user = user

        next()
    })
}

app.listen(port, () => [
    console.log(`Listen on ${port}`)
])
