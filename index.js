// implement your API here
const express = require('express');

const Users = require('./data/db')

const server = express()



server.use(express.json());


server.get('/', (req, res) => {
    res.send('hello web 20.75');
  });


server.post('/api/users', (req, res) => {
    const userInfo = req.body

    Users.insert(userInfo)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json( {message: 'error adding the user'} )
        })
})







server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ message: 'error getting users' })
        })
})




const port = 8000;
server.listen(port, () => console.log('api is running'))