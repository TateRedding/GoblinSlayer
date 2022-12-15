// STATE

const state = {
    totalGold: 0,
    goldPerSecond: 0,
    upgrades: [
        {
            name: "FootSoldier",
            cost: 10,
            gps: 1,
            total: 0
        },
        {
            name: "Knight",
            cost: 50,
            gps: 5,
            total: 0
        },
        {
            name: "Mounted Knight",
            cost: 150,
            gps: 10,
            total: 0
        },
        {
            name: "Cannon",
            cost: 500,
            gps: 25,
            total: 0
        }
    ],
    messages: [
        "Poke goblin, ???, profit!",
        "You're pretty good at this!",
        "Have you ever thought about doing this professionally?",
        "Hey, maybe you should leave them alone for a while...",
        "You're not actually killing them, are you?",
        "I heard the developer of this game is very handsome.",
        "This is your entire existance.",
        "Those poor goblins, give it a rest!",
        "Do you know what 'genocide' means?",
        "Don't forget to sharpen your sword!"
    ]
}

// DOM SELECTORS

const upgradeDiv = document.getElementById("upgrades");

const totalGoldDisplay = document.getElementById("total_gold");
const goldPerSecondDisplay = document.getElementById("gold_per_second");
const upgradeTotalsDisplay = document.getElementsByClassName("upgrade_total");

const upgradeButtons = document.getElementsByClassName("upgrade_button");
const goblinButton = document.getElementById("goblin_button");

const message = document.getElementById("changing_message");

// EVENT LISTENERS

goblinButton.addEventListener("click", () => {
    state.totalGold++;
    updateTotalGoldDisplay();
});

upgradeDiv.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.nodeName === "BUTTON" && !clickEvent.target.matches(".cant_afford")) {
        addUpgrade(clickEvent.target);
    }
})

// HELPER FUNCTIONS

const updateTotalGoldDisplay = () => {
    totalGoldDisplay.innerText = `Total Gold: ${state.totalGold}`;
    checkAffordability();
}

const incrementGold = () => {
    state.totalGold += state.goldPerSecond;
    updateTotalGoldDisplay();
}

const checkAffordability = () => {
    for (let i = 0; i < upgradeButtons.length; i++) {
        currList = upgradeButtons[i].classList;
        (state.totalGold >= state.upgrades[i].cost) ? currList.remove("cant_afford") : currList.add("cant_afford");
    }
}

const addUpgrade = (button) => {
    const index = Array.from(upgradeButtons).indexOf(button);
    const upgrade = state.upgrades[index];
    state.totalGold -= Math.floor(upgrade.cost);
    updateTotalGoldDisplay();

    state.goldPerSecond += upgrade.gps;
    goldPerSecondDisplay.innerText = `Gold per second: ${state.goldPerSecond}`;

    upgrade.total++;
    upgradeTotalsDisplay[index].innerText = `Total: ${upgrade.total}`;

    upgrade.cost *= 1.2;
    upgradeButtons[index].innerText = `Buy: ${Math.floor(upgrade.cost)}g`;

}

checkAffordability();
setInterval(incrementGold, 1000);
setInterval(() => {
    if (state.totalGold > 0) {
        const messageIndex = Math.floor(Math.random() * state.messages.length);
        message.innerText = state.messages[messageIndex];
    }
}, 10000);