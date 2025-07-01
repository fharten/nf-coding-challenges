var button = document.getElementById('helloBtn');
var output = document.getElementById('output');
var input = document.getElementById('nameInput');
var textInput = document.getElementById('textInput');
var inputList = document.getElementById('itemInput');
var submitButton = document.getElementById('submitBtn');
var toggleButton = document.getElementById('toggleBtn');
var listButton = document.getElementById('addBtn');
var colorSelect = document.getElementById('colorSelect');
var colorBox = document.getElementById('colorBox');
var decreaseButton = document.getElementById('decreaseBtn');
var increaseButton = document.getElementById('increaseBtn');
var hidden = document.getElementById('hiddenText');
var charCount = document.getElementById('charCount');
var counter = document.getElementById('counter');
var list = document.getElementById('itemList');
var outputName = document.getElementById('displayName');
button.addEventListener('click', function () {
    output.textContent = 'Hello from TypeScript!';
});
submitButton.addEventListener('click', function () {
    outputName.textContent = "Hi, ".concat(input.value, "!");
});
toggleButton.addEventListener('click', function () {
    if (hidden.style.visibility === 'hidden')
        hidden.style.visibility = 'initial';
    else
        hidden.style.visibility = 'hidden';
});
listButton.addEventListener('click', function () {
    if (inputList.value.trim() !== '') {
        var listElement_1 = document.createElement('li');
        listElement_1.textContent = inputList.value.trim();
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', function () {
            list.removeChild(listElement_1);
        });
        listElement_1.appendChild(deleteBtn);
        list.appendChild(listElement_1);
    }
});
decreaseButton.addEventListener('click', function () {
    var number = Number(counter.textContent);
    counter.textContent = "".concat(number - 1);
});
increaseButton.addEventListener('click', function () {
    var number = Number(counter.textContent);
    counter.textContent = "".concat(number + 1);
});
colorSelect.addEventListener('change', function () {
    var selectedColor = colorSelect.value;
    colorBox.style.backgroundColor = selectedColor;
});
textInput.addEventListener('input', function () {
    charCount.textContent = "".concat(textInput.value.length, " ").concat(textInput.value.length > 1 ? 'characters' : 'character');
});
