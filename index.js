
// some testing line

const topFiveList = document.getElementById("top-five")

fetch("https://api.coincap.io/v2/assets")
.then(response => response.json())
.then(cryptoCurrencies => {
    cryptoList = cryptoCurrencies.data
    const topFive = cryptoList.filter(currency => {
        return Number(currency.rank) <= 5
    })
    console.log(topFive)
    topFive.forEach(currency =>{
        const spanElement = document.createElement('span')
        const divElement = document.createElement('div')
        const paragraphElement = document.createElement('p')

        divElement.className = "borders"
        paragraphElement.textContent = currency.name
        divElement.appendChild(paragraphElement)
        spanElement.appendChild(divElement)
        topFiveList.appendChild(spanElement)
        console.log(topFiveList)


    })
    // const topFiveCurrencies = cryptoCurrencies.filter(cryptoCurrency => {
    //     return Number(cryptoCurrencies) <=5
    // })
    // console.log(topFiveCurrencies)
})

const currencySelector = document.getElementById("currency-filter")
let exchangeRates = []
const rates = fetch("http://localhost:3000/rates")
.then(response => response.json())
.then(data => {
    let localCurrency = Object.keys(data)
    console.log(localCurrency)
    localCurrency.forEach(currency => {
        const rateOptions = document.createElement('option')
        console.log(currency)
        rateOptions.value = currency
        rateOptions.textContent = currency
        console.log(rateOptions)
        currencySelector.appendChild(rateOptions)
    })
})

console.log(rates)

console.log(exchangeRates)