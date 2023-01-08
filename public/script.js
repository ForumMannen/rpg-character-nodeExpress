const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const createButton = document.querySelector("#createButton");
const characterName = document.querySelector("#characterNameInput");
const characterClass = document.querySelector("#classSelector");
const weapon = document.querySelector("#weaponInput");
const description = document.querySelector("#descriptionInput");
const section = document.querySelector("section");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const searchResult = document.querySelector("#searchResult");
const leftcontentDiv = document.querySelector("#left_content");

async function getCharacters(){
    const get = await fetch ('http://localhost:3000/api')
    const characters = await get.json()

    printCharacters(characters);
}

getCharacters();

async function printCharacters(characters){
    section.innerHTML = "";
        for(const character of characters){
            const characterContainers = document.createElement("div");
            section.appendChild(characterContainers);
            characterContainers.className = "characterContainer";
            const nameLabel = document.createElement("h4");
            nameLabel.innerHTML = "Character name:";
            characterContainers.appendChild(nameLabel);
            const characterName = document.createElement("p");
            characterName.setAttribute("contenteditable", "true");
            characterName.innerHTML = character.characterName;
            characterContainers.appendChild(characterName);
            const classLabel = document.createElement("h4");
            classLabel.innerHTML = "Class:";
            characterContainers.appendChild(classLabel);
            const characterClass = document.createElement("p");
            characterClass.setAttribute("contenteditable", "true");
            characterClass.innerText = character.class;
            characterContainers.appendChild(characterClass);
            const weaponLabel = document.createElement("h4");
            weaponLabel.innerHTML = "Weapon:";
            characterContainers.appendChild(weaponLabel);
            const characterWeapon = document.createElement("p");
            characterWeapon.setAttribute("contenteditable", "true");
            characterWeapon.innerText = character.weapon;
            characterContainers.appendChild(characterWeapon);
            const descriptionLabel = document.createElement("h4");
            descriptionLabel.innerHTML = "Description:";
            characterContainers.appendChild(descriptionLabel);
            const characterDescription = document.createElement("p");
            characterDescription.setAttribute("contenteditable", "true");
            characterDescription.innerText = character.description;
            characterContainers.appendChild(characterDescription);
            const deleteButton = document.createElement("button");
            deleteButton.className = "deleteButton";
            deleteButton.innerText = "Delete";
            characterContainers.appendChild(deleteButton);
            deleteButton.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const sendId = {id: character.id};
                deleteCharacter(sendId);
            });
            const updateButton = document.createElement("button");
            updateButton.className = "updateButton";
            updateButton.innerText = "Update";
            characterContainers.appendChild(updateButton);
            updateButton.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const changedData = {
                    id: character.id, 
                    characterName: characterName.innerHTML,
                    class: characterClass.innerHTML,
                    weapon: characterWeapon.innerHTML,
                    description: characterDescription.innerHTML
                };
                updateCharacter(changedData);
        });
    }
}

createButton.addEventListener("click", (e) => {
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
    const response = await fetch (`http://localhost:3000/api/update/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "characterName": data.characterName,
            "class": data.class,
            "weapon": data.weapon,
            "description": data.description
        })
    })
    return response.json();
};

async function deleteCharacter(data){
    const response = await fetch (`http://localhost:3000/api/delete/${data.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const resp = await response.json();
    printCharacters(resp);
};

searchButton.addEventListener("click", () => {
    searchCharacter(searchInput.value);
});

async function searchCharacter(data){
    try{
        const response = await fetch (`http://localhost:3000/api/${data}`)
        const character = await response.json();
        searchResult.innerText = "There is a character named: " + character.characterName;
    }
    catch{
        searchResult.innerText = "There is no character with that name!";
    }
}