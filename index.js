import {quizapi} from './config.js';

let questionlist = [];
const randombtn = document.querySelector("#random");
const customizebtn = document.querySelector("#customize");
const questionpage = document.querySelector("#question");

const startbtn = document.querySelector("#start");
const btngroup = document.querySelector("#btngroup");
const btngroupcustomize = document.querySelector("#btngroup-customize");
const customizefield = document.querySelector("#customize-field");
const content = document.querySelector("#content");
const backbtn = document.querySelector("#back");
const gobtn = document.querySelector("#go");

/* initial */
startbtn.addEventListener("click", () => {
    startbtn.style.display = "none";
    btngroup.style.display = "inline-block";
})

randombtn.addEventListener("click", () => {
    content.style.display = "none";
    questionpage.style.display = "block";
    fetchquestion("random", "")
})

customizebtn.addEventListener("click", () => {
    startbtn.style.display = "none";
    btngroup.style.display = "none";
    customizefield.style.display = "block";
    btngroupcustomize.style.display = "block";
})

backbtn.addEventListener("click", () => {
    btngroup.style.display = "block";
    customizefield.style.display = "none";
    btngroupcustomize.style.display = "none";
})

gobtn.addEventListener("click", () => {
    content.style.display = "none";
    questionpage.style.display = "block";
    fetchquestion("customize", "")
})
/* initial */

/* fetch question based on question type or question type and category */
function fetchquestion(question_type, category)
{
    if(question_type == "random")
    {
        console.log("fetching random question...")
        fetch(`https://quizapi.io/api/v1/questions?apiKey=${quizapi}&limit=10`)
        .then(response => response.json())
        .then(data => {
            questionlist = data;
            console.log("store data")
            return questionlist;
        })
        .then(qlist => {
            displayquestion(qlist, 0);
        })
    }
    else /* customize */
    {
        console.log("fetching customize question...")
        fetch(`https://quizapi.io/api/v1/questions?apiKey=${quizapi}&category=${category}&limit=10`)
        .then(response => response.json())
        .then(data => {
            questionlist = data;
            console.log("store data")
            return questionlist;
        })
        .then(qlist => {
            displayquestion(qlist, 0);
        })
    }
}
/* fetch question based on question type or question type and category */

/* display question */
function displayquestion(qlist, qnum)
{
    console.log("display question")
    let out = ``;
    out = `<div id="question-top">
                <div id="question-btngroup">
                    <button id="submit" class="disable">SUBMIT</button>
                    <p id="question-num">Question ${qnum + 1}</p>
                    <button id="next" class="disable">Next</button>
                </div>
            </div>
            <div id="question-content">
                <p>${qlist[qnum].question}</p>
                <div id="answer-options">
                    <ul>
                        <li><button class="options">${qlist[qnum].answers.answer_a}</button></li>
                        <li><button class="options">${qlist[qnum].answers.answer_b}</button></li>
                        <li><button class="options">${qlist[qnum].answers.answer_c}</button></li>
                        <li><button class="options">${qlist[qnum].answers.answer_d}</button></li>
                        <li><button class="options">${qlist[qnum].answers.answer_e}</button></li>
                        <li><button class="options">${qlist[qnum].answers.answer_f}</button></li>
                    </ul>
                </div>
            </div>`
    questionpage.innerHTML = out;
    setbtn(qlist, ++qnum);
}
/* display question */

/* set up button */
function setbtn(qlist, qnum)
{
    const nextbtn = document.querySelector("#next");
    const submitbtn = document.querySelector("#submit");
    const optionslist = document.querySelectorAll(".options");
    /* click submit */

    submitbtn.addEventListener("click", () => {
        nextbtn.classList.remove("disable");
        submitbtn.classList.add("disable");
    })

    /* click submit */

    if(qnum == 10)
    {
        nextbtn.style.visibility = "hidden";
    }
    else
    {
        /* click next */
        nextbtn.addEventListener("click", () => {
            console.log("next question");

            displayquestion(qlist, qnum);
        })
        /* click next */
    }
    

    /* select ans */

    optionslist.forEach(option => {
        option.addEventListener("click", () => {
            let curSelect = document.querySelector(".select");
            if(curSelect)
            {
                curSelect.classList.remove("select");
            }
            
            option.classList.add("select");
            submitbtn.classList.remove("disable")
        })
    })

    /* select ans */
}
/* set up button */

/* <div id="question-top">
                <div id="question-btngroup">
                    <button id="submit" class="disable">SUBMIT</button>
                    <p id="question-num">Question 1</p>
                    <button id="next" class="disable">Next</button>
                </div>
            </div>
            <div id="question-content">
                <p>Which of the following is NOT a valid 
                    PHP comparison operator?</p>
                <div id="answer-options">
                    <ul>
                        <li><button class="options"><=></button></li>
                        <li><button class="options"><></button></li>
                        <li><button class="options">>==</button></li>
                        <li><button class="options">>=</button></li>
                    </ul>
                </div>
            </div> */