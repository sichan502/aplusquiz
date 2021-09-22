const startbtn = document.querySelector("#start");
const btngroup = document.querySelector("#btngroup");
const content = document.querySelector("#content")

startbtn.addEventListener("click", () => {
    startbtn.style.display = "none";
    btngroup.style.display = "inline-block";
})

const randombtn = document.querySelector("#random");
const questionpage = document.querySelector("#question");

randombtn.addEventListener("click", () => {
    content.style.display = "none";
    questionpage.style.display = "block";
})