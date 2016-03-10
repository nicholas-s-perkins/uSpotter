(function(){
    var pasteText = document.getElementById('pasteText');
    var display = document.getElementById('display');
    var processButton = document.getElementById('processButton');
    var infoPopup = document.getElementById('infoPopup');
    var infoFrame = document.getElementById('infoFrame');
    var loadingScreen = document.getElementById('loadingScreen');
    var removeNonAsciiButton = document.getElementById('removeNonAsciiButton');
    var infoCheck = document.getElementById('infoCheck');
    var rawButton = document.getElementById('rawButton');

    processButton.addEventListener('click',calcDisplay);
    removeNonAsciiButton.addEventListener('click',removeNonAscii);
    rawButton.addEventListener('click',showRawText);


    window.addEventListener('mousemove',function(event){
        if(infoPopup.style.display === 'none'){return;}
        //from top + scroll
        var pageX = event.pageX;
        var pageY = event.pageY;

        //from window
        var clientX = event.clientX;
        var clientY = event.clientY;

        var pWidth = infoPopup.offsetWidth;
        var pHeight = infoPopup.offsetHeight;


        if(clientY > window.innerHeight/2){
            infoPopup.style.top = (pageY-pHeight-10) + 'px';
        }else{
            infoPopup.style.top = 10+pageY + 'px';
        }

        if(clientX > window.innerWidth/2){
            infoPopup.style.left = (pageX-pWidth) + 'px';

        }else{
            infoPopup.style.left = pageX + 'px';
        }



    },false);

    pasteText.value = DATA;
    processButton.click();


    function showRawText(){
        display.style.display = 'none';
        pasteText.style.display = 'block';
    }
    function hideRawText(){
        display.style.display = 'none';
        pasteText.style.display = 'block';
    }

    function removeNonAscii(){
        var text = pasteText.value;
        var output = '';
        forEach(text,function(char,i){
            var code = char.codePointAt(0);
            if( (code >= 0x0020  && code < 0x007F) || whitelist.hasOwnProperty(char)) {
                output += char;
            }
        });
        pasteText.value = output;
        processButton.click();
    }


    function calcDisplay(){
        display.style.display = 'block';
        pasteText.style.display = 'none';
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
                output+= '<span class="blacklist" data-index="'+i+'" data-code="'+code+'">'+blacklist[char]+'</span>';
            //warning, unknown unicode
            }else{
                output+= '<span class="warning" data-index="'+i+'" data-code="'+code+'">'+char+'</span>';
            }

        }
        display.innerHTML = output;

        //blacklist handlers
        var notables = document.querySelectorAll('.blacklist, .warning');
        var k = 0;
        for(; k < notables.length; ++k){
            notables[k].addEventListener('click',removeMe,false);
            notables[k].addEventListener('mouseenter',displayInfo,false);
            notables[k].addEventListener('mouseleave',hideInfo,false);
        }

    }


    function removeMe(event){
        var text = pasteText.value;
        var index = parseInt(this.dataset.index);

        pasteText.value = text.substring(0,index) + text.substring(index+1);
        hideInfo();
        processButton.click();

    }

    function toHex16String(num){
        var str = Number(num).toString(16).toUpperCase();
        var diff = 4 - str.length;
        return 'U+'+Array(diff).join('0') + str;
    }


    function displayInfo(event){
        if(!infoCheck.checked){return false;}
        var code = parseInt(this.dataset.code).toString(16);
        var url = 'https://www.fileformat.info/info/unicode/char/'+code+'/index.htm';
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



    function forEach(iterable,func){
        var _index = 0;
        var length = iterable.length;
        for(;_index < length; ++_index){
            func(iterable[_index],_index);
        }
    }

})();