(function(){
    var pasteText = document.getElementById('pasteText');
    var display = document.getElementById('display');
    var processButton = document.getElementById('processButton');

    processButton.addEventListener('click',calcDisplay);

    function calcDisplay(){
        var text = pasteText.value;
        var length = text.length;

        var output = '';
        var i = 0;
        for(;i < length; ++i){
            var char = text.charAt(i);
            var code = text.codePointAt(i);

            //normal ASCII range
            if( code >= 0x0020  && code < 0x007F){
                 output+= char;

            //bad item
            }else if (blacklist.hasOwnProperty(char)){
                output+= '<span style="color:red;background-color:aliceblue">'+blacklist[char]+'</span>';
            //warning, unknown unicode
            }else{
                output+= '<span style="color:orange;background-color:aliceblue">'+code.toString(16)+'</span>';
            }
            display.innerHTML = output;
        }

    }

})();