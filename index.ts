#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";  // Importing chalk for colored and bold text

// Prompting the user to enter the amount of seconds
async function promptUser(): Promise<number> {
  const res = await inquirer.prompt<{ userInput: number }>({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of seconds",
    validate: (input) => {
      if (isNaN(input)) {
        return "Please enter a valid number";
      } else if (input > 60) {
        return "Seconds must be 60 or less";
      }
      return true;
    },
  });
  return res.userInput;
}

async function startTimer() {
  const input = await promptUser();

  function startTime(val: number) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);

    setInterval(() => {
      const currTime = new Date();
      const timeDiff = differenceInSeconds(intervalTime, currTime);

      if (timeDiff <= 0) {
        console.log(chalk.bold.red("Timer has expired"));
        process.exit();
      }

      const min = Math.floor(timeDiff / 60);
      const sec = timeDiff % 60;
      console.log(chalk.bold.blue(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
  }

  startTime(input);
}

startTimer();
