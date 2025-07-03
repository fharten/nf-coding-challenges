"use strict";
class PlainText {
    constructor(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }
}
class BoldTextDecorator {
    constructor(text) {
        this.text = text;
    }
    getText() {
        return `<b>${this.text.getText()}</b>`;
    }
}
class ItalicTextDecorator {
    constructor(text) {
        this.text = text;
    }
    getText() {
        return `<i>${this.text.getText()}</i>`;
    }
}
class UnderlineTextDecorator {
    constructor(text) {
        this.text = text;
    }
    getText() {
        return `<u>${this.text.getText()}</u>`;
    }
}
const text = new BoldTextDecorator(new PlainText('Hello u'));
console.log(text.getText()); // <b>Hello</b>
