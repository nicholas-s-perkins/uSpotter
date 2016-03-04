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

    toggleProcessButton();
    removeNonAsciiButton.addEventListener('click',removeNonAscii);


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

        var coords = pickBestCoordinateForPopup(pWidth,pHeight,window.innerWidth,window.innerHeight,clientX,clientY);

        infoPopup.style.left = coords.x + 'px';
        infoPopup.style.top = coords.y + 'px';

        //if(clientY > window.innerHeight/2){
        //    infoPopup.style.top = (pageY-pHeight-10) + 'px';
        //}else{
        //    infoPopup.style.top = 10+pageY + 'px';
        //}
        //
        //if(clientX > window.innerWidth/2){
        //    infoPopup.style.left = (pageX-pWidth) + 'px';
        //
        //}else{
        //    infoPopup.style.left = pageX + 'px';
        //}





    },false);

    pasteText.value = DATA;
    processButton.click();

    function toggleProcessButton(){
        if(processButton.textContent === 'Display Raw'){
            processButton.textContent = 'Display Formatted';
            processButton.removeEventListener('click',showRawText);
            processButton.addEventListener('click',showFormattedText);
        }else{
            processButton.textContent = 'Display Raw';
            processButton.removeEventListener('click',showFormattedText);
            processButton.addEventListener('click',showRawText);
        }
    }

    function showRawText(){
        display.style.display = 'none';
        pasteText.style.display = 'block';
        toggleProcessButton();
    }

    function showFormattedText(){
        display.style.display = 'block';
        pasteText.style.display = 'none';
        calcDisplay();
        toggleProcessButton();
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
        calcDisplay();
    }





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
                output+= '<span class="blacklist notable" data-index="'+i+'" data-code="'+code+'">'+blacklist[char]+'</span>';
            //warning, unknown unicode
            }else{
                output+= '<span class="warning notable" data-index="'+i+'" data-code="'+code+'">'+char+'</span>';
            }

        }
        display.innerHTML = output;

        //blacklist handlers
        var notables = document.querySelectorAll('.notable');
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
        calcDisplay();

    }

    function displayInfo(event){
        if(!infoCheck.checked){return false;}
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



    function forEach(iterable,func){
        var _index = 0;
        var length = iterable.length;
        for(;_index < length; ++_index){
            func(iterable[_index],_index);
        }
    }


    function pickBestCoordinateForPopup(pWidth,pHeight,winWidth,winHeight,x,y){
        var cursorMargin = 10;
        var topSpace   = new RectSpace('top',0,0,winWidth,y-cursorMargin);
        var rightSpace = new RectSpace('right',x+cursorMargin,0,winWidth-(x+cursorMargin),winHeight);
        var btmSpace   = new RectSpace('btm',0,y+cursorMargin,winWidth,winHeight-(y+cursorMargin));
        var leftSpace  = new RectSpace('left',0,0,x-cursorMargin,winHeight);
        var popupSpace = new RectSpace('popup',null,null,pWidth,pHeight);

        var allSpaces = [topSpace,rightSpace,btmSpace,leftSpace];

        var mostSimilar = popupSpace.findMostSimilarFit(allSpaces);
        var chosenSpace = null;



        //see if most similar fits
        if(mostSimilar.width > popupSpace.width && mostSimilar.height > popupSpace.height){
            chosenSpace = mostSimilar;

            //center popup with chosenspace and return coords
            var cX = chosenSpace.width/2 + chosenSpace.x;
            var cY = chosenSpace.height/2 + chosenSpace.y;

            var centeredX = cX - popupSpace.width/2;
            var centeredY = cY - popupSpace.height/2;

            return {x:centeredX,y:centeredY};

        //none fit, pick next best by volume/distance ratio
        //do not center
        }else{
            chosenSpace = popupSpace.findClosestByRatio(allSpaces);
            //center to mouse
            var spacePoint = {x:0,y:0};
            var popCorner = {x:0,y:0};

            switch(chosenSpace.name){
                case 'top':
                    spacePoint.x = chosenSpace.x+chosenSpace.width/2;
                    spacePoint.y = chosenSpace.y+chosenSpace.height;

                    popCorner.x = spacePoint.x-popupSpace.width/2;
                    popCorner.y = spacePoint.y-popupSpace.height;
                    return popCorner;
                case 'right':
                    spacePoint.x = chosenSpace.x;
                    spacePoint.y = chosenSpace.y+chosenSpace.height/2;

                    popCorner.x = spacePoint.x;
                    popCorner.y = spacePoint.y-popupSpace.height/2;
                    return popCorner;
                case 'bottom':
                    spacePoint.x = chosenSpace.x+chosenSpace.width/2;
                    spacePoint.y = chosenSpace.y;

                    popCorner.x = spacePoint.x-popupSpace.width/2;
                    popCorner.y = spacePoint.y;
                    return popCorner;
                case 'left':
                    spacePoint.x = chosenSpace.x+chosenSpace.width;
                    spacePoint.y = chosenSpace.y + chosenSpace.height/2;

                    popCorner.x = spacePoint.x-popupSpace.width;
                    popCorner.y = spacePoint.y-popupSpace.height/2;

                    return popCorner;
            }

        }

    }


    function RectSpace(name,x,y,width,height){
        this.name = name;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.volume = width*height;
    }
    RectSpace.max = function(/* rectSpaces...*/){
        var max = arguments[0];
        for(var i = 1; i < arguments.length; ++i){
            var arg = arguments[i];
            if(arg.volume > max.volume){
                max = arg;
            }
        }

        return max;
    };

    RectSpace.prototype = {
        getSimilarityDistance:function(rectSpace){
            return Math.sqrt(
                Math.pow(rectSpace.width-this.width,2) + Math.pow(rectSpace.height-this.height,2)
            );
        },
        findMostSimilarFit:function(listOfRects){
            var minRect = listOfRects[0];
            var minDist = this.getSimilarityDistance(listOfRects[0]);

            var i = 1;
            for(; i < listOfRects.length; ++i){
                var arg = listOfRects[i];
                var nextDist = this.getSimilarityDistance(arg);
                if(nextDist < minDist && this.width < arg.width && this.height < arg.height){
                    minRect = arg;
                    minDist = nextDist;
                }
            }
            return minRect;
        },
        findClosestByRatio:function(rects){
            //volume / distance
            var bestRect = rects[0];
            var bestRatio = bestRect.volume/this.getSimilarityDistance(bestRect);

            var i = 0;
            for(; i < rects.length; ++i){
                var arg = rects[i];
                var nextRatio = arg.volume/this.getSimilarityDistance(arg);
                //the best is the largest ratio, greatest volume with smallest difference
                if(nextRatio > bestRatio){
                    bestRatio = nextRatio;
                    bestRect = arg;
                }
            }

            return bestRect;
        }



    };



})();