
export class Terminal
{
    constructor()
    {
        this.screen = document.querySelector('.screen');
        this.letters = [];
        this.lettersCounter = 0;
    }

    getLine(nextLine = false)
    {
        let screen = document.querySelector('.screen');
        let lines = screen.querySelectorAll('div');

        let currentLine = null;
        if (nextLine || lines.length === 0) {
            currentLine = document.createElement('div');
            screen.appendChild(currentLine);
        } else {
            currentLine = lines[lines.length - 1];
        }

        return currentLine;
    }

    addLine(text, nextLine = false)
    {
        let currentLine = this.getLine(nextLine);
        let lineContainer = document.createElement('span');

        lineContainer.textContent = text;
        currentLine.appendChild(lineContainer);
    }

    write(text)
    {
        let lines = text.split('\n').map(function(elem) {
            return elem.replace(/ /g, '\u00a0');
        });

        this.addLine(lines[0]);

        for (let i = 1; i < lines.length; i++) {
            this.addLine(lines[i], true);
        }
    }

    async read(nextLine = false)
    {
        let currentLine = this.getLine(nextLine);
        let lineContainer = document.createElement('span');
        lineContainer.contentEditable = 'true';
        currentLine.appendChild(lineContainer);
        let screen = document.querySelector('.screen');

        let keyDownListener = function(event) {
            if (event.key === 'Enter') {
                let editableSpan = this.querySelector('span[contenteditable=true');
                editableSpan.contentEditable = 'false';
                event.preventDefault();
                screen.removeEventListener('click', keyDownListener);
            }
        };

        let inputPromise = new Promise(
            function(resolve, reject) {
                setInterval(() => {
                    if (lineContainer.contentEditable === 'false') {
                        resolve(lineContainer.textContent);
                    }
                }, 300);
            }
        );

        screen.addEventListener('keydown', keyDownListener);

        return inputPromise;
//        let result = await inputPromise;
//        console.log('input', result);
    }

    async getChar()
    {
        if (this.letters.length === 0 || this.lettersCounter >= this.letters.length) {
            let word = await this.read() + '\n';
            console.log('word', word);
            this.letters = word.split('');

            this.lettersCounter = 0;
        }

        let currentChar = this.letters[this.lettersCounter];
        this.lettersCounter++;

        return currentChar;
//        return new Promise(
//            function(resolve, reject) {
//                resolve(currentChar);
//            }
//        );

    }
}