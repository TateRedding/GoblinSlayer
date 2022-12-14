let totalGold = 0;
let goldPerSecond = 0;

const totalGoldDisplay = document.getElementById("total_gold");
const goldPerSecondDisplay = document.getElementById("gold_per_second");

const upgradeTotalsDisplay = document.getElementsByClassName("upgrade_total");
const upgradeTotals = Array.from(upgradeTotalsDisplay).map(element => Number(element.innerText.split(' ')[1]));

const upgradeButtons = document.getElementsByClassName("upgrade_button");
const costs = Array.from(upgradeButtons).map(element => Number(element.innerText.split(' ')[1].slice(0, element.innerText.split(' ')[1].length-1)));

const gps = document.getElementsByClassName("gps");
const gpsAmounts = Array.from(gps).map(element => Number(element.innerText.split(' ')[0]));

const upgradeDiv = document.getElementById("upgrades");

const goblinButton = document.getElementById("goblin_button");

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

upgradeDiv.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.nodeName === "BUTTON" && !clickEvent.target.matches(".cant_afford")) {
        addUpgrade(clickEvent.target);
    }
})