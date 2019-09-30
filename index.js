// implement your API here
const express = require('express')

const db = require('./data/db')

const server = express();
server.use(express.json())


server.get('/api/users', (req, res) => {
    db.find()
        .then(shire => res.status(200).json(shire))
        .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }))
});


server.get('/api/users/:id', (req, res) => {
    const { id } = req.params

    db.findById(id)
    .then(hobbit => {
        if(id){
            res.status(200).json(hobbit)            
        } else {
            return console.log(res.status(404).json({ message: "The user with the specified ID does not exist." }))
        }})
        .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }))
})


server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params

    db.remove(id)
    .then(kif => {
        if(id){
            res.status(200).json(kif)            
        } else {
            return console.log(res.status(404).json({ message: "The user with the specified ID does not exist." }))
        }})
        .catch(err => res.status(500).json({ error: "The user could not be removed" }))
})


server.post('/api/users', (req, res) => {
    const newHobbit = req.body

    if(newHobbit.name && newHobbit.bio){
        db.insert(newHobbit)
            .then(hobbit => {
                res.status(201).json(hobbit)
            })
            .catch(err => {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            })
    } else {
        return console.log(res.status(500).json({ error: "There was an error while saving the user to the database" })
    )}
})


server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    if(!id){
        return console.log(res.status(404).json({ message: "The user with the specified ID does not exist." }))
    } else if(!changes.name && !changes.bio){
        return console.log(res.status(400).json({ errorMessage: "Please provide name and bio for the user." }))
    } else {
        db.update(id, changes)
            .then(update => res.status(200).json(update))
            .catch( error => {
                res.status(500).json({ error: "The user information could not be modified." })
            })
    }
}) 


const port = 7777;

server.listen(port, () => console.log(`\nAPI is on port ${port}\n`))