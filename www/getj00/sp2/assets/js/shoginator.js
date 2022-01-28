/*
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |##
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+##
    |   |   |   | S | H | Ō | G | I | N | A | T | O | R |   |   |   |##
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+##
    |   |   |   |   | ｼ | ｮ | ｰ | ｷﾞ| ﾈ | ｰ | ﾀ | ｰ |   |   |   |   |##
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+##
    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |##
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+##
    | 6 | 3 | 7 | m | a | n |   |   |   |   |   |   | 2 | 0 | 2 | 2 |##
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+##
      #################################################################

Board generation code translated from PHP. Now the burden is on the client and it's arguably less secure.
This script declares shared funtions, therefore can be loaded async.
Scripts for individual variants are separate and since they actually modify the DOM, they must be loaded defer.

APIs:
https://kanjiapi.dev/ - EDICT
https://app.kanjialive.com/api/docs - 1235 kanji, custom radical font
https://docs.api.wanikani.com/20170710/ - 2000 kanji
*/

/**
    @licstart For GNUtards using LibreJS, so this page works.

    Copyright (C) 2021~2022 Johannes Getmann

    The JavaScript code in this page is free software: you can redistribute it 
    and/or modify it under the terms of the GNU General Public License (GNU GPL)
    as published by the Free Software Foundation, either version 2 of the 
    License, or (at your option) any later version. The code is distributed 
    WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU GPL for more details: 
    https://www.gnu.org/licenses/old-licenses/gpl-2.0.html

    @licend  
*/


// -*-*-*-   C O N S T A N T S   -*-*-*-
const WIDENUM = ["０","１","２","３","４","５","６","７","８","９"];
const HANNUM = ["〇","一","二","三","四","五","六","七","八","九","十","廿","卅","卌"]; // zero can also be 零
const WIDELETTER = ["Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ",
                    "ａ","ｂ","ｃ","ｄ","ｅ","ｆ","ｇ","ｈ","ｉ","ｊ","ｋ","ｌ","ｍ","ｎ","ｏ","ｐ","ｑ","ｒ","ｓ","ｔ","ｕ","ｖ","ｗ","ｘ","ｙ","ｚ"];
const BOARD = document.getElementById("board");
const KANJI = document.getElementById("kanji");
const CAPTURED = document.getElementById("captured");
var selectedPieceDiv = null; // global
//var capturedPieceDiv = null;

// -*-*-*-   B O A R D   G E N E R A T I O N   -*-*-*-
// Now using single quotes to not need to escape the double quotes.
/**
    Writes the board header, consisting of reversed upright number sequence 
    and 2 blank squares on the sides. The board origin is at upper right, 
    weirdly enough for Westerners, and complicating indexing slightly.
*/
export const writeBoardHeader = function(cols){
    
    let htmlOut = "<tr><th></th>";
    for(let col = cols; col >= 1; --col){
        let colTens = Math.floor(col/10);
        htmlOut += "<th>" + (colTens ? WIDENUM[colTens] : "") + WIDENUM[col%10] + "</th>";
    }
    htmlOut += "<th></th></tr>"; // must add whole <tr> at once or the browser will try to fix the DOM by closing it early
    BOARD.innerHTML += htmlOut; 
}

/**
    Writes a table line representing a board rank with supplied string array 
    (or just string depending on Unicode indexing support) and rotation 
    representing the pieces belonging to the opponent.
*/
export const writeBoardLine = function(row, pieces, rotate){
    const rowTens = Math.floor(row/10);
    let htmlOut = '<tr><th class="rotate">' + (rowTens ? WIDENUM[rowTens] : '') + WIDENUM[row%10] + '</th>';
    for(let i = 0; i < pieces.length; ++i){
        if(rotate && pieces[i] != '　'){ // encompass due to dragging: <td (dropzone)><div draggable id class></div></td>
            htmlOut += '<td><div class="rotate" ';
        }else{
            htmlOut += '<td><div class="notrot" ';
        }
        if(pieces[i] == '　'){
            htmlOut += 'draggable="false" ';
        }else{
            htmlOut += 'draggable="true" ';
        }
        htmlOut += 'id="r'+row+'c'+i+'">' + pieces[i] + '</div></td>'; 
    }
    htmlOut += '<th>' + (rowTens ? WIDENUM[rowTens] : '') + WIDENUM[row%10] + '</th></tr>';
    BOARD.innerHTML += htmlOut; // must add whole <tr> at once or the browser will try to fix the DOM by closing it early
}

/**
    Writes a table line representing a board rank containing the same piece 
    in all board files. Used for empty space between player pieces and pawn rows 
    in the initial game setup.
*/
export const writeBoardLineUniform = function(row, piece, columns, rotate){
    const rowTens = Math.floor(row/10);
    let htmlOut = '<tr><th class="rotate">' + (rowTens ? WIDENUM[rowTens] : '') + WIDENUM[row%10] + '</th>';
    for(let i = 1; i <= columns; ++i){
        if(rotate){
            htmlOut += '<td><div class="rotate" ';
        }else{
            htmlOut += '<td><div class="notrot" ';
        }
        if(piece == "　"){
            htmlOut += 'draggable="false" ';
        }else{
            htmlOut += 'draggable="true" ';
        }
        htmlOut += 'id="r'+row+'c'+i+'">' + piece + '</div></td>'; // this does not change when moving, quite confusing wrt move history
    }
    htmlOut += '<th>' + (rowTens ? WIDENUM[rowTens] : '') + WIDENUM[row%10] + '</th></tr>';
    BOARD.innerHTML += htmlOut; // must add whole <tr> at once or the browser will try to fix the DOM by closing it early
}

/**
    Writes a specific board cell with a specific piece in it in a specific 
    orientation. Mainly used for yonnin shogi. Not ready for drag and drop.
*/
export const writeBoardCell = function(piece, rotate){
    if(rotate === 90){
        BOARD.innerHTML += '<td><div class="rot90l">'+piece+'</div></td>';
    }else if(rotate === -90 || rotate === 270){
        BOARD.innerHTML += '<td><div class="rot90r">'+piece+'</div></td>';
    }else if(rotate === 180){
        BOARD.innerHTML += '<td><div class="rotate">'+piece+'</div></td>';
    }else{
        BOARD.innerHTML += '<td><div class="notrot">'+piece+'</div></td>';
    }
}

/**
    Writes the board footer, consisting of reversed rotated number sequence.
*/
export const writeBoardFooter = function(cols){
    let htmlOut = "<tr><th></th>";
    for(let col = cols; col >= 1; --col){
        let colTens = Math.floor(col/10);
        htmlOut += "<th class=\"rotate\">" + (colTens ? WIDENUM[colTens] : "") + WIDENUM[col%10] + "</th>";
    }
    htmlOut += "<th></th></tr>"; // must add whole <tr> at once or the browser will try to fix the DOM by closing it early
    BOARD.innerHTML += htmlOut; 
}


// -*-*-*-   A J A X   A N D   R E S T   -*-*-*-
/**
    Will fetch a JSON with information about a specific kanji from kanjiapi.dev.
    Example response:
    {
        "kanji":"言",
        "grade":2,
        "stroke_count":7,
        "meanings":["say","word"],
        "kun_readings":["い.う","こと"],
        "on_readings":["ゲン","ゴン"],
        "name_readings":["とき"],
        "jlpt":4,
        "unicode":"8a00",
        "heisig_en":"say"
    }
    Supposed card:
    +------------------------------------------------------------------------+  
    | 言 - say, word                                                         |
    | 7 strokes, grade 2, JLPT 4, U+8A00                                     |
    | On: ゲン, ゴン                                                         |
    | Kun: い.う, こと                                                       |
    | Mnemonic: say                                                          |
    | [Words and phrases] -> https://kanjiapi.dev/v1/words/%E8%A8%80         |
    +------------------------------------------------------------------------+
*/
const displayKanjiInfo = function(kanji){
    if (kanji.length == 0 || kanji == "　") {
        document.getElementById("kanji").innerHTML = "<h4>Není vybrán žádný kámen.</h4>"; // May leave previously selected piece there, but for debug purposes will reset.
        return;
    } else {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let jsonResponse = JSON.parse(this.responseText);
                KANJI.innerHTML += "<article><h4>"
                        +jsonResponse.kanji+" - "+jsonResponse.meanings+"</h4><p>"
                        +jsonResponse.stroke_count+" tahů, ročník "+jsonResponse.grade+", JLPT "+jsonResponse.jlpt+", U+"+jsonResponse.unicode.toUpperCase()
                        +"</p><p><strong>Onjómi:</strong> "+jsonResponse.on_readings
                        +"</p><p><strong>Kunjómi:</strong> "+jsonResponse.kun_readings
                        +"</p><p><strong>RTK mnemonika:</strong> "+jsonResponse.heisig_en
                        +"</article>";
            }
        };
        //let piece = document.getElementById("board");
        xmlhttp.open("GET", "https://kanjiapi.dev/v1/kanji/" + kanji, true);
        xmlhttp.send();
		
		/* // using fetch
		fetch("https://kanjiapi.dev/v1/kanji/" + kanji).then((resp) => {
			let jsonResponse = JSON.parse(this.responseText);
            KANJI.innerHTML += "<article><h4>"
                    +jsonResponse.kanji+" - "+jsonResponse.meanings+"</h4><p>"
                    +jsonResponse.stroke_count+" tahů, ročník "+jsonResponse.grade+", JLPT "+jsonResponse.jlpt+", U+"+jsonResponse.unicode.toUpperCase()
                    +"</p><p><strong>Onjómi:</strong> "+jsonResponse.on_readings
                    +"</p><p><strong>Kunjómi:</strong> "+jsonResponse.kun_readings
                    +"</p><p><strong>RTK mnemonika:</strong> "+jsonResponse.heisig_en
                    +"</article>";
		});
		*/
    }
}

/**
    Dictionary for turning piece kanji into an URL to get info from. 
    Would ideally be done by that server API. At least I didn't use switch.
    Is to be supplied per-game.
*/
export const pieceMap = {
    "歩":"common_fuhyo.html",
    "角":"common_kakugyo.html",
    "飛":"common_hisha.html",
    "香":"common_kyosha.html",
    "桂":"common_keima.html",
    "銀":"common_ginsho.html",
    "金":"common_kinsho.html",
    "玉":"common_gyokusho_osho.html",
    "王":"common_gyokusho_osho.html",
    "と":"common_tokin.html",
    "馬":"common_ryuma.html",
    "龍":"common_ryuo.html",
    "杏":"common_narikyo.html",
    "圭":"common_narikei.html",
    "全":"common_narigin.html"
};
export const promotionMap = {
    "歩":"と",
    "角":"馬",
    "飛":"龍",
    "香":"杏",
    "桂":"圭",
    "銀":"全",
    "金":"",
    "玉":"",
    "王":"",
    "と":"歩", // demotion or promotes from
    "馬":"角",
    "龍":"飛",
    "杏":"香",
    "圭":"桂",
    "全":"銀"
};
export const kanjiMap = {
    "歩":["歩","兵","金"],
    "角":["角","行","龍","馬"],
    "飛":["飛","車","龍","王"],
    "香":["香","車","成"],
    "桂":["桂","馬","成"],
    "銀":["銀","將","成"],
    "金":["金","將"],
    "玉":["玉","將"],
    "王":["王","將"],
    "と":["金","歩","兵"],
    "馬":["龍","馬","角","行"],
    "龍":["龍","王","飛","車"],
    "杏":["杏","成","香","車"],
    "圭":["圭","成","桂","馬"],
    "全":["全","成","銀","將"]
};

/**
    Displays custom info about the currently selected piece from internals 
    of a previous project of ShogiWeb. Implemented very lamely, there isn't 
    any actual API over there.
*/
const displayPieceInfo = function(piece){
    if (piece.length === 0 || piece === "　") {
        document.getElementById("selected").innerHTML = "<h4>Není vybrán žádný kámen.</h4>";
        document.getElementById("promotion").innerHTML = "<h4>Není vybrán žádný kámen.</h4>"; // May leave previously selected piece there, but for debug purposes will reset.
        return;
    } else {
        var xhrSelected = new XMLHttpRequest();
        xhrSelected.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("selected").innerHTML = this.responseText; // plain HTML
            }
        };
        xhrSelected.open("GET", "https://eso.vse.cz/~getj00/sp1/include/pieces/" + pieceMap[piece], true);
        xhrSelected.send();
        
        if(promotionMap[piece] !== ""){ // if piece promotes
            var xhrPromotion = new XMLHttpRequest();
            xhrPromotion.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("promotion").innerHTML = this.responseText; // plain HTML
                }
            };
            xhrPromotion.open("GET", "https://eso.vse.cz/~getj00/sp1/include/pieces/" + pieceMap[promotionMap[piece]], true);
            xhrPromotion.send();
        }else{
            document.getElementById("promotion").innerHTML = "<h4>Vybraný kámen nepovyšuje.</h4>";
        }
		
		/* // using fetch () - no returning data out, only sequential processing culminating in a side effect
		
		fetch("https://eso.vse.cz/~getj00/sp1/include/pieces/"+pieceMap[piece]).then((resp) => {
			document.getElementById("promotion").innerHTML = resp;
		});
		fetch("https://eso.vse.cz/~getj00/sp1/include/pieces/"+pieceMap[promotionMap[piece]]).then((resp) => {
			document.getElementById("promotion").innerHTML = resp;
		});
		*/
		
		
    }
}


// -*-*-*-   L I S T E N E R   R E G I S T R A T I O N   -*-*-*-
/**
    Registers listeners for dragging and dropping pieces around the borard.
*/
export const registerDragDropListeners = function(boardWidth, boardHeight){
    for(let i = 1; i <= boardHeight; ++i){
        for(let j = 1; j <= boardWidth; ++j){
            let curCell = BOARD.children[i].children[j];
            
            if(curCell.children.length > 0 && curCell.children[0].innerText != "　"){ // check for emptiness ex-post instead?
                curCell.children[0].addEventListener("dragstart", (ev) => {
                    ev.dataTransfer.setData("text", ev.target.id);
                });
            }
            
            curCell.addEventListener("dragover", (ev) => {
                ev.preventDefault();
            });
            
            curCell.addEventListener("drop", (ev) => {
                ev.preventDefault();
                let pieceDivId = ev.dataTransfer.getData("text");
                let pieceDiv = document.getElementById(pieceDivId);  
                
                console.log(pieceDiv);
                console.log(ev.target);
                
                if(ev.target.id != pieceDivId){ // make sure drag and drop on the same cell doesn't delete the piece
                    let wasEmpty = ev.target.innerHTML == "";
                    if(wasEmpty) { // empty <td> messes up
                        ev.target.appendChild(pieceDiv);
                    }else{
                        ev.target.parentNode.appendChild(pieceDiv);
                    }
                    
                    if(ev.target.innerText != "　" && ev.target.innerText != ""){ // capturing (to a dumping ground for now)
                        if(!wasEmpty){
                            CAPTURED.appendChild(ev.target); // it's the inner element, no childen
                        } 
                    }else{
                        if(wasEmpty) {
                            ev.target.removeChild(ev.target.parentNode.firstChild);
                        }else{
                            ev.target.parentNode.removeChild(ev.target.parentNode.firstChild);
                        }
                    }

                }
                ev.dataTransfer.clearData();
            });
        }
    }
	// also need to check captured pieces if loading a state
	document.getElementById("captured").forEach(addEventListener("dragstart", (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }));
}

// ATM, the entire element is dragged into the target element, making a hole at it's original spot.

// Dragging and dropping may not be the best for touchscreens, given confusability with scrolling, 
// but at least it uses different events so it doesn't get confused in the code.

/*
We need:
ondrop, ondragover (supress) - for each board cell 
draggable=true, ondragstart - for each draggable item (ie. non space piece)
*/

/**
    Clears the results elements.
*/
const clearElements = function(){
    document.getElementById("selected").innerHTML = "";
    document.getElementById("promotion").innerHTML = "";
    KANJI.innerHTML = "";
}

/**
    Registers listeners for selecting a piece on the board and showing 
    the properties of it, and querying the Kanjidev API for the kanji found 
    in the piece names and the promoted piece names. Also moving for cases 
    when dragging and dropping is unperformable, like on touchscreens.
    Pay attention to indexing with respect to the shogi coordinate system:
    
         [0] [1] [2] [3] [4] [5] [6] [7][W-1][W][W+1]
        +---#---+---+---+---+---+---+---+---+---#---+
    [0] |   # W |W-1| 7 | 6 | 5 | 4 | 3 | 2 | 1 #   | <tr>: <th><th>...<th><th>
        #############################################
    [1] | @ # L | N | S | G | K | G | S | N | L # 1 | <tr>: <th><td>...<td><th>
        +---#---+---+---+---+---+---+---+---+---#---+
    [2] | @ #   | R |   |   |   |   |   | B |   # 2 | <tr>: <th><td>...<td><th>
        +---#---+---+---+---+---+---+---+---+---#---+
    [3] | @ # P | P | P | P | P | P | P | P | P # 3 | <tr>: <th><td>...<td><th>
*/
export const registerPieceSelectListeners = function(boardWidth, boardHeight){
    for(let i = 1; i <= boardHeight; ++i){
        for(let j = 1; j <= boardWidth; ++j){
            BOARD.children[i].children[j].addEventListener("click", () => {
                let curCell = BOARD.children[i].children[j];
                // alternative to drag and drop for touchscreens, ugly statefulness via a global variable
                if(selectedPieceDiv == null){
                    if(curCell.innerText != "　" && curCell.innerText != ""){ // prevent capturing pieces with an empty piece
                        selectedPieceDiv = curCell.children[0];
						// selectedPieceDiv  COLOR <!!!!!!!!!!!!!!!!
                    }else{
                        selectedPieceDiv = null; // deselect any previously selected piece
                    }
                }else{
                    if(selectedPieceDiv.innerText != "　" && selectedPieceDiv.innerText != ""){ // more checks to prevent capture with emptiness
                        if(curCell.innerText != "　" && curCell.innerText != ""){ // capturing
                            CAPTURED.appendChild(curCell.children[0]);
                        }
                        // only moving, the empty piece gets destroyed (the edge numbers are guarding against an empty row or column shrinking to nothing)
                        curCell.innerHTML = "";
                        curCell.appendChild(selectedPieceDiv);
                        selectedPieceDiv = null; // clear selection for next move
                    }
                }
                
                let piece = curCell.innerText; // after the moving shenanigans
                displayPieceInfo(piece); // also promotion, will overwrite
                KANJI.innerHTML = "";
                if (piece.length !== 0 && piece !== "　"){ // add space entry to kanjiMap?
                    kanjiMap[piece].forEach(displayKanjiInfo);
                }else{
                    KANJI.innerHTML = "<h4>Není vybrán žádný kámen.</h4>";
                }
            });
            /* // maybe
            BOARD.children[i].children[j].children[0].addEventListener("click", () => {
                let curCell = BOARD.children[i].children[j];
            });
            */
        }
    }
	// also need to check captured pieces if loading a state (note, not final structure)
	document.getElementById("captured").forEach((element, index) => {
		element.addEventListener("click", (ev) => {
			selectedPieceDiv = element;
		}
	}));
}

/**
    Registers listeners for control buttons.
*/
export const registerButtonListeners = function(boardWidth, boardHeight){
    document.getElementById("btnPromote").addEventListener("click", (ev) => {
        if(selectedPieceDiv != null){ // nothing selected
			let piece = selectedPieceDiv.innerText;
			if(piece != "　" && piece != "" && promotionMap[piece] != ""){
				selectedPieceDiv.innerText = promotionMap[piece];
				selectedPieceDiv.classList.toggle("promoted");
			}
		}
    });
    document.getElementById("btnPromote").addEventListener("drop", (ev) => { // this button doubles as a drop zone
        ev.preventDefault();
        let pieceDiv = document.getElementById(ev.dataTransfer.getData("text"));
        let piece = pieceDiv.innerText;
        if(piece != "　" && piece != "" && promotionMap[piece] != ""){
            pieceDiv.innerText = promotionMap[piece];
            pieceDiv.classList.toggle("promoted");
        }
    });
    
	document.getElementById("btnRotate").addEventListener("click", (ev) => {
        let piece = selectedPieceDiv.innerText;
        if(piece != "　" && piece != "" && promotionMap[piece] != ""){
			if(selectedPieceDiv.classList.contains("rotate")){ // maybe nuke notrot, was just for visual alignment
				selectedPieceDiv.classList.remove("rotate");
				selectedPieceDiv.classList.add("notrot");
			} else if(selectedPieceDiv.classList.contains("notrot")){
				selectedPieceDiv.classList.remove("notrot");
				selectedPieceDiv.classList.add("rotate");
			}
        }
    });
	
    document.getElementById("btnDeselect").addEventListener("click", (ev) => { // so that no accidental moves happen
        selectedPieceDiv = null;
        displayPieceInfo("");
        KANJI.innerHTML = "<h4>Není vybrán žádný kámen.</h4>";
    });
    
    document.getElementById("btnSave").addEventListener("click", (ev) => {
        localStorage.setItem("boardState", BOARD.innerHTML);
        localStorage.setItem("capturedState", CAPTURED.innerHTML);
        // the HTML of the board is actually too big for a cookie
    });
    document.getElementById("btnLoad").addEventListener("click", (ev) => {
        let resBoard = localStorage.getItem("boardState");
        let resCapture = localStorage.getItem("capturedState");
        if(resBoard != null && resCapture != null){
            BOARD.innerHTML = resBoard;
            CAPTURED.innerHTML = resCapture;
        }
        registerDragDropListeners(boardWidth, boardHeight);
        registerPieceSelectListeners(boardWidth, boardHeight);
    });
}


// color selected piece (click)
// auto load saved state if exists
// reset via button (state), message box - confirm()
