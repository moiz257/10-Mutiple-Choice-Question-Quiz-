#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.cyanBright("          MULTIPLE CHOICE QUESTION  'QUIZ'          \n"));


const apiLink:string="https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let fetchData=async(data:string)=>{
    let fetchQuiz:any=await fetch(data)
    let quizQ=await fetchQuiz.json();
    return quizQ.results;
}
let quiz=await fetchData(apiLink)
let startQuiz=async()=>{
    let score:number=0
    // for username
let nameAnswer=await inquirer.prompt(
    {
        name:"question1",
        message:chalk.bold.hex("#e6b209")("\nFIRST. ENTER YOUR NAME!"),
        type:"input",       
        validate:function(value){
            if(value.trim()!=="")
                return true
            return chalk.underline.redBright("\n ENTER A VALID NAME!!")
        }

    }
)
for(let i=1; i<10 ;i++){
    let answer=[...quiz[i].incorrect_answers,quiz[i].correct_answer];

     let ans=await inquirer.prompt(
        {
            name:"ques",
            type:"list",
            message:quiz[i].question,
            choices:answer.map((val:any)=>val)
        }
     )
     if(ans.ques==quiz[i].correct_answer){
        ++score
     }
}
console.log(chalk.bold.hex("#e6b209")(` CORRECT ANSWER.${score}`),(chalk.bold.hex("#e6b209")("\nMULTIPLE CHOICE QUESTION  'QUIZ' IS END")))
}
startQuiz()
