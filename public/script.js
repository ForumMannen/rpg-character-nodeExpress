fetch ("http://localhost:3000/api").then((response) => {
    return response.json()
}).then((data) => {
    printCharacters(data)
}).catch((error) => {
    console.log(error)
});

function printCharacters(characters){
    console.log(characters);
}