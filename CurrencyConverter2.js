let Currency1 = document.getElementById("Currency1Text")
let Currency2 = document.getElementById("Currency2Text")
let MainContainer = document.getElementById("MainContainer")
let DropdownCurrency1 = document.getElementById("Currency1")
let DropdownCurrency2 = document.getElementById("Currency2")
// NEW: reference to the swap button added in the HTML redesign
let SwapButton = document.getElementById("SwapButton")

const currecnyRegex = /^[0-9]+\.{0,1}[0-9]*$/

window.conversionRates = null;

fetch(`https://v6.exchangerate-api.com/v6/${window.API_KEY}/latest/USD`)
  .then(response => response.json())
  .then(data => {
    window.conversionRates = data.conversion_rates;
  });

Currency1.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        event.preventDefault()
    }
})
Currency1.addEventListener("input", ()=>{
    if (currecnyRegex.test(Currency1.value)){
        Currency2.value = Currency1.value
        convertCurrency()
    }else{
        if (Currency1.value === ""){
            Currency1.value = ""
            Currency2.value = Currency1.value
            return
        }
        alert("Please enter only numbers/valid currency format : (00.00)")
        Currency1.value = ""
        Currency2.value = Currency1.value
    }
})

function convertCurrency(){
    let currentDropdownCurrency1 = DropdownCurrency1.value
    let currentDropdownCurrency2 = DropdownCurrency2.value
    let currentCurrency1Value = Currency1.value
    let newVal = 0
    newVal = Number(currentCurrency1Value/window.conversionRates[currentDropdownCurrency1] * (window.conversionRates[currentDropdownCurrency2])).toFixed(2)
    Currency2.value = newVal
}

function convertCurrency2(){
    let currentDropdownCurrency1 = DropdownCurrency1.value
    let currentDropdownCurrency2 = DropdownCurrency2.value
    let currentCurrency1Value = Currency1.value
    let newVal = 0
    newVal = Number(currentCurrency1Value/window.conversionRates[currentDropdownCurrency1] * (window.conversionRates[currentDropdownCurrency2])).toFixed(2)
    Currency2.value = newVal  
}

DropdownCurrency1.addEventListener("change", ()=>{
    console.log(DropdownCurrency1.value)
    convertCurrency2()
})

DropdownCurrency2.addEventListener("change", ()=>{
    console.log(DropdownCurrency2.value)
    convertCurrency()
})

// NEW: swap button — flips the two selected currencies and re-runs the
// existing conversion so "you have" / "you get" trade places. It only
// reuses convertCurrency()/convertCurrency2() above; no conversion math
// was changed.
SwapButton.addEventListener("click", ()=>{
    let tempCurrency = DropdownCurrency1.value
    DropdownCurrency1.value = DropdownCurrency2.value
    DropdownCurrency2.value = tempCurrency

    // brief spin animation on the coin icon
    SwapButton.classList.add("spin")
    setTimeout(()=> SwapButton.classList.remove("spin"), 350)

    if (Currency1.value){
        convertCurrency()
    }
})