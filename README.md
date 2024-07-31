# Crypto Project

# Introduction

Welcome to my crypto project.
This project will perform the following
1. List the current top 5 crypto currencies at the top of the page
2. Provide a list of 100 crypto currencies and allows the user to conver the price from the quoted price in USD to one of 100 local currencies from around the world. 
3. Allow the user to save their favorite crypto + currrency pair.
4. Allow the user to update the prices for the crypto + currency pair stored in the favorites list

# Setup



API Endpoints

1. Crypto Coin List: https://api.coincap.io/v2/assets/
2. Favorites stored Locally: http://localhost:3001/favorites/
3. FX Currency Local copy: http://localhost:3002/rates


To connect the local databases:
```
json-server db.json --watch -p 3001
json-server USD.json --watch -p 3002
```


10 fetch requests defined:
```
35:fetch('https://api.coincap.io/v2/assets')
80:fetch('https://api.coincap.io/v2/assets')
99:    fetch('https://api.coincap.io/v2/assets/' + cryptoId)
118:fetch("http://localhost:3002/rates")
230:    fetch('https://api.coincap.io/v2/assets/' + favoriteListItem.coin)
233:        fetch('http://localhost:3002/rates')
270:        fetch('http://localhost:3001/favorites/'+nodeId)
281:        fetch('http://localhost:3001/favorites/' + nodeId, {
296:    fetch("http://localhost:3001/favorites")
308:    fetch("http://localhost:3001/favorites",{
```
10 Event listeners defined:
```
66:    ele.addEventListener('mouseover', (event) => {
70:    ele.addEventListener('mouseleave', () => {
110:cryptoSelectionMenu.addEventListener('change', event => {
138:currencySelectionMenu.addEventListener('change', event => {
152:calculateButton.addEventListener('click', event =>{
199:submitInput.addEventListener('mouseover', (event) => {
204:submitInput.addEventListener('mouseleave', () => {
209:favoriteListForm.addEventListener('submit', (event) => {
266:    updateBtn.addEventListener('click', event =>{
279:    removalButton.addEventListener('click', event => {
```

Array iterators:

forEach: 
```
    42:    topFiveFiltered.forEach(cryptoCoin => {
    63:    array.forEach(ele => {
    85:    allCrypto.forEach(cryptos => {
    123:    worldCurrencyList.forEach(worldCurrency => {
    299:        data.forEach(favorite=>{
```

