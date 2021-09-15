String.prototype.replaceChars = function(character, replacement){
    var str = this;
    var a;
    var b;
    for(var i=0; i < str.length; i++){
        if(str.charAt(i) == character){
            a = str.substr(0, i) + replacement;
            b = str.substr(i + 1);
            str = a + b;
        }
    }
    return str;
}

function command(input){
    switch(input.substr(0, 2)){
        case "-d":
            input = input.substr(3);
            window.location = "https://duckduckgo.com/?q=" +
            input.replaceChars(" ", "+");
            break;

        case "-y":
            input = input.substr(3);
            window.location =
            "https://www.youtube.com/results?search_query=" +
            input.replaceChars(" ", "+");
            break;

        case "-l":
            input = input.substr(3);
            window.location =
            "https://www.google.ca/search?q=site:liquipedia.net " +
            input.replaceChars(" ", "%20");
            break;

        case "-w":
            input = input.substr(3);
            window.location =
            "https://en.wikipedia.org/wiki/Special:Search/" +
            input.replaceChars(" ", "%20");
            break;
        case "-a": // Add shortcut
            input = input.substr(3);
            addShortcut(input);
            document.getElementById('command-line').value = ''
            break;
        case "-r": // Remove shortcut
            input = input.substr(3);
            removeShortcut(input);
            document.getElementById('command-line').value = ''
            break;
        case "-s": // Goto shortcut
            input = input.substr(3);
            gotoShortcut(input);
            break;
        default:
            temp = input.replaceChars("+", "%2B");
            temp2 = temp.replaceChars("", "%20");
            temp3 = temp2.replaceChars("#", "%23");
            input = temp3.replaceChars("&", "%26");
            window.location="https://www.google.ca/search?q=" + input;
    }
}

async function gotoShortcut(input){

    let shortcut_url = ""
    var links = document.getElementsByClassName("link-div")
    var searchText = input;
    var found;

    for (var i = 0; i < links.length; i++) {
        if (links[i].textContent == searchText) {
            found = links[i];
            break;
        }
    }
    shortcut_url = found.firstElementChild.href

    if (shortcut_url == ""){
        window.alert("shortcut not found");
    } else {
        window.location = shortcut_url;
    }
}

function addShortcut(input){
    input = input.split(" ");
    var new_name = input[0];
    var new_url = input[1];
    var new_category = input[2];

    database.collection("shortcuts").add({
        name: new_name,
        url: new_url,
        category: new_category
    }).then((docRef) => {
        docRef.get().then((doc) => {
            rendershortcut(doc);
        })
    });
}

async function removeShortcut(input){
    
    var links = document.getElementsByClassName("link-div")
    var searchText = input;
    var found;

    for (var i = 0; i < links.length; i++) {
        if (links[i].textContent == searchText) {
            found = links[i];
            break;
        }
    }
    shortcut_id = found.id

    database.collection("shortcuts").doc(shortcut_id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    found.remove();
}

window.onload = function(){
    // search
    commandInput = document.getElementById("command-line");
    if(!!commandInput){
        commandInput.addEventListener("keypress", function(a){
            var key = a.keyCode;
            if(key == 13){
                var input = this.value;
                command(input);
            }
        });
    }
}

//TODO
function addQuote(input){

    database.collection("quotes").add({
        quote: input
    })

}