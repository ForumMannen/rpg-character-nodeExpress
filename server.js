const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/api', (req, res) => {
    fs.readFile("characters.json", (err, data) => {
        if(err) {
            res.status(404).send("Couldn't get data!")
        }
        const characters = JSON.parse(data)

        res.status(200).send(characters)
        return;
    })
});

app.post('/api/add', (req, res) => {
    fs.readFile("characters.json", (err, data) => {
        if(err) {
            res.status(404).send("Couldn't get characters!")
        }
        let uuid = uuidv4();
        const characters = JSON.parse(data)
        const newCharacter = {
            id: uuid,
            characterName: req.body.characterName,
            class: req.body.class,
            weapon: req.body.weapon,
            description: req.body.description
        }
        characters.push(newCharacter);
        
        fs.writeFile("characters.json", JSON.stringify(characters, null, 2), (err) => {
            if(err){
                res.status(404).send("Couldn't write to file!")
            }
            res.status(201).send(characters);
        })
    })
});

app.put('/api/update/:id', (req, res) => {
    fs.readFile("characters.json", (err, data) => {
        const characters = JSON.parse(data)
        const character = characters.find((character) => character.id == req.params.id);
        if(!character) {
            res.status(404).send("Couldn't find that character!");
        } else {
            characters.find((character) => {
                if(character.id == req.params.id){
                    character.characterName = req.body.characterName,
                    character.class = req.body.class,
                    character.weapon = req.body.weapon,
                    character.description = req.body.description
                }
            });
            fs.writeFile("characters.json", JSON.stringify(characters, null, 2), (err) => {
                if(err){
                    res.status(404).send("Couldn't write character when updating!")
                }
                res.status(202).send(characters);
            })
                }
        });
    });

app.delete('/api/delete/:id', (req, res) => {
    fs.readFile("characters.json", (err, data) => {
        
        if(err){
            res.status(404).send("Couldn't delete character!");
        } else {
        const characters = JSON.parse(data);
        const characterId = characters.find((character) => character.id == req.params.id);
        const index = characters.indexOf(characterId);
        if(index >= 0){
            characters.splice(index, 1);
        } else {
            res.status(404).send("Couldn't delete character! Please try again...")
        }
        fs.writeFile("characters.json", JSON.stringify(characters, null, 2), (err) => {
            if(err){
                res.status(404).send("Couldn't write character")
            }
            res.status(202).send(characters);
        })
            }
    })
});

app.get('/api/:characterName', (req, res) => {
    fs.readFile("characters.json", (err, data) => {
        const character = JSON.parse(data);
        const specificCharacter = character.find((character) => character.characterName == req.params.characterName);
        
        if(!character){
            res.status(404).send("Couldn't find that character!");  
        } else {
            res.status(200).send(specificCharacter);
        }
    })
});

app.listen(3000, () => console.log("Server is up and runing"));