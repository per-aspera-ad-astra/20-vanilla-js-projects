const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();

// Set background year
year.innerText = currentYear + 1;

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

function updateCountdown() {
	const currentTime = new Date();
	const diff = newYearTime - currentTime;
	
	const d = Math.floor(diff / 1000 / 60 / 60 / 24);
	const h = Math.floor(diff / 1000 / 60 / 60) % 24;
	const m = Math.floor(diff / 1000 / 60) % 60;
	const s = Math.floor(diff / 1000 ) % 60;

	// Add values to DOM
	days.innerHTML = d > 9 ? d : `0${d}`;
	hours.innerHTML = h > 9 ? h : `0${h}`;
	minutes.innerHTML = m > 9 ? m : `0${m}`;
	seconds.innerHTML = s > 9 ? s : `0${s}`;
};

// Show spinner
setTimeout(() => {
	loading.remove();
	countdown.classList.add('show');
}, 1000);

// Run every second
setInterval(updateCountdown, 1000);