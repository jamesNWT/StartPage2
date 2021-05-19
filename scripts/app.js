const database = firebase.firestore();

const shortcuts = document.querySelector('#shortcuts-section')

var categories = []

function rendershortcut(doc) {

    category = doc.data().category

    if (!categories.includes(category)){
        categories.push(category)
    }

    let div = document.createElement('div')

    div.setAttribute('id', category)
    div.textContent = category
    
    let li = document.createElement('li')
    let link = document.createElement('a')
    
    
    link.setAttribute('href', doc.data().url)
    link.textContent = doc.data().name

    li.appendChild(link)
    div.appendChild(li)

    shortcuts.appendChild(div)
}

database.collection('shortcuts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(rendershortcut(doc))
    })
    console.log(categories)
})