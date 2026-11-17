import type { Mapping } from '../types';
import type { Tile, TileGroup, Tiles } from '../tiles';
import { Stone } from '../stone';
import { BuilderBase } from './base';
import { shuffledCopy } from '../array-utilities';

const MAX_REROLL_ATTEMPTS = 50;

export class RandomBoardBuilder extends BuilderBase {
	build(places: Mapping, tiles: Tiles): Array<Stone> {
		const mapping = BuilderBase.pairedMapping(places);
		let stones: Array<Stone> = [];
		for (let attempt = 0; attempt < MAX_REROLL_ATTEMPTS; attempt++) {
			stones = this.buildOnce(mapping, tiles);
			if (RandomBoardBuilder.hasFreePair(stones)) {
				break;
			}
		}
		// after the last attempt there is nothing better to return, but it has been checked like all the others
		return stones;
	}

	getTilesInGame(tiles: Tiles, amount: number): Array<Tile> {
		// Draw complete pairs so every group placed on the board has an even tile count.
		// The pair instances carry one zulu and one english tile of the same word.
		const need = Math.floor(amount / 2) * 2;
		const result: Array<Tile> = [];
		for (const group of shuffledCopy(tiles.groups)) {
			this.fillPairs(group, result, need);
			if (result.length >= need) {
				break;
			}
		}
		return result;
	}

	private fillPairs(group: TileGroup, result: Array<Tile>, need: number): void {
		for (const pair of BuilderBase.instancePairs(group.tiles)) {
			if (result.length >= need) {
				return;
			}
			result.push(pair[0], pair[1]);
		}
	}

	private buildOnce(mapping: Mapping, tiles: Tiles): Array<Stone> {
		const remainingTiles = this.getTilesInGame(tiles, mapping.length);
		const stones: Array<Stone> = [];
		const remainingPlaces = [...mapping];
		while (remainingPlaces.length > 0 && remainingTiles.length > 0) {
			const tile = BuilderBase.randomExtract(remainingTiles);
			const place = BuilderBase.randomExtract(remainingPlaces);
			if (!tile || !place) {
				break;
			}
			stones.push(new Stone(place[0], place[1], place[2], tile.v, tile.groupNr));
		}
		BuilderBase.fillStones(stones, tiles);
		return stones;
	}

	private static hasFreePair(stones: Array<Stone>): boolean {
		const freeByLang: { [g: number]: { zu: number; en: number } } = {};
		for (const stone of stones) {
			if (stone.isBlocked()) {
				continue;
			}
			const counts = freeByLang[stone.groupNr] ??= { zu: 0, en: 0 };
			if (stone.lang === 'zu') {
				counts.zu++;
			} else {
				counts.en++;
			}
			if (counts.zu > 0 && counts.en > 0) {
				return true;
			}
		}
		return false;
	}
}
