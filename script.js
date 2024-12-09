const form = document.getElementById("form-id");
const inst = document.getElementById("instructions");

inst.style.display = "none";

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const timeselect = document.getElementById("select"); //get dropdown menu
    var x = timeselect.selectedIndex; //get selected option
    var y = timeselect.options; //get all options

    var boxesSelect = document.querySelectorAll("input[type='checkbox']:checked");
    const selectedValues = Array.from(boxesSelect).map(checkbox => checkbox.value);

    console.log(selectedValues);

    if (selectedValues <= 0) {
        alert("You must select at least one area!");
    } else {
        inst.style.display = "block";

        let check_container = document.getElementById("startup")
        check_container.style.display = "none";

        inst.querySelector("span").innerHTML = "You will now work on: the " + selectedValues[0].toString();
        document.getElementById("do-not-attempt").innerHTML = "Do not attempt to clean anything other than the " + selectedValues[0].toString();
    }
});

