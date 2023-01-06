const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const createButton = document.querySelector("#createButton");
const characterName = document.querySelector("#characterNameInput");
const characterClass = document.querySelector("#classSelector");
const weapon = document.querySelector("#weaponInput");
const description = document.querySelector("#descriptionInput");
// const test = document.querySelector("#test_field");
// const kalladenvadjagvill = test.innerHTML;
// console.log(test);
// console.log(kalladenvadjagvill); 
// function hittepau(){
//     console.log(test);
//     console.log(kalladenvadjagvill);   
// }

async function printCharacters(){
    const get = await fetch ('http://localhost:3000/api')
    const characters = await get.json()

        for(const character of characters){
            const characterContainers = document.createElement("div");
            main.appendChild(characterContainers);
            characterContainers.className = "characterContainer";
            // console.log(character.class); 
            const characterName = document.createElement("p");
            characterName.setAttribute("contenteditable", "true");
            characterName.innerHTML = character.characterName;
            const hejhopp = [{id: character.id, characterName: characterName.innerHTML}];
            characterContainers.appendChild(characterName);
            const characterClass = document.createElement("p");
            characterClass.innerText = "Class: " + character.class;
            characterContainers.appendChild(characterClass);
            const characterWeapon = document.createElement("p");
            characterWeapon.innerText = "Weapon: " + character.weapon;
            characterContainers.appendChild(characterWeapon);
            const characterDescription = document.createElement("p");
            characterDescription.innerText = "Description: " + character.description;
            characterContainers.appendChild(characterDescription);
            const deleteButton = document.createElement("button");
            deleteButton.className = "deleteButton";
            deleteButton.innerText = "Delete";
            characterContainers.appendChild(deleteButton);
            deleteButton.addEventListener("click", () => {
                deleteCharacter(character);
            });
            const updateButton = document.createElement("button");
            updateButton.className = "updateButton";
            updateButton.innerText = "Update";
            characterContainers.appendChild(updateButton);
            updateButton.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                updateCharacter(hejhopp);
                console.log(hejhopp);
        });
    }
}

printCharacters();
// fetch ("http://localhost:3000/api").then((response) => {
//     return response.json()
// }).then((data) => {
//     printCharacters(data)
// }).catch((error) => {
//     console.warn('Something went wrong!', error)
// });

// fetch ("http://localhost:3000/api/add", {
//     method: 'POST'
// }).then((response) => {
//     return response.json()
// }).then((data) => {
//     addNewCharacter(data)
// }).catch((error) => {
//     console.warn('Something went wrong!', error)
// });
createButton.addEventListener("click", (e) => {
    // hittepau();
    addNewCharacter();
});

const addNewCharacter = async () => {
    const response = await fetch ('http://localhost:3000/api/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            "characterName": characterName.value,
            "class": characterClass.value,
            "weapon": weapon.value,
            "description": description.value
        })
    })
    return response.json();
};

async function updateCharacter(data){
    console.log(data.characterName);
    const response = await fetch (`http://localhost:3000/api/update/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "characterName": data.characterName
            // "class": data.class,
            // "weapon": data.weapon,
            // "description": data.description
        })
    })
    return response.json();
};



// function addNewCharacter(character){
//     const formData = {
//         characterName: name,
//         class: characterClass,
//         weapon: weapon,
//         description: description
//     };

// }


