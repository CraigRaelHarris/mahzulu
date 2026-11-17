export interface TileTextLine {
	text: string;
	y: number;
	fontSize: number;
}

export interface TileTextLayout {
	lines: Array<TileTextLine>;
}
// usable face area of a 75x100 tile, inset like the drawn tile art
const FACE_WIDTH = 62;
const FACE_CENTER_Y = 47;
const MAX_FONT_SIZE = 17;
const MIN_FONT_SIZE = 7;
const CHAR_WIDTH_FACTOR = 0.62;
const LINE_HEIGHT_FACTOR = 1.15;

// split a single word into up to three lines and scale the font so it fits the tile face
export function fitTileText(text = ''): TileTextLayout {
	const word = text.trim();
	if (!word) {
		return { lines: [] };
	}
	const parts = splitWord(word);
	const longest = Math.max(...parts.map(part => part.length));
	const fontSize = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, Math.floor(FACE_WIDTH / (longest * CHAR_WIDTH_FACTOR))));
	const lineHeight = fontSize * LINE_HEIGHT_FACTOR;
	const firstBaseline = FACE_CENTER_Y - ((parts.length - 1) * lineHeight) / 2 + fontSize * 0.35;
	return {
		lines: parts.map((part, index) => ({ text: part, y: firstBaseline + index * lineHeight, fontSize }))
	};
}

function splitWord(word: string): Array<string> {
	// a phrase is split on its spaces, a single word is broken at a vowel near the middle
	if (word.includes(' ')) {
		const parts = word.split(/\s+/).filter(part => part.length > 0);
		if (parts.length <= 3) {
			return parts;
		}
	}
	if (word.length <= 7) {
		return [word];
	}
	if (word.length <= 14) {
		const split = splitAtVowel(word, Math.ceil(word.length / 2));
		return [word.slice(0, split), word.slice(split)];
	}
	const perLine = Math.ceil(word.length / 3);
	const first = splitAtVowel(word, perLine);
	const second = splitAtVowel(word, first + perLine);
	return [word.slice(0, first), word.slice(first, second), word.slice(second)];
}

function splitAtVowel(word: string, target: number): number {
	const clamped = Math.min(Math.max(target, 1), word.length - 1);
	for (let offset = 0; offset < word.length; offset++) {
		for (const position of [clamped - offset, clamped + offset]) {
			if (position > 0 && position < word.length && isVowel(word[position - 1])) {
				return position;
			}
		}
	}
	return clamped;
}

function isVowel(char: string): boolean {
	return 'aeiou'.includes(char.toLowerCase());
}
