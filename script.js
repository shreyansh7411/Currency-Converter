async function fetchCurrencies() {
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        const currencyOptions = Object.keys(data.rates);
        
        const fromCurrency = document.getElementById("fromCurrency");
        const toCurrency = document.getElementById("toCurrency");
        
        currencyOptions.forEach(currency => {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.innerText = currency;
            fromCurrency.appendChild(option1);
            
            const option2 = document.createElement("option");
            option2.value = currency;
            option2.innerText = currency;
            toCurrency.appendChild(option2);
        });
    } catch (error) {
        console.error("Error fetching currency list:", error);
    }
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultField = document.getElementById("result");

    if (!amount || isNaN(amount) || amount <= 0) {
        resultField.innerText = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        
        if (!rate) {
            resultField.innerText = "Invalid currency conversion.";
            return;
        }
        
        const convertedAmount = (amount * rate).toFixed(2);
        resultField.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultField.innerText = "Error fetching exchange rates. Try again later.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchCurrencies();
    document.getElementById("convertBtn").addEventListener("click", convertCurrency);
});
