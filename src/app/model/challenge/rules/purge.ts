import type { Stone } from '../../stone';
import { WORD_CATEGORIES, WORD_FACES } from '../../consts';
import { CHALLENGE_CODES, type CHALLENGE_ID, CHALLENGE_PURGE_TIME_PER_TARGET, SUIT_GROUPS } from '../consts';
import type { ChallengeContext, ChallengeRules } from '../types';

function matchesGroup(stone: Stone, categories: Array<string>): boolean {
	const id = stone.img.id;
	if (id === undefined) {
		return false;
	}
	const wordId = WORD_FACES[id]?.wordId;
	return wordId !== undefined && categories.includes(WORD_CATEGORIES[wordId] ?? '');
}

export function pickSuitGroup(context: ChallengeContext): { name: string; stones: Array<Stone> } | undefined {
	const open = context.board.stones().filter(stone => !stone.picked());
	const usable = SUIT_GROUPS
		.map(group => ({ name: group.name, stones: open.filter(stone => matchesGroup(stone, [group.category])) }))
		.filter(group => group.stones.length > 0);
	if (usable.length === 0) {
		return undefined;
	}
	return usable[Math.floor(context.random() * usable.length)];
}

export class PurgeRules implements ChallengeRules {
	readonly id: CHALLENGE_ID = CHALLENGE_CODES.CHALLENGE_THE_PURGE;

	onStart(context: ChallengeContext): void {
		const group = pickSuitGroup(context);
		if (!group) {
			return;
		}
		for (const stone of group.stones) {
			context.mark(stone, 'target');
		}
		context.addTime(group.stones.length * CHALLENGE_PURGE_TIME_PER_TARGET);
		context.setSubject(group.name);
		context.setProgress(0, group.stones.length);
	}

	onRestore(context: ChallengeContext): void {
		this.updateProgress(context);
	}

	onPick(context: ChallengeContext): void {
		this.updateProgress(context);
	}

	onUndo(context: ChallengeContext): void {
		this.updateProgress(context);
	}

	evaluate(context: ChallengeContext): 'run' | 'won' | 'lost' {
		const targets = context.markedStones('target');
		if (targets.length > 0 && targets.every(stone => stone.picked())) {
			return 'won';
		}
		return context.remaining() <= 0 ? 'lost' : 'run';
	}

	private updateProgress(context: ChallengeContext): void {
		const targets = context.markedStones('target');
		context.setProgress(targets.filter(stone => stone.picked()).length, targets.length);
	}
}
