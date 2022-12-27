const express = require("express");
const app = express();
const data = require('./characters.json');
const fs = require("fs");
const cors = require("cors");

app.use(express.json())

app.get('/api', (req, res) => {
    // res.header("Content-Type", 'application/json')
    // res.send(JSON.stringify(data)); //change to JSON-file

    fs.readFile("characters.json", (err, data) => {
        if(err) {
            console.log(err);
        }
        const characters = JSON.parse(data)

        res.status(200).send(characters)
        return;
    })
});

app.post('/api/add', (req, res) => {
    fs.readFile("characters.json", (err, data) => {
        if(err) {
            console.log(err);
        }
        
        const characters = JSON.parse(data)
        const newCharacter = req.body
        newCharacter.id = characters.length + 1;
        
        characters.push(newCharacter);
        
        fs.writeFile("characters.json", JSON.stringify(characters, null, 2), (err) => {
            if(err){
                console.log(err);
            }
        })
    })
    res.status(201).json(req.body);
});

app.put('/api/update/:id', (req, res) => {
    res.status(202).json(req.body);
});

app.delete('/api/delete/:id', (req, res) => {
    res.status(202).send ("Successfully deleted!");
});

app.get('/api/:id', (req, res) => {
    res.status(200).send("Här är en specifik produkt med id: " + req.params.id);
});

app.listen(3000, () => console.log("Server is up and runing"));