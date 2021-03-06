// import {quizapi} from './config.js';

let questionlist = [];
let choice = "linux";
let sumbitans = false;
let correctans = 0;

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
const choicelist = document.getElementById("category");

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
    
    choicelist.addEventListener("change", () => {
        choice = choicelist.value;
    })
    
})

backbtn.addEventListener("click", () => {
    btngroup.style.display = "block";
    customizefield.style.display = "none";
    btngroupcustomize.style.display = "none";
})

gobtn.addEventListener("click", () => {
    content.style.display = "none";
    questionpage.style.display = "block";
    fetchquestion("customize", choice);
})
/* initial */

/* fetch question based on question type or question type and category */
function fetchquestion(question_type, category)
{
    if(question_type == "random")
    {
        console.log("fetching random question...")
        fetch(`https://quizapi.io/api/v1/questions?apiKey=xLrepXP2CE14m5SRsx2rxk7Fb0pRVSDrGEKyq9q6&limit=10`)
        .then(response => response.json())
        .then(data => {
            questionlist = data;
            console.log("store data")
            return questionlist;
        })
        .then(qlist => {
            displayquestion(qlist, 0, correctans);
        })
    }
    else /* customize */
    {
        console.log("fetching customize question...")
        fetch(`https://quizapi.io/api/v1/questions?apiKey=xLrepXP2CE14m5SRsx2rxk7Fb0pRVSDrGEKyq9q6&category=${category}&limit=10`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            questionlist = data;
            console.log("store data")
            return questionlist;
        })
        .then(qlist => {
            displayquestion(qlist, 0, correctans);
        })
    }
}
/* fetch question based on question type or question type and category */

/* display question */
function displayquestion(qlist, qnum, correctans)
{
    let out = ``;
    const firstpart = `<div id="question-top">
                        <div id="question-btngroup">
                            <button id="submit" class="disable" disabled>SUBMIT</button>
                            <p id="question-num">Question ${qnum + 1}</p>
                            <button id="next" class="disable" disabled>Next</button>
                        </div>
                        </div>
                        <div id="question-content">
                            <p>${qlist[qnum].question}</p>
                            <div id="answer-options">
                                <ul>`
    let middlepart = ``;
    const lastpart = `</ul>
                    </div>
                </div>`

    for(let i in qlist[qnum].answers)
    {
        if(qlist[qnum].answers[i])
        {
            middlepart += `<li><button data-id="${i}" class="options">${qlist[qnum].answers[i]}</button></li>`
        }
    }

    out = firstpart + middlepart + lastpart;
    questionpage.innerHTML = out;
    selectAns(qlist, qnum, correctans);
}
/* display question */

/* select ans */
function selectAns(qlist, qnum, correctans)
{
    const nextbtn = document.querySelector("#next");
    const submitbtn = document.querySelector("#submit");
    const optionslist = document.querySelectorAll(".options");

    if(qnum + 1 == qlist.length)
    {
        nextbtn.style.visibility = "hidden";
    }

    submitbtn.addEventListener("click", () => {
        let curSelect = document.querySelector(".select");
        correctans = anscheck(qlist, qnum, curSelect, correctans);
        submitbtn.classList.add("disable");
        submitbtn.disabled = true;
        nextbtn.classList.remove("disable");
        nextbtn.disabled = false;

        if(qnum + 1 == qlist.length)
        {
            alert("Here is the end of the quiz! \nYou got " + correctans + " questions correct out of " + qlist.length);
        }
        else
        {
            nextbtn.addEventListener("click", () => {
                displayquestion(qlist, ++qnum, correctans);
            })
        }
    })

    optionslist.forEach(option => {
        option.addEventListener("click", () => {
            if(submitbtn.disabled && nextbtn.disabled)
            {
                submitbtn.classList.remove("disable");
                submitbtn.disabled = false;
            }
            
            if(nextbtn.disabled)
            {
                let curSelect = document.querySelector(".select");
                if(curSelect)
                {
                    curSelect.classList.remove("select");
                }

                option.classList.add("select");
            }
        })
    })
}
/* select ans */

/* check ans */
function anscheck(qlist, qnum, selectans, correctans)
{
    let a = selectans.dataset.id + "_correct";
    
    if(qlist[qnum].correct_answers[a] === "true")
    {
        selectans.classList.add("correct");
        alert("You got it right!");
        correctans++;
    }
    else
    {
        selectans.classList.add("wrong");
        alert("It is incorrect.");
    }

    return correctans;
}
/* check ans */

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


// out = `<div id="question-top">
//             <div id="question-btngroup">
//                 <button id="submit" class="disable" disabled>SUBMIT</button>
//                 <p id="question-num">Question ${qnum + 1}</p>
//                 <button id="next" class="disable" disabled>Next</button>
//             </div>
//         </div>
//         <div id="question-content">
//             <p>${qlist[qnum].question}</p>
//             <div id="answer-options">
//                 <ul>
//                     <li><button class="options">${qlist[qnum].answers.answer_a}</button></li>
//                     <li><button class="options">${qlist[qnum].answers.answer_b}</button></li>
//                     <li><button class="options">${qlist[qnum].answers.answer_c}</button></li>
//                     <li><button class="options">${qlist[qnum].answers.answer_d}</button></li>
//                     <li><button class="options">${qlist[qnum].answers.answer_e}</button></li>
//                     <li><button class="options">${qlist[qnum].answers.answer_f}</button></li>
//                 </ul>
//             </div>
//         </div>`