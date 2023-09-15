export function getRandomReportData(): number[] {
	const length = 6;
	const min = 0;
	const max = 25;
	const randomArray: number[] = [];

	for (let i = 0; i < length; i++) {
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		randomArray.push(randomNumber);
	}

	return randomArray;
}
