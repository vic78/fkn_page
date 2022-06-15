import { BrowserPascalJs } from '../pascal.js/src/PascalJs/BrowserPascalJs.js';
import { OneVarOutputStream } from '../pascal.js/src/IO/Output/OneVarOutputStream.js'
import { StringOutput } from '../pascal.js/src/IO/Output/StringOutput.js';
import { Terminal } from './Terminal.js';

let terminal = new Terminal();

const config =  {
    outputStream: terminal,
    listingOutput: new StringOutput(),
    ouputNewLineSymbol: '\n',
    input: terminal,
};


let elementList = document.querySelectorAll('div.delphi div.toolbar span a.command_help');


let dialog = document.querySelector('dialog');
document.querySelector('#close').onclick = function() {
    dialog.close();
};


elementList.forEach((elem) => {
    elem.addEventListener( 'click' , async function(event) {
        dialog.show();

        let divDelphi = this.parentNode.parentNode.parentNode;
        let container = divDelphi.querySelector('table tbody tr td.code div.container');
        let programText = container.textContent;


        let pascal = new BrowserPascalJs(config);
        pascal.runString(programText);
        console.log(config.outputStream.value);
        config.outputStream.value = '';

        event.preventDefault();
    });
});

