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
            elem.appendChild(document.createTextNode(''));
        }
        let offset = elem.childNodes[0].length;
        if (sel.anchorOffset === offset || offset === 0) {

        range.setStart(elem.childNodes[0], offset);

            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    let dialog = document.createElement('dialog');
    let screen = document.createElement('div');
    screen.classList.add('screen');
    let closeButton = document.createElement('button');
    closeButton.id = 'close';
    closeButton.textContent = 'Закрыть';
    dialog.appendChild(screen);
    dialog.appendChild(closeButton);

    let body = document.querySelector('body');
    body.appendChild(dialog);

    screen.addEventListener('click', setCaret);

    let terminal = new Terminal();

    const config =  {
        outputStream: terminal,
        listingOutput: new StringOutput(),
        ouputNewLineSymbol: '\n',
        input: terminal,
    };

    let elementList = document.querySelectorAll('div.delphi');

    document.querySelector('#close').onclick = function() {
        dialog.close();
        config.listingOutput.clearLines();
        screen.replaceChildren();
    };

    elementList.forEach((elem) => {

        let text_elem = elem.querySelector('div.toolbar span a.command_help');

        let elemToClick = document.createElement('div');
        elemToClick.classList.add('run_button');
        elemToClick.textContent = '▶';

        let parentElem = elem.parentNode;

        parentElem.prepend(elemToClick);

        elemToClick.addEventListener( 'click' , async function(event) {
            dialog.showModal();

            let container = parentElem.querySelector('table tbody tr td.code div.container');
            let programLines = container.querySelectorAll('div.line');
            let items = [];
            for (let i = 0; i < programLines.length; i++) {
                let programLine = programLines[i];
                let elems = [ ...programLine.childNodes ];
                for (let j = 0; j < elems.length; j++) {
                    let elem = elems[j];
                    items.push(elem.tagName && elem.tagName === 'BR' ? '\n' : elems[j].textContent.replace(/\s/g, '\u0020'));
                }
                items.push('\n');
            }
            let programText = items.join('');


            let pascal = new BrowserPascalJs(config);
            try {
                await pascal.runString(programText);
            }  catch (e) {

            }

            config.outputStream.value = '';

            event.preventDefault();
        });
    });
});