import { signal } from '@angular/core';
import type { StoneMark } from './challenge/consts';
import type { TileLang } from './consts';

export interface StonePosition {
	x: number;
	y: number;
	z: number;
	v: number;
	groupNr: number;
}

export interface StoneState {
	blocked: boolean;
	removable: boolean;
}

export interface StoneImg {
	id?: string;
}

export interface StoneNodes {
	top: Array<Stone>;
	left: Array<Stone>;
	right: Array<Stone>;
	bottom: Array<Stone>;
}

export class Stone implements StonePosition {
	x: number;
	y: number;
	z: number;
	v: number;
	groupNr: number;
	readonly hinted = signal(false);
	readonly matched = signal(false);
	readonly selected = signal(false);
	readonly picked = signal(false);
	readonly wiggle = signal(false);
	readonly mark = signal<StoneMark | undefined>(undefined);
	readonly state = signal<StoneState>({ blocked: false, removable: false }, { equal: (a, b) => a.blocked === b.blocked && a.removable === b.removable });
	wiggleTimer?: ReturnType<typeof setTimeout>;
	group: Array<Stone> = [];
	img: StoneImg = {};
	// the word shown on the face and the language it is written in
	text: string = '';
	lang: TileLang = 'zu';
	nodes: StoneNodes = { top: [], left: [], right: [], bottom: [] };

	private static hasStone(list: Array<Stone>): boolean {
		return list.some(stone => !stone.picked());
	}

	constructor(z: number, x: number, y: number, v: number, groupNr: number) {
		this.z = z;
		this.x = x;
		this.y = y;
		this.v = v;
		this.groupNr = groupNr;
	}

	toPosition(): StonePosition {
		return { z: this.z, x: this.x, y: this.y, v: this.v, groupNr: this.groupNr };
	}

	isBlocked(): boolean {
		return Stone.hasStone(this.nodes.top) || (Stone.hasStone(this.nodes.left) && Stone.hasStone(this.nodes.right));
	}
}

export const safeGetStone = (stones: Array<Stone>, z: number, x: number, y: number): Stone | undefined => {
	for (const stone of stones) {
		if (stone.z === z && stone.x === x && stone.y === y) {
			return stone;
		}
	}
	return undefined;
};

// two stones pair up when they show the same word in opposite languages
export const isWordPartner = (a: Stone, b: Stone): boolean =>
	a !== b && a.groupNr === b.groupNr && a.lang !== b.lang;

// id of the zulu/english pair instance a stone belongs to: within a word group the tiles
// are ordered [zulu A, english A, zulu B, english B] with consecutive v values starting
// at 1, so v offsets 0 and 1 form instance 0 and offsets 2 and 3 form instance 1
export const pairInstanceId = (stone: { groupNr: number; v: number }): number =>
	stone.groupNr * 2 + ((((Math.max(stone.v, 1) - 1) % 4) < 2) ? 0 : 1);
