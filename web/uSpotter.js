(function(){
    var pasteText = document.getElementById('pasteText');
    var display = document.getElementById('display');
    var processButton = document.getElementById('processButton');
    var infoPopup = document.getElementById('infoPopup');
    var infoFrame = document.getElementById('infoFrame');
    var loadingScreen = document.getElementById('loadingScreen');

    //pasteText.value = TEST_DATA;
    processButton.addEventListener('click',calcDisplay);


    window.addEventListener('mousemove',function(event){
        infoPopup.style.left = event.pageX + 'px';
        infoPopup.style.top = 10+event.pageY + 'px';

    },false);



    function calcDisplay(){
        var text = pasteText.value;
        var length = text.length;

        var output = '';
        var i = 0;
        for(;i < length; ++i){
            var char = text.charAt(i);
            var charLookAhead = text.charAt(i+1);
            var code = text.codePointAt(i);
            var codeLookAhead = text.codePointAt(i+1);

            //normal visible ASCII range
            if( code >= 0x0020  && code < 0x007F) {
                output += char;

                //whitelist item
            }else if(whitelist.hasOwnProperty(char)){
                output+= '<span class="whitelist">'+whitelist[char]+'</span>';

                //look ahead if \r to see if it's \r\n
                if(code === 0x000D && codeLookAhead === 0x000A){
                    ++i;   //skip ahead
                    output+= '<span class="whitelist">\\r\\n</span>';
                }

                if(code === 0x000A || code === 0x000D){
                    output+='<br />';
                }


            }else if (blacklist.hasOwnProperty(char)){
                output+= '<span class="blacklist" data-index="'+i+'">'+blacklist[char]+'</span>';
            //warning, unknown unicode
            }else{
                output+= '<span class="warning" data-index="'+i+'" data-code="'+code+'">'+toHex16String(code)+'</span>';
            }

        }
        display.innerHTML = output;

        //blacklist handlers
        var blacks = document.querySelectorAll('.blacklist');
        var k = 0;
        for(; k < blacks.length; ++k){
            blacks[k].addEventListener('click',removeMe,false);
        }

        var warnings = document.querySelectorAll('.warning');
        k=0;
        for(; k < warnings.length; ++k){
            warnings[k].addEventListener('mouseenter',displayInfo,false);
            warnings[k].addEventListener('mouseleave',hideInfo,false);
        }
    }


    function removeMe(event){
        var text = pasteText.value;
        var index = parseInt(this.dataset.index);

        pasteText.value = text.substring(0,index) + text.substring(index+1);
        this.remove();
    }

    function toHex16String(num){
        var str = Number(num).toString(16);
        var diff = 4 - str.length;
        return '\\u'+Array(diff).join('0') + str;
    }


    function displayInfo(event){
        var code = parseInt(this.dataset.code).toString(16);
        var url = 'http://www.fileformat.info/info/unicode/char/'+code+'/index.htm';
        if(infoFrame.src !== url){
            loadingScreen.style.opacity = '1';
            infoFrame.onload = function(){
                loadingScreen.style.opacity = '0';
            };
            infoFrame.src = url;
            infoFrame.scrollTop = 100;
        }
        infoPopup.style.display="inline-block";
    }
    function hideInfo(event){
        infoPopup.style.display="none";
    }

})();