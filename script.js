const form = document.getElementById("form-id"); //form where user selects areas to clean + break length
const program = document.getElementById("program"); //container for the cleaning instructions
const subtitle = document.getElementById("area"); //title that indicates where user cleans
const timeDisplay = document.querySelector(".timer"); //timer display
const button = document.getElementById("start"); //timer start button
const breakScreen = document.getElementById("break-screen"); //break screen
const timeDisplay2 = document.getElementById("break-timer"); //break timer display
const audio = new Audio("alert_soundeffect.mp3");

$("#program").hide();
$("#break-screen").hide();
$("#end-screen").hide();

function getSelectedOptions() {
    const timeselect = document.getElementById("select"); //get dropdown menu
    let x = timeselect.selectedIndex;
    let y = timeselect.options;
    let breaklength = y[x].value; //get selected break length

    let checkedboxes = document.querySelectorAll("input[type='checkbox']:checked"); //node list of checked boxes
    let selectedValues = Array.from(checkedboxes).map(checkbox => checkbox.value); //turn checked boxes into an array

    if (selectedValues <= 0) {
        alert("You must select at least one area!");
    } else {
        $("#program").show();
        $("#info").hide();
        $("#startup").hide();
        $("#subtitle").hide();
    }

    return [selectedValues, breaklength]; //returns both the array of checked boxes and the break length in an array
}

function displayArea_Time() {
    let values = getSelectedOptions();
    let checkedboxes = values[0];
    let i = 0;
    let finish = checkedboxes.at(-1);

    function showBreak() {
        let breaklength = values[1];
        let num = Number(breaklength);

        audio.play();
        $("#break-screen").show();
        $("#program").hide();
        timer(num * 60, timeDisplay2);
        setTimeout(() => {
            i++;
            audio.play();
            $("#program").show();
            $("#break-screen").hide();
        }, num * 60 * 1000);
    }

    $("#start").click(() => {
        if (i <= checkedboxes.indexOf(finish)) {
            $("#area").text("You will now clean: " + checkedboxes[i]);
            timer(300, timeDisplay);
            setTimeout(showBreak, 300000);
        } else if (i > checkedboxes.indexOf(finish)) {
            $("#program").hide();
            $("#break-screen").hide();
            $("#end-screen").show();
        }
    })

}

function timer(seconds, display) {
    let countdown;
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds, display);

    if (!countdown) {
        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdown);
                return;
            }
            displayTimeLeft(secondsLeft, display);
        }, 1000);
    }

}

function displayTimeLeft(seconds, element) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    element.textContent = display;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    displayArea_Time();
})

