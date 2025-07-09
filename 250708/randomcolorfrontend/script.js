async function getColor() {
  let res = await fetch('http://localhost:4444/color');
  return res.json();
}

async function getSpecificColor(color) {
  let res = await fetch(`http://localhost:4444/color/${color}`);
  return res.json();
}

function copyHex() {
  if (document.getElementById('hex').innerHTML.length < 1) return;
  var copyColor = document.getElementById('hex').innerHTML.substring(5);
  navigator.clipboard.writeText(copyColor);
  alert('Copied the text: ' + copyColor);
}

function copyRgb() {
  if (document.getElementById('rgb').innerHTML.length < 1) return;
  var copyColor = document.getElementById('rgb').innerHTML.substring(5);
  navigator.clipboard.writeText(copyColor);
  alert('Copied the text: ' + copyColor);
}

function copyHsl() {
  if (document.getElementById('hsl').innerHTML.length < 1) return;
  var copyColor = document.getElementById('hsl').innerHTML.substring(5);
  navigator.clipboard.writeText(copyColor);
  alert('Copied the text: ' + copyColor);
}

function handleColor(value) {
  document.getElementById('wrapper').style.visibility = 'visible';

  if (value) {
    getSpecificColor(value).then(function (res) {
      const color = res;
      const button = document.getElementById(value);
      button.style.backgroundColor = color.complementary;
      button.style.color = color.HEX;
      document.getElementById('colorDiv').style.backgroundColor = color.HEX;
      document.getElementById('hex').textContent = 'HEX: ' + color.HEX;
      document.getElementById('rgb').textContent = 'RGB: ' + color.RGB;
      document.getElementById('hsl').textContent = 'HSL: ' + color.HSL;

      const text = document.querySelectorAll('.text');
      text.forEach((p) => {
        p.style.color = color.complementary;
      });
    });
  } else {
    getColor().then(function (res) {
      const color = res;
      const button = document.getElementById('random');
      button.style.backgroundColor = color.complementary;
      button.style.color = color.HEX;
      document.getElementById('colorDiv').style.backgroundColor = color.HEX;
      document.getElementById('hex').textContent = 'HEX: ' + color.HEX;
      document.getElementById('rgb').textContent = 'RGB: ' + color.RGB;
      document.getElementById('hsl').textContent = 'HSL: ' + color.HSL;

      const text = document.querySelectorAll('.text');
      text.forEach((p) => {
        p.style.color = color.complementary;
      });
    });
  }
}
