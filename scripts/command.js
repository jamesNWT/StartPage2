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
        case "-c":
            input = input.substr(3);
            shortCut(input);

        default:
            temp = input.replaceChars("+", "%2B");
            temp2 = temp.replaceChars("", "%20");
            input = temp2.replaceChars("#", "%23");
            window.location="https://www.google.ca/search?q=" + input;
    }
}

function shortCut(input){

}
window.onload = function(){
    // search
    commandInput = document.getElementById("searchbox");
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