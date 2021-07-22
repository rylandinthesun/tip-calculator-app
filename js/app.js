const billAmount = document.getElementById('input-bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('input-tip');
const peopleAmount = document.getElementById('input-people');
const errMsg = document.querySelector('.error-msg');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset');

billAmount.addEventListener('input', setBillValue);
tipBtns.forEach((btn) => {
	btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setCustomTip);
peopleAmount.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);

let billValue = 0.0; // default
let tipValue = 0.15; // default
let peopleValue = 1; // default

function validateFloat (s) {
	var rgx = /^[0-9]*\.?[0-9]*$/;
	return s.match(rgx);
}

function validateInt (s) {
	var rgx = /^[0-9]*$/;
	return s.match(rgx);
}

function setBillValue () {
	if (billAmount.value.includes(',')) {
		billAmount.value - billAmount.value.replace(',', '.');
	}

	if (!validateFloat(billAmount.value)) {
		billAmount.value = billAmount.value.substring(0, billAmount.value.length - 1);
	}

	billValue = parseFloat(billAmount.value);
	calculateTip();
}

function handleClick (event) {
	tipBtns.forEach((btn) => {
		// clear active state
		btn.classList.remove('btn-active');

		// set active state
		if (event.target.innerHTML == btn.innerHTML) {
			btn.classList.add('btn-active');
			tipValue = parseFloat(btn.innerHTML) / 100;
		}
	});

	calculateTip();
}

function setCustomTip () {
	if (!validateFloat(tipCustom.value)) {
		tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
	}

	tipValue = parseFloat(tipCustom.value / 100);

	tipBtns.forEach((btn) => {
		btn.classList.remove('btn-active');
	});

	if (tipCustom.value !== '') {
		calculateTip();
	}
}

function setPeopleValue () {
	if (!validateInt(peopleAmount.value)) {
		peopleAmount.value = peopleAmount.value.substring(0, peopleAmount.value.length - 1);
	}

	peopleValue = parseFloat(peopleAmount.value);

	if (peopleValue <= 0) {
		errMsg.classList.add('show-error-msg');
		peopleAmount.classList.add('input-text-error');
	}
	if (peopleValue >= 1) {
		errMsg.classList.remove('show-error-msg');
		peopleAmount.classList.remove('input-text-error');
	}
	calculateTip();
}

function calculateTip () {
	if (peopleValue >= 1) {
		let tipAmount = billValue * tipValue / peopleValue;
		let total = billValue * (tipValue + 1) / peopleValue;
		results[0].innerHTML = '$' + tipAmount.toFixed(2);
		results[1].innerHTML = '$' + total.toFixed(2);
	}
}

function reset () {
	billAmount.value = '0.0';
	setBillValue();

	tipBtns[2].click();

	peopleAmount.value = '1';
	setPeopleValue();
}
