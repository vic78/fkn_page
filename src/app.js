import { BrowserPascalJs } from '../pascal.js/src/PascalJs/BrowserPascalJs.js';
import { OneVarOutputStream } from '../pascal.js/src/IO/Output/OneVarOutputStream.js'
import { StringOutput } from '../pascal.js/src/IO/Output/StringOutput.js';
import { Terminal } from './Terminal.js';



function setCaret(event)
{
    let elem = document.querySelector('div.screen div span[contenteditable=true]');
        event.preventDefault();
    if(elem) {
        let range = document.createRange();
        let sel = window.getSelection();

        if (elem.childNodes.length === 0) {
            elem.appendChild(document.createTextNode(''))
        }
        let offset = elem.childNodes[0].length;
        if (sel.anchorOffset === offset || offset === 0) {

        range.setStart(elem.childNodes[0], offset)

            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
        }
    }
}

let screen = document.querySelector('.screen');
screen.addEventListener('click', setCaret);

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
        let programLines = container.querySelectorAll('div.line');
        let items = [];
        for (let i = 0; i < programLines.length; i++) {
            let programLine = programLines[i];
            let elems = [ ...programLine.childNodes ];
            for (let j = 0; j < elems.length; j++) {
                let elem = elems[j];
                items.push(elem.tagName && elem.tagName === 'BR' ? '\n' : elems[j].textContent);
            }
            items.push('\n');
        }
        let programText = items.join('');


        let pascal = new BrowserPascalJs(config);
        try {
            await pascal.runString(programText);
        }  catch (e) {

        }
        console.log(config.outputStream.value);
        config.outputStream.value = '';

        event.preventDefault();
    });
});

