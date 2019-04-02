async function getCurrencyFromAPI() {
  return await fetch('./currency.json').then(resp => resp.json());
}

async function getTotalCartPrice(selectedCart) {
  const currency = await getCurrencyFromAPI();
  const usdSum = selectedCart
    .map(item => item.price)
    .reduce((sum, a) => {
      return sum + a;
    })
  const total = {};
  Object.keys(currency).forEach(key => {
    total[key] = currency[key] * usdSum;
  });
  return total;
};

function render(totalCartPrice) {
  const renderString = Object.keys(totalCartPrice)
    .map(cur => {
      return totalCartPrice[cur].toFixed(2) + ' ' + cur;
    })
    .join('<br>');
  document.getElementById('currencies').innerHTML = renderString;
}

(async () => {
  const selectedCart = [
    { price: 20 },
    { price: 45 },
    { price: 67 },
    { price: 1305 }
  ];
  const totalCartPrice = await getTotalCartPrice(selectedCart);
  console.log(totalCartPrice);
  render(totalCartPrice);
})();
