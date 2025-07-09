async function getColor() {
  let res = await fetch('http://localhost:4444/color');
  return res.json();
}

function handleColor() {
  getColor().then(function (res) {
    const color = res;
    document.getElementById('colorDiv').style.backgroundColor = color.HEX;
    document.getElementById('hex').textContent = 'HEX: ' + color.HEX;
    document.getElementById('rgb').textContent = 'RGB: ' + color.RGB;
    document.getElementById('hsl').textContent = 'HSL: ' + color.HSL;
  });
}
