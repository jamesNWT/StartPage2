quotes()

async function quotes(){
    quotes = await getQuotes()
    
    var rand_index = Math.floor(Math.random()*quotes.length)
    
    renderQuote(quotes[rand_index])
}

function renderQuote(quote) {
    let div = document.createElement('div')
    
    div.setAttribute('id', "quote-div")

    div.textContent = quote

    var topBar = document.querySelector("#top-bar")

    topBar.appendChild(div)
}

async function getQuotes() {
    var quotes = []

    await database.collection('quotes').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            quotes.push(doc.data().quote)
        })
    })

    return quotes
}