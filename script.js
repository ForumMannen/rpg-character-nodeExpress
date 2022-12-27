fetch ("http://localhost:3000/api")
.then(response => response.json())
.then(data => printCharacters(data));

function printCharacters(characters){
    console.log(characters);
}