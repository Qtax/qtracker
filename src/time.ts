export function truncDate(date: Date): Date {
	let d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}

export function formatDate(date: Date) {
	return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
		date.getDate(),
	)}`;
}

export function formatTime(time: Date) {
	return zeroPad(time.getHours()) + ":" + zeroPad(time.getMinutes());
}

export function zeroPad(n: number, padding = 2): string {
	return String(n).padStart(padding, "0");
}
