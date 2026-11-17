import { TILES, TILES_EXT, WORD_FACES, type TileLang } from './consts';

export interface Tile {
	v: number;
	groupNr: number;
	img: { id: string };
	text: string;
	lang: TileLang;
}

export interface TileGroup {
	v: number;
	tiles: Array<Tile>;
}

export class Tiles {
	list: Array<Tile> = [];
	groups: Array<TileGroup> = [];

	constructor(amount: number) {
		if (amount > 0) {
			this.build(amount);
		}
	}

	build(amount: number): void {
		let v = 0;
		let tilesMapping = TILES.map(row => row.map(id => ({ id })));
		const groupsNeeded = Math.ceil(amount / 4);
		if (groupsNeeded > tilesMapping.length) {
			const tilesExtraMapping = TILES_EXT.map(row => row.map(id => ({ id })));
			tilesMapping = [...tilesMapping, ...tilesExtraMapping];
			const drawableGroups = tilesMapping.length;
			while (tilesMapping.length < groupsNeeded) {
				tilesMapping.push(tilesMapping[tilesMapping.length % drawableGroups].map(tile => ({ id: tile.id })));
			}
		}
		for (const [groupNr, group] of tilesMapping.entries()) {
			const g: TileGroup = { v: groupNr, tiles: [] };
			this.groups.push(g);
			for (const img of group) {
				v++;
				const face = WORD_FACES[img.id];
				const tile: Tile = { groupNr, v, img, text: face?.text ?? '', lang: face?.lang ?? 'zu' };
				g.tiles.push(tile);
				this.list[v] = tile;
			}
		}
	}
}

export class StoneTiles extends Tiles {
	constructor(stones: Array<{ v: number; groupNr: number; img: { id?: string }; text?: string; lang?: TileLang }>) {
		super(0);
		const groupMap: { [groupNr: number]: { v: number; tiles: Array<Tile> } } = {};
		for (const stone of stones) {
			const face = WORD_FACES[stone.img.id ?? ''];
			const tile: Tile = {
				v: stone.v,
				groupNr: stone.groupNr,
				img: { id: stone.img.id ?? '' },
				text: stone.text ?? face?.text ?? '',
				lang: stone.lang ?? face?.lang ?? 'zu'
			};
			groupMap[stone.groupNr] ||= { v: stone.groupNr, tiles: [] };
			groupMap[stone.groupNr].tiles.push(tile);
			this.list[stone.v] = tile;
		}
		// finalize groups (only those with remaining tiles)
		this.groups = Object.values(groupMap).map(g => ({ v: g.v, tiles: g.tiles }));
	}
}
