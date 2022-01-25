const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
	const formControl = input.parentElement;
	const errorField = formControl.querySelector('small');

	formControl.classList.add('error');
	errorField.innerText = message;
}

function showSuccess(input) {
	const formControl = input.parentElement;

	formControl.classList.add('success');
}

function checkEmail(input) {
	const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (re.test(input.value.trim())) {
		showSuccess(input);
	}  else {
		showError(input, 'Email is not valid');
	}
}

function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

function checkPasswordsMatch(input1, input2) {
	if (input1.value.trim() !== input2.value.trim()) {
		showError(input2, 'Password do not match');
	}
}

function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
	const inputLength = input.value.trim().length;

	if (inputLength < min) {
		showError(input, `${getFieldName(input)} must be at least ${min} characters`);
	} else if (inputLength > max) {
		showError(input, `${getFieldName(input)} must be no longer than ${max} characters`);
	} else {
		showSuccess(input);
	}
}

form.addEventListener('submit', function(e) {
	e.preventDefault();

	checkLength(username, 3, 15);
	checkLength(password, 6, 20);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
	checkRequired([username, email, password, password2]);
});