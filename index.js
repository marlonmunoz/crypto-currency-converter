
// DOM: Selected and Created Elements

const myHeader = document.getElementById('myHeader')

const h3TopFive = document.createElement('h3')
h3TopFive.textContent = "Your favorite Crypto"
h3TopFive.id = 'fav-title'

const divElement = document.querySelector('div')
divElement.id = 'top-five'
myHeader.appendChild(h3TopFive)

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
        cryptoList.textContent = `${cryptoCoin.name} - (${cryptoCoin.symbol})`
        cryptoContainer.appendChild(cryptoList)
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
        currencyOption.value = worldCurrency;
        currencyOption.textContent = worldCurrency;
        currencyOptionList.appendChild(currencyOption)

    })
})

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
