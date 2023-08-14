const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const getDeposit = () => {
  while (true) {
    const depAmt = prompt("Enter the deposit amount : ");
    const ndepAmt = parseFloat(depAmt);
    if (isNaN(ndepAmt) || ndepAmt < 0) {
      console.log("Invalid deposit amount. Enter a valid amount.");
    } else {
      return ndepAmt;
    }
  }
};

const getLine = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet(1-3) : ");
    const nlines = parseFloat(lines);
    if (isNaN(nlines) || nlines > 3 || nlines < 1)
      console.log("Enter proper number of lines");
    else {
      return nlines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet amount per line : ");
    const nbet = parseFloat(bet);
    if (isNaN(nbet) || nbet <= 0 || nbet > balance / lines) {
      console.log("Enter proper bet amount");
    } else {
      return nbet;
    }
  }
};
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  // console.log(symbols);
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const symbolIndex = Math.floor(Math.random() * reelSymbols.length);
      reels[i].push(reelSymbols[symbolIndex]);
      reelSymbols.splice(symbolIndex, 1);
    }
  }
  return reels;
};

const printRows = (reels) => {
  for (let j = 0; j < COLS; j++) {
    let rowString = "";
    for (let i = 0; i < ROWS; i++) {
      rowString += reels[i][j];
      if (i != ROWS - 1) rowString += " | ";
    }
    console.log(rowString);
  }
};
const getWinnings = (reels, bet, lines) => {
  let win = 0;
  for (let j = 0; j < lines; j++) {
    let char = reels[0][j];
    let cnt = 0;
    for (let i = 0; i < COLS; i++) {
      if (reels[i][j] != char) {
        cnt = 1;
        break;
      }
    }
    if (cnt == 0) win += bet * SYMBOL_VALUES[char];
  }
  console.log(win);
  return win;
};

const game = () => {
  let balance = getDeposit();
  while (true) {
    console.log(`You have a current balance of $${balance}`);
    const bLines = getLine();
    const bet = getBet(balance, bLines);
    balance -= bet * bLines;
    const reels = spin();
    printRows(reels);
    const res = getWinnings(reels, bet, bLines);
    balance += res;
    console.log(`You won, $${balance}`);
    // console.log(balance);
    if (balance <= 0) {
      console.log("You ran out of money !");
      break;
    }
    const play = prompt("Do you want to play again (y/n) ? ");
    if (play != "y") break;
  }
};
game();
