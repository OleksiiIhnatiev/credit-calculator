const loanInput = document.getElementById("loan-amount");
const loanSlider = document.getElementById("loan-amount-slider");
const periodInput = document.getElementById("repayment-period");
const periodSlider = document.getElementById("repayment-period-slider");
const submitBtn = document.getElementById("submit-btn");
const errorMsg = document.getElementById("error-message");
const dailyPayment = document.getElementById("daily-payment");
const totalPayment = document.getElementById("total-payment");

const MIN_LOAN = 1000;
const MAX_LOAN = 50000;
const MIN_PERIOD = 7;
const MAX_PERIOD = 60;
const INTEREST_RATE = 2.2;

function calculate() {
  const loanAmount = parseFloat(loanInput.value);
  const repaymentPeriod = parseInt(periodInput.value);

  if (
    isNaN(loanAmount) ||
    isNaN(repaymentPeriod) ||
    loanAmount < MIN_LOAN ||
    loanAmount > MAX_LOAN ||
    repaymentPeriod < MIN_PERIOD ||
    repaymentPeriod > MAX_PERIOD
  ) {
    dailyPayment.textContent = `0 грн`;
    totalPayment.textContent = `0 грн`;
    return;
  }

  const dailyRate =
    (loanAmount + loanAmount * (INTEREST_RATE / 100) * repaymentPeriod) /
    repaymentPeriod;
  const totalRepayment = dailyRate * repaymentPeriod;

  dailyPayment.textContent = `${dailyRate.toFixed(2)} грн`;
  totalPayment.textContent = `${totalRepayment.toFixed(2)} грн`;
}

function validate() {
  const loanAmount = parseFloat(loanInput.value);
  const repaymentPeriod = parseInt(periodInput.value);

  let errorMessage = "";

  if (loanInput.value.trim() === "") {
    errorMessage += "Сума кредиту не може бути порожньою.\n";
  }

  if (periodInput.value.trim() === "") {
    errorMessage += "Період погашення не може бути порожнім.\n";
  }

  if (loanAmount < MIN_LOAN) {
    errorMessage += `Сума кредиту повинна бути не менше ${MIN_LOAN} грн.\n`;
  } else if (loanAmount > MAX_LOAN) {
    errorMessage += `Сума кредиту повинна бути не більше ${MAX_LOAN} грн.\n`;
  }

  if (repaymentPeriod < MIN_PERIOD) {
    errorMessage += `Період погашення повинен бути не менше ${MIN_PERIOD} днів.\n`;
  } else if (repaymentPeriod > MAX_PERIOD) {
    errorMessage += `Період погашення повинен бути не більше ${MAX_PERIOD} днів.\n`;
  }

  if (errorMessage) {
    errorMsg.textContent = errorMessage;
  } else {
    errorMsg.textContent = "";
  }

  submitBtn.disabled =
    !loanInput.checkValidity() || !periodInput.checkValidity();
  if (errorMessage) {
    dailyPayment.textContent = `0 грн`;
    totalPayment.textContent = `0 грн`;
  }
}

function syncInputs(from, to) {
  from.addEventListener("input", () => {
    if (from.value < 0) from.value = 0;

    to.value = from.value;
    validate();
    calculate();
  });

  to.addEventListener("input", () => {
    if (to.value < 0) to.value = 0;

    from.value = to.value;
    validate();
    calculate();
  });
}

syncInputs(loanInput, loanSlider);
syncInputs(periodInput, periodSlider);

loanInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
  validate();
  calculate();
});

periodInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
  validate();
  calculate();
});

const loanForm = document.getElementById("loan-form");
loanForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
