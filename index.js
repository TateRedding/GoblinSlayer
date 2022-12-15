// STATE

const state = {
    totalGold: 0,
    goldPerSecond: 0,
    goldPerClick: 1,
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
    upgrades: [
        {
            name: "Fast Fingers",
            cost: 100,
            isHidden: true,
            triggerEffect: () => {
                state.goldPerClick *= 2;
            }
        },
        {
            name: "Sharper Swords",
            cost: 100,
            isHidden: true,
            triggerEffect: () => {
                state.units[0].gps *= 2;
            }
        },
        {
            name: "Improved Training Camps",
            cost: 500,
            isHidden: true,
            triggerEffect: () => {
                state.units[1].gps *= 2;
            }
        },
        {
            name: "Stronger Steeds",
            cost: 1500,
            isHidden: true,
            triggerEffect: () => {
                state.units[2].gps *= 2;
            }
        },
        {
            name: "Extra Gunpowder",
            cost: 5000,
            isHidden: true,
            triggerEffect: () => {
                state.units[3].gps *= 2;
            }
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
        "Don't forget to sharpen your sword!",
        "Hi Doug!",
        "Hi Jonathan!",
        "Goblins are now an endagered species.",
        "I learned to kill goblins from FullSlash Academy!",
        "If only I could use all this gold to pay for this bootcamp.",
        "I'm sorry that I ever doubted you.",
        "Full on goblin mode!",
        "Something smells like iron...",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    ]
}

// DOM SELECTORS

const unitDiv = document.getElementById("units");
const upgradeDiv = document.getElementById("upgrades");

const units = document.getElementsByClassName("unit");
const upgrades = document.getElementsByClassName("upgrade");

const totalGoldDisplay = document.getElementById("total_gold");
const goldPerSecondDisplay = document.getElementById("gold_per_second");
const goldPerClickDisplay = document.getElementById("gold_per_click");
const unitTotalsDisplay = document.getElementsByClassName("unit_total");
const unitGPSDisplay = document.getElementsByClassName("gps");

const unitButtons = document.getElementsByClassName("unit_button");
const upgradeButtons = document.getElementsByClassName("upgrade_button");
const goblinButton = document.getElementById("goblin_button");

const message = document.getElementById("changing_message");

// EVENT LISTENERS

goblinButton.addEventListener("click", () => {
    state.totalGold += state.goldPerClick;
    updateTotalGoldDisplay();
});

unitDiv.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.nodeName === "BUTTON" && !clickEvent.target.matches(".cant_afford")) {
        addUnit(clickEvent.target);
    }
})

upgradeDiv.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.nodeName === "BUTTON" && !clickEvent.target.matches(".cant_afford")) {
        purchaseUpgrade(clickEvent.target);
    }
})

// HELPER FUNCTIONS

const updateTotalGoldDisplay = () => {
    totalGoldDisplay.innerText = `Total Gold: ${state.totalGold}`;
    checkAffordability();
    unhideDivs(units, state.units);
    unhideDivs(upgrades, state.upgrades);
}

const updateGoldDisplays = () => {
    let newGPS = 0;
    for (let i = 0; i < state.units.length; i++) {
        newGPS += state.units[i].gps * state.units[i].total
        unitGPSDisplay[i].innerText = `${state.units[i].gps} gold per second`
    }
    state.goldPerSecond = newGPS;
    goldPerSecondDisplay.innerText = `Gold per second: ${state.goldPerSecond}`;
    goldPerClickDisplay.innerText = `Gold per click: ${state.goldPerClick}`;
}

const incrementGold = () => {
    state.totalGold += state.goldPerSecond;
    updateTotalGoldDisplay();
}

const checkAffordability = () => {
    updateButtonClassLists(unitButtons, state.units);
    updateButtonClassLists(upgradeButtons, state.upgrades);
}

const updateButtonClassLists = (buttonArr, objArr) => {
    for (let i = 0; i < buttonArr.length; i++) {
        currList = buttonArr[i].classList;
        (state.totalGold >= objArr[i].cost) ? currList.remove("cant_afford") : currList.add("cant_afford");
    }
}


const unhideDivs = (divArr, objArr) => {
    for (let i = 0; i < objArr.length; i++) {
        if (objArr[i].isHidden === true && state.totalGold >= objArr[i].cost) {
            objArr[i].isHidden = false;
            divArr[i].style.display = "flex";
        }
    }

}

const addUnit = (button) => {
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

const purchaseUpgrade = (button) => {
    const index = Array.from(upgradeButtons).indexOf(button);
    const upgrade = state.upgrades[index];
    state.totalGold -= Math.floor(upgrade.cost);

    upgrade.cost *= 2.5;
    upgradeButtons[index].innerText = `Buy: ${Math.floor(upgrade.cost)}g`
    upgrade.triggerEffect();
    updateTotalGoldDisplay();
    updateGoldDisplays();
}

checkAffordability();
setInterval(incrementGold, 1000);
setInterval(() => {
    if (state.totalGold > 0) {
        const randomMessageIdx = Math.floor(Math.random() * state.messages.length);
        message.innerText = state.messages[randomMessageIdx];
    }
}, 10000);