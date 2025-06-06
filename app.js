const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");


for (let select of dropdowns) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === "from" && code === "USD") newOption.selected = true;
    if (select.name === "to" && code === "INR") newOption.selected = true;
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (ele) => {
  const currcode = ele.value;
  const countrycode = countryList[currcode];
  const img = ele.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountvalue = parseFloat(amount.value);
  if (isNaN(amountvalue) || amountvalue <= 0) {
    amountvalue = 1;
    amount.value = "1";
  }

  const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    const converted = (rate * amountvalue).toFixed(2);
    document.querySelector(".msg").innerText = `${amountvalue} ${fromcurr.value} = ${converted} ${tocurr.value}`;
  } catch (error) {
    console.error("Error fetching currency data:", error.message);
    document.querySelector(".msg").innerText = "Error fetching data.";
  }
});