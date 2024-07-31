
// DOM: Selected and Created Elements

const myHeader = document.getElementById('myHeader')

const h3TopFive = document.createElement('h3')
h3TopFive.textContent = "Your favorite Crypto"
h3TopFive.id = 'fav-title'

const divElement = document.querySelector('div')
divElement.id = 'top-five'
myHeader.appendChild(h3TopFive)

const cryptoSelectionMenu = document.getElementById('crypto')

const currencySelectionMenu = document.getElementById('currency')

console.log(cryptoSelectionMenu.selectedOptions.textContent);  

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

const favoriteListContainer = document.getElementById('favorites')

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
        // console.log(ele);
    
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

currencySelectionMenu.addEventListener('change', event => {
    currencyValue.textContent = `Current exchange rate to USD: ${currencySelectionMenu.value}`
    newInput.value = currencySelectionMenu.selectedOptions[0].text;
    
})


cryptoSelectionMenu.addEventListener('change', event => {
    cryptoUSDCost.textContent = `Crypto value in USD is: ${cryptoSelectionMenu.value}`
    inputForm.value = cryptoSelectionMenu.selectedOptions[0].text;
// **********
    
})

calculateButton.addEventListener('click', event =>{
    console.log(currencySelectionMenu.value)
    console.log(cryptoSelectionMenu.value)
    rawValue = Number(currencySelectionMenu.value) * Number(cryptoSelectionMenu.value)
    let calculatedCryptoValue = Math.round((rawValue + Number.EPSILON) * 100)/100
    console.log(currencySelectionMenu.selectedOptions[0].text)
    calculatedValue.textContent = `Calculated value in selected currency is ${new Intl.NumberFormat().format(calculatedCryptoValue)}`

    console.log(calculatedCryptoValue);
})

// console.log(new Intl.NumberFormat('en-US', {style:'currency', currency:'EUR'}).format(63000.99))

// const liList = document.getElementsByClassName('li-hover')
// console.log(liList);
// const array = [...liList]
// console.log(array);
// array.forEach(ele => {
// console.log(ele)
// })






// FAVORITE LIST =====================================================
// const h3List = document.querySelector('#favorites')

const h3CoinName = document.createElement('h3')
h3CoinName.textContent = 'Coin Name:'

const h5Currency = document.createElement('h5')
h5Currency.textContent = 'Currency:'

const h5Price = document.createElement('h5')
h5Price.textContent = 'Price:'

const h5Date = document.createElement('h5')
h5Date.textContent = 'Date'

// const updateBtn = document.createElement('button')
// updateBtn.textContent = 'Update'
// const deleteBtn = document.createElement('button')
// deleteBtn.textContent = 'Refresh'


// h3List.append(h3CoinName)
// h3List.append(h5Currency)
// h3List.append(h5Price)
// h3List.append(h5Date)
// h3List.append(updateBtn)
// h3List.append(deleteBtn)






// Favorites
// =====================================================================
const favoriteListForm = document.createElement('form')
favoriteListForm.className = "cryptoForm"
const labelForm = document.createElement('label')
labelForm.textContent = 'Coin-Name: '
const inputForm = document.createElement('input')
inputForm.id = 'coinName'
inputForm.value = cryptoSelectionMenu.value
inputForm.type = 'text'
newInput = document.createElement('input')
newInput.id = "currency"
newLabel = document.createElement('label')
newLabel.textContent = 'Currency: '

const submitInput = document.createElement('input')
submitInput.id = 'submitBtn'
submitInput.type = 'submit'
submitInput.value = 'Submit'


submitInput.addEventListener('mouseover', (event) => {
    submitInput.style.backgroundColor = 'firebrick'
    submitInput.style.color = 'white'

});
submitInput.addEventListener('mouseleave', () => {
    submitInput.style.backgroundColor = ''
    submitInput.style.color = 'black'
})

favoriteListForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const favCoinName = cryptoSelectionMenu.selectedOptions[0].text;
    h3CoinName.textContent = favCoinName

    const favCurrency = currencySelectionMenu.selectedOptions[0].text;
    h5Currency.textContent = favCurrency;

    const favPrice = calculatedValue.textContent;
    h5Price.textContent =  favPrice;

    const favDate = new Date();
    favDate.setDate(favDate.getDate());
    h5Date.textContent = favDate;
    addFavoriteCoinAndCurrencyToDb(favCoinName,favCurrency)

});

function favoriteItemCreator(item, list){
    const favoriteDivContainer = document.createElement('div')
    const favoritedCoinElement = document.createElement('p')
    const favoritedCurrencyElement = document.createElement('p')
    const updateBtn = document.createElement('button')
    updateBtn.textContent = 'Update'
    favoriteDivContainer.className = 'favoriteItem'
    favoriteDivContainer.id = item.id
    favoritedCoinElement.textContent = `Coin: ${item.coin}`
    favoritedCurrencyElement.textContent = `Currency: ${item.currency}`
    favoriteDivContainer.appendChild(favoritedCoinElement)
    favoriteDivContainer.appendChild(favoritedCurrencyElement)
    favoriteDivContainer.appendChild(updateBtn)

    list.appendChild(favoriteDivContainer)
    const removalButton = document.createElement('button')
    removalButton.textContent = 'Remove'

    removalButton.addEventListener('click', event => {
        const nodeId = removalButton.parentElement.id
        fetch('http://localhost:3001/favorites/' + nodeId, {
            method: 'Delete'
        })
        .then(response => {
            if(response.ok){
                const removedNode = document.getElementById(nodeId)
                removedNode.remove()
            }
        })
    })
    favoriteDivContainer.appendChild(removalButton)
    console.log(favoriteDivContainer)
}


function displayFavorites(){
    fetch("http://localhost:3001/favorites")
    .then(response => response.json())
    .then(data =>{
        data.forEach(favorite=>{
            favoriteItemCreator(favorite, favoriteListContainer)

        })
    })
}


function addFavoriteCoinAndCurrencyToDb(coinSymbol, currencySymbol){
    fetch("http://localhost:3001/favorites",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({coin:coinSymbol, currency:currencySymbol})
    })
    .then( response =>{
            if(response.ok){
                response.json().then(data =>{
                    favoriteItemCreator(data, favoriteListContainer)
                })
            }
        }
    
    )
}

displayFavorites()

const btnForm = document.createElement('button')
calculatedSection.appendChild(favoriteListForm)
favoriteListForm.appendChild(labelForm)
labelForm.appendChild(inputForm)
favoriteListForm.appendChild(newLabel)
newLabel.appendChild(newInput)
favoriteListForm.appendChild(submitInput)
