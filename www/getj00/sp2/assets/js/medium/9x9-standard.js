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

const BOARDWIDTH = 9;
const BOARDHEIGHT = 9;

// -*-*-*-   B O A R D   -*-*-*-
// Loops unrolled for better readability of the piece layout.
Shg.writeBoardHeader(9);
Shg.writeBoardLine(1, ["香","桂","銀","金","王","金","銀","桂","香"], true);
Shg.writeBoardLine(2, ["　","飛","　","　","　","　","　","角","　"], true);
Shg.writeBoardLine(3, ["歩","歩","歩","歩","歩","歩","歩","歩","歩"], true);
Shg.writeBoardLineUniform(4, "　", BOARDWIDTH, false);
Shg.writeBoardLineUniform(5, "　", BOARDWIDTH, false);
Shg.writeBoardLineUniform(6, "　", BOARDWIDTH, false);
// Shg.writeBoardLine(6, ["　","　","　","　","　","　","　","　","　"], false);
Shg.writeBoardLine(7, ["歩","歩","歩","歩","歩","歩","歩","歩","歩"], false);
Shg.writeBoardLine(8, ["　","角","　","　","　","　","　","飛","　"], false);
Shg.writeBoardLine(9, ["香","桂","銀","金","玉","金","銀","桂","香"], false);
Shg.writeBoardFooter(9);


// -*-*-*-   L I S T E N E R S   -*-*-*-
Shg.registerDragDropListeners(BOARDWIDTH, BOARDHEIGHT);
Shg.registerPieceSelectListeners(BOARDWIDTH, BOARDHEIGHT);
Shg.registerButtonListeners(BOARDWIDTH, BOARDHEIGHT);

