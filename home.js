document
  .getElementById("add-money-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const pinNumber = 1234;

    const bank = document.getElementById("bank").value;
    const accountNumber = document.getElementById("account-number").value;
    const addAmount = Number(document.getElementById("add-amount").value);
    const addPin = Number(document.getElementById("add-pin").value);
    const availableBalance = Number(
      document.getElementById("available-balance").innerText,
    );

    const alertContainer = document.getElementById("alert-container");

    // reusable function for alert
    function showAlert(message) {
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

    if (accountNumber.length !== 11) {
      showAlert("Warning: Account number must be 11 digits!");
      return;
    }

    if (addPin !== pinNumber) {
      showAlert("Warning: Invalid pin!");
      return;
    }

    const totalNewBalance = addAmount + availableBalance;

    document.getElementById("available-balance").innerText = totalNewBalance;
  });
