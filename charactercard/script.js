const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    image: "https://andejuli.github.io/wdd131/character_card/snortleblat.webp",
    attacked() {
        if (this.health === 0) {
            return;
        }

        this.health = Math.max(0, this.health - 20);
        renderCharacter();

        if (this.health === 0) {
            document.querySelector("#character-status").textContent =
                `${this.name} has died.`;
            window.alert(`${this.name} is dead`);
            document.querySelector("#attack-button").disabled = true;
            document.querySelector("#level-up-button").disabled = true;
        }
    },
    levelUp() {
        if (this.health === 0) {
            return;
        }

        this.level += 1;
        renderCharacter();
        document.querySelector("#character-status").textContent =
            `${this.name} reached level ${this.level}!`;
    }
};

function renderCharacter() {
    document.querySelector("#character-name").textContent = character.name;
    document.querySelector("#character-class").textContent = character.class;
    document.querySelector("#character-level").textContent = character.level;
    document.querySelector("#character-health").textContent = character.health;
    document.querySelector(".image").src = character.image;
}

document.querySelector("#attack-button").addEventListener("click", () => {
    character.attacked();
});

document.querySelector("#level-up-button").addEventListener("click", () => {
    character.levelUp();
});

renderCharacter();
