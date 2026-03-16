const pinNumber = 1234;

// reusable function for alert
function showAlert(message, containerId) {
  const alertContainer = document.getElementById(containerId);
  alertContainer.innerHTML = `
        <div role="alert" class="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>${message}</span>
        </div>
      `;
  setTimeout(() => (alertContainer.innerHTML = ""), 3000);
}

// reusable function to get value number
function getValueNumber(value) {
  return Number(document.getElementById(value).value);
}

// reusable function to get value
function getValue(value) {
  return document.getElementById(value).value;
}

// reusable funciton to get innertext
function getInnerText(value) {
  return Number(document.getElementById(value).innerText);
}

// resuable funciton to set innerText for available balance
function setInnerText(value) {
  document.getElementById("available-balance").innerText = value;
}

// resuable funciton for display

function handleToggle(id) {
  const forms = document.getElementsByClassName("form");
  for (const form of forms) {
    form.style.display = "none";
  }

  document.getElementById(id).style.display = "block";
}

// resuable funciton to toggle button style

function handleBtnToggle(id) {
  const formBtns = document.getElementsByClassName("form-btn");

  for (const btn of formBtns) {
    btn.classList.remove("border-[#0874F2]", "bg-[#0874f20d]");
    btn.classList.add("border-[#0808081a]");
  }

  document.getElementById(id).classList.remove("border-[#0808081a]");

  document
    .getElementById(id)
    .classList.add("border-[#0874F2]", "bg-[#0874f20d]");
}
// add money feature
document
  .getElementById("add-money-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const bank = getValue("bank");

    const accountNumber = getValue("account-number");

    const addAmount = getValueNumber("add-amount");

    const addPin = getValueNumber("add-pin");

    const availableBalance = getInnerText("available-balance");

    if (accountNumber.length !== 11) {
      showAlert(
        "Warning: Account number must be 11 digits!",
        "add-money-alert",
      );
      return;
    }

    if (addPin !== pinNumber) {
      showAlert("Warning: Invalid pin!", "add-money-alert");
      return;
    }

    const totalNewBalance = addAmount + availableBalance;

    setInnerText(totalNewBalance);
  });

//   cashout money feature
document.getElementById("withdraw-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const amount = getValueNumber("withdraw-amount");

  const availableBalance = getInnerText("available-balance");

  const agentNumber = getValue("agent-number");

  const cashoutPin = getValueNumber("cashout-pin");

  if (agentNumber.length !== 11) {
    showAlert("Warning: Agent number must be 11 digits!", "cashout-alert");
    return;
  }

  if (cashoutPin !== pinNumber) {
    showAlert("Warning: Invalid pin!", "cashout-alert");
    return;
  }

  if (amount > availableBalance) {
    showAlert("Warning: Insufficient balance!", "cashout-alert");
    return;
  }

  const totalNewBalance = availableBalance - amount;

  setInnerText(totalNewBalance);
});

// transfer money feature
document.getElementById("transfer-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const userNumber = getValue("transfer-account-number");

  const transferAmount = getValueNumber("transfer-amount");

  const availableBalance = getInnerText("available-balance");

  const transferPin = getValueNumber("transfer-pin");

  if (userNumber.length !== 11) {
    showAlert("Warning: Agent number must be 11 digits!", "transfer-alert");
    return;
  }

  if (transferPin !== pinNumber) {
    showAlert("Warning: Invalid pin!", "transfer-alert");
    return;
  }

  if (transferAmount > availableBalance) {
    showAlert("Warning: Insufficient balance!", "cashout-alert");
    return;
  }

  const totalNewBalance = availableBalance - transferAmount;

  setInnerText(totalNewBalance);
});

// get bonus

let couponUsed = false;

document.getElementById("bonus-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const bonus = 1000;
  const bonusCoupon = getValue("bonus");

  const availableBalance = getInnerText("available-balance");

  if (couponUsed) {
    showAlert("Warning: Coupon already used!", "bonus-alert");
    return;
  }

  if (bonusCoupon.length !== 4 || isNaN(bonusCoupon)) {
    showAlert("Warning: Invalid coupon!", "bonus-alert");
    return;
  }

  const totalNewBalance = bonus + availableBalance;

  setInnerText(totalNewBalance);

  couponUsed = true;
});

// Pay bill
document.getElementById("bill-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const billerAccountNumber = getValue("bill-account-number");

  const amountToPay = getValueNumber("bill-amount");

  const availableBalance = getInnerText("available-balance");

  const billPin = getValueNumber("bill-pin");

  if (billerAccountNumber.length !== 11 || isNaN(billerAccountNumber)) {
    showAlert(
      "Warning: Biller Account number must be 11 digits!",
      "bill-alert",
    );
    return;
  }

  if (billPin !== pinNumber) {
    showAlert("Warning: Invalid pin!", "bill-alert");
    return;
  }

  if (amountToPay > availableBalance) {
    showAlert("Warning: Insufficient balance!", "bill-alert");
    return;
  }

  const totalNewBalance = availableBalance - amountToPay;

  setInnerText(totalNewBalance);
});

// toggling feature

// Add money
document.getElementById("add-button").addEventListener("click", function () {
  // toggle
  handleToggle("add-money-parent");
  // button style
  handleBtnToggle("add-button");
});

// Cashout
document
  .getElementById("cash-out-button")
  .addEventListener("click", function () {
    handleToggle("cash-out-parent");

    // button style
    handleBtnToggle("cash-out-button");
  });

// Transfer money
document
  .getElementById("transfer-button")
  .addEventListener("click", function () {
    handleToggle("transfer-money-parent");

    // button style
    handleBtnToggle("transfer-button");
  });

//   Get bonus
document.getElementById("bonus-button").addEventListener("click", function () {
  handleToggle("get-bonus-parent");

  // button style
  handleBtnToggle("bonus-button");
});

//   Pay Bill
document
  .getElementById("pay-bill-button")
  .addEventListener("click", function () {
    handleToggle("pay-bill-parent");

    // button style
    handleBtnToggle("pay-bill-button");
  });
