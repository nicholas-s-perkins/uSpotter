# uSpotter
uSpotter is a basic web app that can display and remove unusual characters in UTF-16 encoding (what's native to the browser).

## Demo page
http://nicholas-s-perkins.github.io/uSpotter/web/

## Features
* Renders typical whitespace (tab, newline) as visible characters
* Highlights and labels hard to find unicode/ascii whitespace or other suspicious characters (such as DEL) in red
* Highlights other non-ascii characters in blue
* Any labeled character can be deleted by clicking on it
* A popup shows info about the labeled character on hover (via fileformat.com)
