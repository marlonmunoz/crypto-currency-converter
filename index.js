
// DOM: Selected and Created Elements
const myHeader = document.getElementById('myHeader')

const h3TopFive = document.createElement('h3')
h3TopFive.textContent = "Your favorite Crypto"

const divElement = document.querySelector('div')
divElement.id = 'top-five'
myHeader.appendChild(h3TopFive)

fetch('https://api.coincap.io/v2/assets')
.then(respond => respond.json())
.then(cryptoData => {
    const topFiveFiltered = cryptoData.data.filter(cryptoCoin => cryptoCoin.rank <= 5)
    const divElement = document.querySelector('div')
    divElement.id = 'top-five' 

    topFiveFiltered.forEach(cryptoCoin => {
        const cryptoContainer = document.querySelector('ul')
        const cryptoList = document.createElement('li');
        cryptoList.textContent = `${cryptoCoin.name} - (${cryptoCoin.symbol})`
        cryptoContainer.appendChild(cryptoList)


        const selectCrypto = document.querySelector('select')
        const optionCrypto = document.createElement('option')
        optionCrypto.value = 'only-five'
        optionCrypto.textContent = `${cryptoCoin.name}`

        const selectCrypto2 = document.querySelector('#coins')
        const optionCrypto2 = document.createElement('option')
        optionCrypto2.textContent = `$ ${cryptoCoin.priceUsd}`

        selectCrypto.appendChild(optionCrypto)
        selectCrypto2.appendChild(optionCrypto2)
    })
})

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
deleteBtn.textContent = 'Delete'


h3List.append(h3CoinName)
h3List.append(h5Currency)
h3List.append(h5Price)
h3List.append(h5Date)
h3List.append(updateBtn)
h3List.append(deleteBtn)

