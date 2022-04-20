const account1 = {
  owner: "jonas arnold",
  movements: [200, 450, -650, -130, 70, 1300, -200, 3000],
  interestRate: 1.4,
  pin: 1111,
};

const account2 = {
  owner: "chom brown",
  movements: [200, 450, 407, 500],
  interestRate: 1.3,
  pin: 6531,
};
const account3 = {
  owner: "smith willo",
  movements: [200, 450, -650, -130, 70, 1300, -200],
  interestRate: 1.1,
  pin: 2352,
};

const account4 = {
  owner: "love green",
  movements: [5000, -2500],
  interestRate: 1.2,
  pin: 1112,
};
const account5 = {
  owner: "Forever Ready",
  movements: [5000, -2500],
  interestRate: 1.2,
  pin: 1112,
};
const accounts = [account1, account2, account3, account4, account5];

const myCharges = document.querySelector(".summary");

const balance_value = document.querySelector(".balance_value");

const incomeFee = document.querySelector(".income-money");

const goingFee = document.querySelector(".outgoing-money");

const interestFee = document.querySelector(".interest-money");

const inputUsername = document.querySelector(".input-username");

const inputPin = document.querySelector(".input-pin");

const loginButton = document.querySelector(".login-button");

const welcomeNote = document.querySelector(".welcome-note");

const mainContainer = document.querySelector(".main-cont");

const transferInputUser = document.querySelector(".transferInputUser");

const transferInputAmount = document.querySelector(".transferInputAmount");

const transferButton = document.querySelector(".transferButton");

const closeButton = document.querySelector(".closeButton");

const closeAccountUser = document.querySelector(".closeAccountUser");

const closeAccountPin = document.querySelector(".closeAccountPin");

const loanButton = document.querySelector(".loanButton");

const loanAmount = document.querySelector(".loanAmount");

// const buttonSort = document.querySelector(".buttonSort");

const timerLabel = document.querySelector(".timerLabel");

const diplayMoney = function (movements, sortParams = false) {
  // (myCharges.innerHTML = ""),

  // const movs = sortParams ? movements.slice().sort((a, b)=>a -b ): movements;

  // console.log(movs)

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "Deposit" : "Withdrawal";
    const styled = mov > 0 ? "success" : "danger";

    const html = `<div class="card shadow mb-1 " >
        <div class="card-body">
          <div class="row  justify-content-evenly ">
          <div class="col-md-6 col-sm-12 d-flex  text-center align-items-center">
    
              <div class=" fs-6 p-1 text-white  me-2  bg-${styled} rounded-pill">${
      i + 1
    } ${type}</div>
              <div class=" ">Card subtitle</div>
          </div>
          <div class=" col-md-6 col-sm-12 text-end align-items-center">
              <div class=" align-self-center">${Math.abs(mov)}</div>
          </div>
        
        </div>
    </div>
      </div>`;

    //    myCharges.insertAdjacentHTML("beforeend", html)
    myCharges.insertAdjacentHTML("afterbegin", html);
  });
};

// getting the cash in flow

const calInFlow = function (mov) {
  const incom = mov.movements
    .filter(function (item) {
      return item > 0;
    })
    .reduce(function (total, current) {
      return (total += current);
    }, 0);
  incomeFee.textContent = `${incom}`;

  const FeeOut = mov.movements
    .filter(function (item) {
      return item < 0;
    })
    .reduce(function (total, current) {
      return (total += current);
    }, 0);

  goingFee.textContent = `${Math.abs(FeeOut)}`;

  // calculating interest base on 1.2

  const interest = mov.movements
    .filter(function (item) {
      return item > 0;
    })
    .map(function (item) {
      return (item * mov.interestRate) / 100;
    })
    .reduce(function (total, current) {
      return (total += current);
    });

  interestFee.textContent = `${interest.toFixed(2)}`;
};

// const new_user = userName.toLowerCase().split(' ').map(function(name){
//   return name[0]

// }).join('')

// console.log(new_user)

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};

createUserName(accounts);
console.log(accounts);

//  reduce function

const total_balance = function (accTotal) {
  // const tester = [200, 500, 600, 800, 700 , 5000 , 8000 , -4000, 500]
  accTotal.balance = accTotal.movements.reduce((total, current, i, arr) => {
    return (total += current);
  }, 0);

  balance_value.textContent = `$${accTotal.balance}`;
};

// updating UI

const updateUI = function (curr) {
  // All transaction
  diplayMoney(curr.movements);

  // display all transaction summary
  calInFlow(curr);

  // display balance
  total_balance(curr);
};

// timer functionality
const startLogout = function () {
  // set timer
  let time = 100;

  // call setInterval
  const countDown = setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // let send time to UI
    timerLabel.textContent = `You will be logout at ${min}:${sec}`;

    // logic to log out
    if (time === 0) {
      clearInterval(countDown);

      welcomeNote.textContent = `login to get started`;

      mainContainer.style.opacity = 0;
    }

    // each interval should have a decrease in time
    time--;
  }, 1000);
};

// functions of the form for login

let currentUser;

loginButton.addEventListener("click", function (e) {
  // this prevent form from submitting
  e.preventDefault();
  // console.log(`clicked again again!!!!`)
  currentUser = accounts.find(function (item) {
    return item.username === inputUsername.value;
  });
  console.log(currentUser);

  if (currentUser?.pin === Number(inputPin.value)) {
    console.log("logined in");
    mainContainer.style.opacity = 100;

    // show page and all transaction

    welcomeNote.textContent = `welcome, ${currentUser.owner.split(" ")[0]}`;

    // clear form fields
    inputUsername.value = inputPin.value = "";

    //  updating UI
    startLogout();

    updateUI(currentUser);
  }
  console.log(currentUser);
});

transferButton.addEventListener("click", function (e) {
  e.preventDefault();

  const Amount = Number(transferInputAmount.value);
  const recieverAccount = accounts.find(function (item) {
    return item.username === transferInputUser.value;
  });

  transferInputAmount.value = transferInputUser.value = "";

  if (
    Amount > 0 &&
    recieverAccount &&
    recieverAccount?.username !== currentUser.username &&
    currentUser.balance >= Amount
  ) {
    currentUser.movements.push(-Amount);
    recieverAccount.movements.push(Amount);
  }

  updateUI(currentUser);
});

// request loan
loanButton.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(loanAmount.value);
  if (
    amount >= 0 &&
    currentUser.movements.some(function (item) {
      return item >= amount * 0.1;
    })
  ) {
    currentUser.movements.push(amount);
    updateUI(currentUser);
  }

  loanAmount.value = "";
});

// clodes account

closeButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    closeAccountUser.value === currentUser.username &&
    Number(closeAccountPin.value) === currentUser.pin
  ) {
    const index = accounts.findIndex(function (item) {
      return item.username === currentUser.username;
    });

    console.log(index);

    accounts.splice(index, 1);

    mainContainer.style.opacity = 0;
  }
});

// sorting button
// let sorted = false
// buttonSort.addEventListener('click', function(e){
//   e.preventDefault();
//   diplayMoney(currentUser.movements, !sorted)
//   sorted = !sorted

// })

// let balance = 0

// for(const mov of tester){
//     balance += mov
// }

// console.log(balance)
