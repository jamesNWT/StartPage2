var commandLine = document.getElementById('command-line');

function searchUnfocus()
{
    commandLine.setAttribute("placeholder", "search");
}

function searchFocus()
{
    commandLine.setAttribute("placeholder", "");
}

