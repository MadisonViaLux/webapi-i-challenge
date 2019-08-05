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

    console.log(req.body)

    if(userInfo.name && userInfo.bio){

        Users.insert(userInfo)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error => {
                res.status(500).json( {errorMessage: "Please provide name and bio for the user."} )
            })
    }

})





server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})




server.get('/api/users/:id', (req, res) =>{
    // req.params.id
    Users.findById(req.params.id)
        .then(users => {
            if(users){
                res.status(200).json(users)
            } else {
                res.status(404).json( { message: "The user with the specified ID does not exist." } )
            }
        }
    )
        .catch(error => {
            res.status(500).json({ error: "FIX YO STUFF" })
})})




server.delete('/api/users/:id', (yea, boiz) => {
    Users.remove(yea.params.id)
        .then(boi => {
            if(boi){
                boiz.status(200).json(boi)
            } else {
                boiz.status(404).json( { message: " You got that walmart internet boi.." } )
            }
        }
        )
        .catch(error => {
            boiz.status(500).json({error: "stop it. Get sum help."})
        }
        )
})




server.put('/api/users/:id', (req, res) => {

    const userID = req.params.id
    const changes = req.body


    if(changes.name && changes.bio){

        Users.update(userID, changes)
            .then(update => {
                if(update){
                    res.status(200).json(update)
                } else {
                    res.status(404).json({ message: "it is Wednesday my dudes" })
                }
            })
            .catch( error => {
                res.status(500).json( { message: "AAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHH" } )
            })
    }
}) 




const port = 8000;
server.listen(port, () => console.log('api is running'))