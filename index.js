// STATE

const state = {
    totalGold: 0,
    goldPerSecond: 0,
    units: [
        {
            name: "FootSoldier",
            cost: 10,
            gps: 1,
            total: 0,
            isHidden: true
        },
        {
            name: "Knight",
            cost: 50,
            gps: 5,
            total: 0,
            isHidden: true
        },
        {
            name: "Mounted Knight",
            cost: 150,
            gps: 10,
            total: 0,
            isHidden: true
        },
        {
            name: "Cannon",
            cost: 500,
            gps: 25,
            total: 0,
            isHidden: true
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

const unitDiv = document.getElementById("units");
const units = document.getElementsByClassName("unit");

const totalGoldDisplay = document.getElementById("total_gold");
const goldPerSecondDisplay = document.getElementById("gold_per_second");
const unitTotalsDisplay = document.getElementsByClassName("unit_total");

const unitButtons = document.getElementsByClassName("unit_button");
const goblinButton = document.getElementById("goblin_button");

const message = document.getElementById("changing_message");

// EVENT LISTENERS

goblinButton.addEventListener("click", () => {
    state.totalGold++;
    updateTotalGoldDisplay();
});

unitDiv.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.nodeName === "BUTTON" && !clickEvent.target.matches(".cant_afford")) {
        addunit(clickEvent.target);
    }
})

// HELPER FUNCTIONS

const updateTotalGoldDisplay = () => {
    totalGoldDisplay.innerText = `Total Gold: ${state.totalGold}`;
    checkAffordability();
    unhideunits();
}

const incrementGold = () => {
    state.totalGold += state.goldPerSecond;
    updateTotalGoldDisplay();
}

const checkAffordability = () => {
    for (let i = 0; i < unitButtons.length; i++) {
        currList = unitButtons[i].classList;
        (state.totalGold >= state.units[i].cost) ? currList.remove("cant_afford") : currList.add("cant_afford");
    }
}

const unhideunits = () => {
    for (let i = 0; i < state.units.length; i++) {
        let currunit = state.units[i];
        if (currunit.isHidden === true && state.totalGold >= currunit.cost) {
            currunit.isHidden = false;
            units[i].style.display = "flex";
        }
        
    };
};

const addunit = (button) => {
    const index = Array.from(unitButtons).indexOf(button);
    const unit = state.units[index];
    state.totalGold -= Math.floor(unit.cost);
    updateTotalGoldDisplay();

    state.goldPerSecond += unit.gps;
    goldPerSecondDisplay.innerText = `Gold per second: ${state.goldPerSecond}`;

    unit.total++;
    unitTotalsDisplay[index].innerText = `Total: ${unit.total}`;

    unit.cost *= 1.2;
    unitButtons[index].innerText = `Buy: ${Math.floor(unit.cost)}g`;

}

checkAffordability();
setInterval(incrementGold, 1000);
setInterval(() => {
    if (state.totalGold > 0) {
        const messageIndex = Math.floor(Math.random() * state.messages.length);
        message.innerText = state.messages[messageIndex];
    }
}, 10000);