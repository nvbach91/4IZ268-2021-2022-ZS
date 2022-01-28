/*
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
    |   |   |   | S | H | Ō | G | I | N | A | T | O | R |   |   |   |##
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+##
    | 6 | 3 | 7 | m | a | n |   |   |   |   |   |   | 2 | 0 | 2 | 2 |##
    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+##
      #################################################################
      
                           9x9 - STANDARD SHOGI

This script calls the functions that modify the DOM, defined in the file
shoginator.js, therefore needs to be loaded defer.

For running locally without a web server running, CORS doesn't like file://,
unlike http:// or https://, so Chromium needs to be run like this:
chromium --disable-site-isolation-trials --disable-web-security --allow-file-access-from-files --user-data-dir="~/ChromiumDevSession"

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

import * as Shg from '../shoginator.js'; // relative to the script: ../assets/js/shoginator.js

// -*-*-*- P I E C E S -*-*-*-
/**
    Dictionary for turning piece kanji into an URL to get info from. 
    Would ideally be done by that server API. At least I didn't use switch.
    Is to be supplied per-game.
*/
Shg.gameSpecificStuff.pieceMap = {
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
Shg.gameSpecificStuff.promotionMap = {
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
Shg.gameSpecificStuff.kanjiMap = {
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


Shg.gameSpecificStuff.BOARDWIDTH = 9;
Shg.gameSpecificStuff.BOARDHEIGHT = 9;

// -*-*-*-   B O A R D   -*-*-*-
// Loops unrolled for better readability of the piece layout.
Shg.gameSpecificStuff.createBoard = function(){
	Shg.writeBoardHeader(Shg.gameSpecificStuff.BOARDWIDTH);
	Shg.writeBoardLine(1, ["香","桂","銀","金","王","金","銀","桂","香"], true);
	Shg.writeBoardLine(2, ["　","飛","　","　","　","　","　","角","　"], true);
	Shg.writeBoardLine(3, ["歩","歩","歩","歩","歩","歩","歩","歩","歩"], true);
	Shg.writeBoardLineUniform(4, "　", Shg.gameSpecificStuff.BOARDWIDTH, false);
	Shg.writeBoardLineUniform(5, "　", Shg.gameSpecificStuff.BOARDWIDTH, false);
	Shg.writeBoardLineUniform(6, "　", Shg.gameSpecificStuff.BOARDWIDTH, false);
	// Shg.writeBoardLine(6, ["　","　","　","　","　","　","　","　","　"], false);
	Shg.writeBoardLine(7, ["歩","歩","歩","歩","歩","歩","歩","歩","歩"], false);
	Shg.writeBoardLine(8, ["　","角","　","　","　","　","　","飛","　"], false);
	Shg.writeBoardLine(9, ["香","桂","銀","金","玉","金","銀","桂","香"], false);
	Shg.writeBoardFooter(Shg.gameSpecificStuff.BOARDWIDTH);
}

if(!Shg.loadSavedStateIfExists()){
	Shg.gameSpecificStuff.createBoard();
}

// -*-*-*-   L I S T E N E R S   -*-*-*-
Shg.registerDragDropListeners(Shg.gameSpecificStuff.BOARDWIDTH, Shg.gameSpecificStuff.BOARDHEIGHT);
Shg.registerPieceSelectListeners(Shg.gameSpecificStuff.BOARDWIDTH, Shg.gameSpecificStuff.BOARDHEIGHT);
Shg.registerButtonListeners(Shg.gameSpecificStuff.BOARDWIDTH, Shg.gameSpecificStuff.BOARDHEIGHT);

