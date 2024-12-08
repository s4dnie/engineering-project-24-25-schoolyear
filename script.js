const form = document.getElementById("form-id");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const timeselect = document.getElementById("select"); //get dropdown menu
    var x = timeselect.selectedIndex; //get selected option
    var y = timeselect.options; //get all options

    var boxesSelect = document.querySelectorAll("input[type='checkbox']:checked");
    const selectedValues = Array.from(boxesSelect).map(checkbox => checkbox.value);
 
    if (selectedValues <= 0) {
        alert("You must select at least one area!");
    }else {
        window.location.href = "program.html";
    }
});