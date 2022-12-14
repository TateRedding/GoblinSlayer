let totalGold = 0;
let goldPerSecond = 0;

const totalGoldDisplay = document.getElementById("total_gold");
const goldPerSecondDisplay = document.getElementById("gold_per_second");

let totalFootsoldiers = 0;
let totalKnights = 0;
let totalMountedKnights = 0;
let totalCannons = 0;
const upgradeTotals = [totalFootsoldiers, totalKnights, totalMountedKnights, totalCannons]

const totalFootsoldiersDisplay = document.getElementById("total_footsolders");
const totalKnightsDisplay = document.getElementById("total_knights");
const totalMountedKnightsDisplay = document.getElementById("total_mounted_knights");
const totalCannonsDisplay = document.getElementById("total_cannons");
const upgradeTotalsDisplay = document.getElementsByClassName("upgrade_total");

let footsoldierCost = 10;
let knightCost = 50;
let mountedKnightCost = 150;
let cannonCost = 500;
const costs = [footsoldierCost, knightCost, mountedKnightCost, cannonCost];

const footsoldierGPS = 1;
const knightGPS = 5;
const mountedKnightGPS = 10;
const cannonGPS = 25;
const gpsAmounts = [footsoldierGPS, knightGPS, mountedKnightGPS, cannonGPS];

const upgrades = document.getElementById("upgrades");

const goblinButton = document.getElementById("goblin_button");
const upgradeButtons = document.getElementsByClassName("upgrade_button");

const message = document.getElementById("changing_message");
const messages = [
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

const updateTotalGoldDisplay = () => {
    totalGoldDisplay.innerText = `Total Gold: ${totalGold}`;
    checkAffordability();
}

const incrementGold = () => {
    totalGold += goldPerSecond;
    updateTotalGoldDisplay();
}

const checkAffordability = () => {
    for (let i = 0; i < upgradeButtons.length; i++) {
        currList = upgradeButtons[i].classList;
        (totalGold >= costs[i]) ? currList.remove("cant_afford") : currList.add("cant_afford");
    }
}

const addUpgrade = (button) => {
    const index = Array.from(upgradeButtons).indexOf(button);
    totalGold -= Math.floor(costs[index]);
    updateTotalGoldDisplay();

    goldPerSecond += gpsAmounts[index];
    goldPerSecondDisplay.innerText = `Gold per second: ${goldPerSecond}`;

    upgradeTotals[index]++;
    upgradeTotalsDisplay[index].innerText = `Total: ${upgradeTotals[index]}`;

    costs[index] *= 1.2;
    upgradeButtons[index].innerText = `Buy: ${Math.floor(costs[index])}g`;

}

checkAffordability();

setInterval(incrementGold, 1000);

setInterval(() => {
    if (totalGold > 0) {
        const messageIndex = Math.floor(Math.random() * messages.length);
        message.innerText = messages[messageIndex];
    }
}, 10000);

goblinButton.addEventListener("click", () => {
    totalGold++;
    updateTotalGoldDisplay();
});

upgrades.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.nodeName === "BUTTON" && !clickEvent.target.matches(".cant_afford")) {
        addUpgrade(clickEvent.target);
    }
})