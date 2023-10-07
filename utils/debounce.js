export function debounce(fn, delay = 100) {
	let timerId;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
