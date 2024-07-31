
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
// Heading and top 5

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
        cryptoList.style.color = 'white'
        const link = document.createElement('a');
        link.href = `${cryptoCoin.explorer}`
        link.target = '_blank'
        link.textContent = `${cryptoCoin.name} - (${cryptoCoin.symbol})`
        // cryptoList.textContent = `${cryptoCoin.name} - (${cryptoCoin.symbol})`

        cryptoContainer.appendChild(cryptoList)
        cryptoList.appendChild(link)

        
        

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
    const selectCrypto = document.getElementById('crypto')
    allCrypto.forEach(cryptos => {
        const optionCryptoCoin = document.createElement('option')
        optionCryptoCoin.value = cryptos.priceUsd
        optionCryptoCoin.textContent = cryptos.id 
        selectCrypto.append(optionCryptoCoin);
      
    })
    cryptoUSDCost.textContent = cryptoValueText(cryptoSelectionMenu.value)
    inputForm.value = cryptoSelectionMenu.selectedOptions[0].text;
    cryptoData = getCryptoPriceAndTime(selectCrypto.selectedOptions[0].text)
})


function getCryptoPriceAndTime(cryptoId){
    fetch('https://api.coincap.io/v2/assets/' + cryptoId)
    .then(response => response.json())
    .then(data =>{
        return data
    })
}

function cryptoValueText(cryptoValue){
    return `Crypto value in USD is: ${cryptoValue}`
}

cryptoSelectionMenu.addEventListener('change', event => {
    cryptoUSDCost.textContent = cryptoValueText(cryptoSelectionMenu.value)
    inputForm.value = cryptoSelectionMenu.selectedOptions[0].text;
    
})

// CURRENCY tab =====================================================

fetch("http://localhost:3002/rates")
.then(response => response.json())
.then(data => {
    worldCurrencyList = Object.keys(data)
    const currencyOptionList = document.getElementById("currency")
    worldCurrencyList.forEach(worldCurrency => {
        const currencyOption = document.createElement("option")     
        currencyOption.value = data[worldCurrency];
        currencyOption.textContent = worldCurrency;
        currencyOptionList.appendChild(currencyOption)

    })
    currencyValue.textContent = currencyValueText(currencySelectionMenu.value)
    newInput.value = currencySelectionMenu.selectedOptions[0].text;
})

function currencyValueText(currencyValue){
    return `Current exchange rate to USD: ${currencyValue}`
}

currencySelectionMenu.addEventListener('change', event => {
    currencyValue.textContent = currencyValueText(currencySelectionMenu.value)
    newInput.value = currencySelectionMenu.selectedOptions[0].text;
})



function calculateCryptoValueInACurrency(cryptoValue,currencyFxRate){
    let rawValue = Number(cryptoValue) * Number(currencyFxRate)
    let calculateCryptoValue = Math.round((rawValue + Number.EPSILON) * 100)/100
    return new Intl.NumberFormat().format(calculateCryptoValue)
}


calculateButton.addEventListener('click', event =>{
    console.log(currencySelectionMenu.value)
    console.log(cryptoSelectionMenu.value)
    let myCryptoValue = calculateCryptoValueInACurrency(cryptoSelectionMenu.value, currencySelectionMenu.value) 
    calculatedValue.textContent = `Calculated value in selected currency is ${myCryptoValue}`
})


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
submitInput.value = 'Add To Favorites'
submitInput.style.backgroundColor = 'grey'
submitInput.style.color = 'white'


submitInput.addEventListener('mouseover', (event) => {
    submitInput.style.backgroundColor = 'firebrick'
    submitInput.style.color = 'white'

});
submitInput.addEventListener('mouseleave', () => {
    submitInput.style.backgroundColor = 'grey'
    submitInput.style.color = 'white'
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


function updateCoin(favoriteListItem, valueElement, lastUpdatedElement){
    fetch('https://api.coincap.io/v2/assets/' + favoriteListItem.coin)
    .then(response => response.json())
    .then(cryptoData => {
        fetch('http://localhost:3002/rates')
        .then(response => response.json())
        .then(fxData => {
            fxRate = fxData[favoriteListItem.currency]
            console.log(fxRate)
            cryptoCost = calculateCryptoValueInACurrency(cryptoData.data.priceUsd, fxRate)
            valueElement.textContent = `Price in ${favoriteListItem.currency}: ${cryptoCost}`
            lastUpdatedElement.textContent = `Last updated: ${new Date(cryptoData.timestamp).toString()}`
        })
    })
}

function favoriteItemCreator(item, list){
    const favoriteDivContainer = document.createElement('div')
    const favoritedCoinElement = document.createElement('p')
    const favoritedCurrencyElement = document.createElement('p')
    const favoritedCurrentValue = document.createElement('p')
    favoritedCurrentValue.id = `${item.id}-currentValue`
    const favoritedLastUpdated = document.createElement('p')
    favoritedLastUpdated.id = `${item.id}-lastUpdate`
    const updateBtn = document.createElement('button')
    updateBtn.textContent = 'Update'
    favoriteDivContainer.className = 'favoriteItem'
    favoriteDivContainer.id = item.id
    favoritedCoinElement.textContent = `Coin: ${item.coin}`
    favoritedCurrencyElement.textContent = `Currency: ${item.currency}`
    favoriteDivContainer.appendChild(favoritedCoinElement)
    favoriteDivContainer.appendChild(favoritedCurrencyElement)
    favoriteDivContainer.appendChild(favoritedCurrentValue)
    favoriteDivContainer.appendChild(favoritedLastUpdated)
    favoriteDivContainer.appendChild(updateBtn)
    const myItem = {coin: item.coin, currency: item.currency}
    updateCoin(myItem, favoritedCurrentValue, favoritedLastUpdated)
    updateBtn.addEventListener('click', event =>{
        const nodeId = updateBtn.parentElement.id
        const thisCurrentValue = document.getElementById(`${nodeId}-currentValue`)
        const thisLastUpdate = document.getElementById(`${nodeId}-lastUpdate`)
        fetch('http://localhost:3001/favorites/'+nodeId)
        .then(response => response.json())
        .then(data => updateCoin(data, thisCurrentValue, thisLastUpdate ))
})

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
