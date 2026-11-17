import type { Stone } from './stone';
import type { DrawPlacement } from './draw-geometry';
import type { TileLang } from './consts';

export type { DrawPos, DrawPlacement } from './draw-geometry';
export {
	calcDrawPos,
	getDrawBounds,
	getDrawBoundsViewport,
	getDrawBoundsViewportBounds,
	getDrawViewport,
	mappingToDrawPlacements,
	sortDrawItems
} from './draw-geometry';

export interface Draw extends DrawPlacement {
	v: number;
	visible: boolean;
	key?: string;
	url?: string;
	// the word shown on the tile face and the language it is written in
	text?: string;
	lang?: TileLang;
	className?: string;
	source: Stone;
}

export interface DrawLevel {
	z: number;
	items: Array<Draw>;
}

export function groupDrawsByLevel(items: Array<Draw>): Array<DrawLevel> {
	const levels: Array<DrawLevel> = [];
	let current: DrawLevel | undefined;
	for (const draw of items) {
		if (!current || current.z !== draw.z) {
			current = { z: draw.z, items: [] };
			levels.push(current);
		}
		current.items.push(draw);
	}
	return levels;
}
