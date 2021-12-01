const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rate and update DOM
function calculate() {
	const currency_one = currencyEl_one.value;
	const currency_two = currencyEl_two.value;

	function convertToUSD(val) {
		return 1 / val;
	}

	fetch('https://freecurrencyapi.net/api/v2/latest?apikey=30ef91c0-52cb-11ec-8aef-2983d0d0035c')
		.then(res => res.json())
		.then(data => {
			const values = data.data;
			values['USD'] = 1; // USD is equal 1
			const current = convertToUSD(values[currency_one]);
			const rate_one = values[currency_one];
			const rate_two = values[currency_two];

			rateEl.innerText = `${rate_one.toFixed(3)} ${currency_one} = ${rate_two.toFixed(3)} ${currency_two}`;
			amountEl_two.value = (amountEl_one.value * current * rate_two).toFixed(3);

			console.log(current);
		});
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
	const tempCur  = currencyEl_one.value;
	const tempAmount = amountEl_one.value;
	currencyEl_one.value = currencyEl_two.value;
	amountEl_one.value = amountEl_two.value;
	currencyEl_two.value = tempCur;
	amountEl_two.value = tempAmount;

	calculate();
});

calculate();
