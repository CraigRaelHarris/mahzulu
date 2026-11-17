import { describe, expect, it } from 'vitest';
import { fitTileText } from './tile-text';

describe('fitTileText', () => {
	it('returns no lines for an empty word', () => {
		expect(fitTileText('').lines).toEqual([]);
		expect(fitTileText(' '.repeat(3)).lines).toEqual([]);
	});

	it('keeps a short word on a single line with the maximum font size', () => {
		const layout = fitTileText('inja');
		expect(layout.lines).toHaveLength(1);
		expect(layout.lines[0].text).toBe('inja');
		expect(layout.lines[0].fontSize).toBe(17);
	});

	it('wraps a long word across lines', () => {
		const layout = fitTileText('intombazane');
		expect(layout.lines.length).toBeGreaterThanOrEqual(2);
		expect(layout.lines.map(line => line.text).join('')).toBe('intombazane');
	});

	it('wraps a very long word across three lines and shrinks the font', () => {
		const layout = fitTileText('uyabathandakakhulu');
		expect(layout.lines).toHaveLength(3);
		expect(layout.lines.map(line => line.text).join('')).toBe('uyabathandakakhulu');
		for (const line of layout.lines) {
			expect(line.fontSize).toBeLessThan(17);
		}
	});

	it('splits a phrase on its spaces', () => {
		const layout = fitTileText('sweet potato');
		expect(layout.lines.map(line => line.text)).toEqual(['sweet', 'potato']);
	});

	it('stacks the lines around the middle of the face', () => {
		const layout = fitTileText('intombazane');
		const ys = layout.lines.map(line => line.y);
		const middle = (Math.min(...ys) + Math.max(...ys)) / 2;
		expect(middle).toBeGreaterThan(35);
		expect(middle).toBeLessThan(60);
		for (let index = 1; index < ys.length; index++) {
			expect(ys[index]).toBeGreaterThan(ys[index - 1]);
		}
	});
});
