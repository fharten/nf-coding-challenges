class PlainText {
  constructor(private text: string) {}

  getText(): string {
    return this.text;
  }
}

class BoldTextDecorator {
  constructor(private text: PlainText) {}

  getText() {
    return `<b>${this.text.getText()}</b>`;
  }
}

class ItalicTextDecorator {
  constructor(private text: PlainText) {}

  getText() {
    return `<i>${this.text.getText()}</i>`;
  }
}

class UnderlineTextDecorator {
  constructor(private text: PlainText) {}

  getText() {
    return `<u>${this.text.getText()}</u>`;
  }
}

const text = new BoldTextDecorator(new PlainText('Hello u'));
console.log(text.getText()); // <b>Hello</b>
