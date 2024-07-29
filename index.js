
// DOM: Selected and Created Elements

const myHeader = document.getElementById('myHeader')

const h3TopFive = document.createElement('h3')
h3TopFive.textContent = "Your favorite Crypto"
h3TopFive.id = 'fav-title'

const divElement = document.querySelector('div')
divElement.id = 'top-five'
myHeader.appendChild(h3TopFive)

const cryptoSelectionMenu = document.getElementById('crypto')

const currencySelctionMenu = document.getElementById('currency')

const cryptoSection = document.getElementById('crypto-selection')
const currencySection = document.getElementById('currency-selection')
const calculatedSection = document.getElementById('crypto-valuation')
const calculateButton = document.getElementById('calculateCryptoValue')
const calculatedValue = document.createElement('p')
const currencyValue = document.createElement('p')
const cryptoUSDCost = document.createElement('p')
currencySection.appendChild(currencyValue)
cryptoSection.appendChild(cryptoUSDCost)
calculatedSection.appendChild(calculatedValue)



// Your favorite Crypto =====================================================

fetch('https://api.coincap.io/v2/assets')
.then(respond => respond.json())
.then(cryptoData => {
    const topFiveFiltered = cryptoData.data.filter(cryptoCoin => cryptoCoin.rank <=5)
    const divElement = document.querySelector('div')
    divElement.id = 'top-five' 

    topFiveFiltered.forEach(cryptoCoin => {
        const cryptoContainer = document.querySelector('ul')
        cryptoContainer.id = 'myList'
        const cryptoList = document.createElement('li');
        cryptoList.className = 'li-hover'
        cryptoList.textContent = `${cryptoCoin.name} - (${cryptoCoin.symbol})`
        cryptoContainer.appendChild(cryptoList)

        
        

    })
    const liList = document.getElementsByClassName('li-hover')
    const array = Array.from(liList)
    array.forEach(ele => {
        console.log(ele);
    
    ele.addEventListener('mouseover', (event) => {
        ele.style.backgroundColor = 'firebrick'

    });
    ele.addEventListener('mouseleave', () => {
        ele.style.backgroundColor = ''
    })
    })
    

})

// CRYPTO Tab =====================================================

fetch('https://api.coincap.io/v2/assets')
.then(res => res.json())
.then(cryptoData => {
    const allCrypto = cryptoData.data.filter(cryptoCoin => cryptoCoin)
    allCrypto.forEach(cryptos => {
        const selectCrypto = document.getElementById('crypto')
        const optionCryptoCoin = document.createElement('option')
        optionCryptoCoin.value = cryptos.priceUsd
        optionCryptoCoin.textContent = cryptos.name 
        selectCrypto.append(optionCryptoCoin);
      
    })
})

// CURRENCY tab =====================================================

fetch("http://localhost:3002/rates")
.then(response => response.json())
.then(data => {
    worldCurrencyList = Object.keys(data)
    worldCurrencyList.forEach(worldCurrency => {
        const currencyOption = document.createElement("option")
        const currencyOptionList = document.getElementById("currency")
        currencyOption.value = data[worldCurrency];
        currencyOption.textContent = worldCurrency;
        currencyOptionList.appendChild(currencyOption)

    })
})

currencySelctionMenu.addEventListener('change', event => {
    currencyValue.textContent = `Current exchange rate to USD: ${currencySelctionMenu.value}`
})

cryptoSelectionMenu.addEventListener('change', event => {
    cryptoUSDCost.textContent = `Crypto value in USD is: ${cryptoSelectionMenu.value}`
})

calculateButton.addEventListener('click', event =>{
    console.log(currencySelctionMenu.value)
    console.log(cryptoSelectionMenu.value)
    let calculatedCryptoValue = Number(currencySelctionMenu.value) * Number(cryptoSelectionMenu.value)
    calculatedValue.textContent = `Calculated value in selected currency is ${calculatedCryptoValue}`

})



// const liList = document.getElementsByClassName('li-hover')
// console.log(liList);
// const array = [...liList]
// console.log(array);
// array.forEach(ele => {
// console.log(ele)
// })






// FAVORITE LIST =====================================================

const h3List = document.querySelector('#favorites')

const h3CoinName = document.createElement('h3')
h3CoinName.textContent = 'Coin Name'

const h5Currency = document.createElement('h5')
h5Currency.textContent = 'Currency'

const h5Price = document.createElement('h5')
h5Price.textContent = 'Price'

const h5Date = document.createElement('h5')
h5Date.textContent = 'Date'

const updateBtn = document.createElement('button')
updateBtn.textContent = 'Update'
const deleteBtn = document.createElement('button')
deleteBtn.textContent = 'Refresh'


h3List.append(h3CoinName)
h3List.append(h5Currency)
h3List.append(h5Price)
h3List.append(h5Date)
h3List.append(updateBtn)
h3List.append(deleteBtn)

// =====================================================================
