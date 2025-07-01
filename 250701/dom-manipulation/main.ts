const button = document.getElementById('helloBtn') as HTMLButtonElement;
const output = document.getElementById('output') as HTMLParagraphElement;
const input = document.getElementById('nameInput') as HTMLInputElement;
const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
const inputList = document.getElementById('itemInput') as HTMLInputElement;
const submitButton = document.getElementById('submitBtn') as HTMLButtonElement;
const toggleButton = document.getElementById('toggleBtn') as HTMLButtonElement;
const listButton = document.getElementById('addBtn') as HTMLButtonElement;
const colorSelect = document.getElementById('colorSelect') as HTMLSelectElement;
const colorBox = document.getElementById('colorBox') as HTMLDivElement;
const decreaseButton = document.getElementById(
  'decreaseBtn',
) as HTMLButtonElement;
const increaseButton = document.getElementById(
  'increaseBtn',
) as HTMLButtonElement;
const hidden = document.getElementById('hiddenText') as HTMLParagraphElement;
const charCount = document.getElementById('charCount') as HTMLParagraphElement;
const counter = document.getElementById('counter') as HTMLSpanElement;
const list = document.getElementById('itemList') as HTMLUListElement;
const outputName = document.getElementById(
  'displayName',
) as HTMLParagraphElement;

button.addEventListener('click', () => {
  output.textContent = 'Hello from TypeScript!';
});

submitButton.addEventListener('click', () => {
  outputName.textContent = `Hi, ${input.value}!`;
});

toggleButton.addEventListener('click', () => {
  if (hidden.style.visibility === 'hidden') hidden.style.visibility = 'initial';
  else hidden.style.visibility = 'hidden';
});

listButton.addEventListener('click', () => {
  if (inputList.value.trim() !== '') {
    const listElement: HTMLLIElement = document.createElement('li');
    listElement.textContent = inputList.value.trim();

    const deleteBtn: HTMLButtonElement = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';

    deleteBtn.addEventListener('click', () => {
      list.removeChild(listElement);
    });
    listElement.appendChild(deleteBtn);
    list.appendChild(listElement);
  }
});

decreaseButton.addEventListener('click', () => {
  const number: number = Number(counter.textContent);
  counter.textContent = `${number - 1}`;
});

increaseButton.addEventListener('click', () => {
  const number: number = Number(counter.textContent);
  counter.textContent = `${number + 1}`;
});

colorSelect.addEventListener('change', () => {
  const selectedColor = colorSelect.value;
  colorBox.style.backgroundColor = selectedColor;
});

textInput.addEventListener('input', () => {
  charCount.textContent = `${textInput.value.length} ${
    textInput.value.length > 1 ? 'characters' : 'character'
  }`;
});
