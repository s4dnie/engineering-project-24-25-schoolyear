$("#program").hide();

const form = document.getElementById("form-id");
const timeDisplay = document.querySelector(".timer");
const button = document.getElementById("start");



function getValues() {
    let timeselect;
    let breaklength;
    let boxesSelect;
    let selectedValues;

    timeselect = document.getElementById("select"); //get dropdown menu
    var x = timeselect.selectedIndex; //get selected option
    var y = timeselect.options; //get all options
    breaklength = y[x].value;

    boxesSelect = document.querySelectorAll("input[type='checkbox']:checked"); //node list of checked boxes
    selectedValues = Array.from(boxesSelect).map(checkbox => checkbox.value); //turn checked boxes into an array

    return [selectedValues, breaklength];
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    values = getValues();

    if (values[0] <= 0) {
        alert("You must select at least one area!");
    } else {
        $("#program").show()
        $("#info").hide();
        $("#startup").hide();
        $("#subtitle").hide();
        cyclethrough();
    }
});

function cyclethrough() {
    function timer(seconds) {
        let countdown;
        const now = Date.now();
        const then = now + seconds * 1000;
        displayTimeLeft(seconds);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft < 0) {
                
                clearInterval(countdown);
                return;
            }
            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

        timeDisplay.textContent = display;
    }

    for (let i = 0; i < values[0].length; i++) {
        button.addEventListener("click", function () {
            timer(300);
        })
    }
}
