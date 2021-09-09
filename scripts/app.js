const database = firebase.firestore();
const auth = firebase.auth();

const links = document.querySelector('#links')

var categories = []

function rendershortcut(doc) {

    let linkDiv = document.createElement('div')
    let link = document.createElement('a')
    
    linkDiv.setAttribute('class', "link-div")
    linkDiv.setAttribute('id', doc.id)
    link.setAttribute('href', doc.data().url)
    link.textContent = doc.data().name

    linkDiv.appendChild(link)

    category = doc.data().category
    
    let div
    let titleDiv
    if (!categories.includes(category)){
        categories.push(category)
        
        div = document.createElement('div')
        titleDiv = document.createElement('div')

        div.setAttribute('class', 'category')
        div.setAttribute('id', category)
        

        titleDiv.setAttribute('class', 'title-div')
        titleDiv.setAttribute('id', 'title-'+category)
        titleDiv.textContent = category
    } else {
        div = document.querySelector('#'+category)
        titleDiv = document.querySelector('#title-'+category)
    }

    div.appendChild(titleDiv)
    div.appendChild(linkDiv)

    links.appendChild(div)
}
function renderAllShortcuts() {
    database.collection('shortcuts').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
        rendershortcut(doc)
    })
        console.log(categories)
    })
}

renderAllShortcuts()