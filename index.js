
// some testing line
const span = document.createElement('span')
const topFiveList = document.querySelector('#top-five')

fetch('https://api.coincap.io/v2/assets')
.then(res => res.json())
.then(crypto => {
    const topFiveCrypto = crypto.data.filter(cryptocurrency => {
        return (Number(cryptocurrency.rank) <= 5) 
    })
    // const spanElement = document.createElement('span')
    topFiveCrypto.forEach(crypto => {
        const spanElement = document.createElement('span')

        console.log(crypto.name);
        const newDiv = document.createElement('div')
        newDiv.className = "borders"
        spanElement.appendChild(newDiv)
        

        const newParagraph = document.createElement('p')
        newParagraph.textContent = crypto.name
        spanElement.appendChild(newParagraph)
        topFiveList.appendChild(spanElement)
    }) 
})