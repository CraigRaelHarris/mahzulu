export const CONSTS = {
	mY: 18, mX: 38, mZ: 7,
	tileWidth: 75,
	tileHeight: 100,
	levelOffset: 16
};

export const STATES = {
	idle: 0,
	run: 1,
	pause: 2
};

export const RESCUE_SHUFFLE_ATTEMPTS = 20;

export const GAME_MODE_EASY: GAME_MODE_ID = 'GAME_MODE_EASY';
export const GAME_MODE_STANDARD: GAME_MODE_ID = 'GAME_MODE_STANDARD';
export const GAME_MODE_EXPERT: GAME_MODE_ID = 'GAME_MODE_EXPERT';
// internal: a challenge sets its own rules, so it is never offered in GameModes and never picked by hand
export const GAME_MODE_CHALLENGE: GAME_MODE_ID = 'GAME_MODE_CHALLENGE';

export interface GameModeFeature {
	title: string;
	desc?: string;
}

export const GameModes: Array<{ id: GAME_MODE_ID; features: Array<GameModeFeature> }> = [
	{
		id: GAME_MODE_EASY,
		features: [
			{ title: 'SHUFFLE' },
			{ title: 'HINT' },
			{ title: 'UNDO' },
			{ title: 'RESCUE_SHUFFLE' },
			{ title: 'SHOW_MATCHING', desc: 'SHOW_MATCHING_DESC' }
		]
	},
	{
		id: GAME_MODE_STANDARD,
		features: [
			{ title: 'HINT' },
			{ title: 'UNDO' }
		]
	},
	{
		id: GAME_MODE_EXPERT,
		features: []
	}
];
export type GAME_MODE_ID = 'GAME_MODE_EASY' | 'GAME_MODE_STANDARD' | 'GAME_MODE_EXPERT' | 'GAME_MODE_CHALLENGE';
export const GAME_MODE_ID_DEFAULT: GAME_MODE_ID = 'GAME_MODE_STANDARD';

export const Themes: Array<{ id: string; name: string; colors: Array<string> }> = [
	{ id: 'ltgreen', name: 'THEME_SAGE', colors: ['#5a7b8b', '#446471', '#1e2d35', '#0f1e25', '#4686a5'] },
	{ id: 'dkgreen', name: 'THEME_FOREST', colors: ['#4d6673', '#2a3b46', '#405765', '#1e2e36', '#19262e'] },
	{ id: 'ltblue', name: 'THEME_SKY', colors: ['#7480b0', '#4b527c', '#2a2e4b', '#232742', '#34385a'] },
	{ id: 'ice', name: 'THEME_ICE', colors: ['#4f8fb6', '#9fd0e9', '#6aa7ca', '#8bc3dd', '#b3e5fc'] },
	{ id: 'dkblue', name: 'THEME_NAVY', colors: ['#2f49a3', '#0d2165', '#233694', '#2f44ad', '#001552'] },
	{ id: 'ocean', name: 'THEME_OCEAN', colors: ['#3b80ad', '#1d547a', '#31749f', '#134a6f', '#0a3d62'] },
	{ id: 'cyberpunk', name: 'THEME_CYBERPUNK', colors: ['#6a4a6a', '#3e193e', '#5e3a5e', '#6c496c', '#320032'] },
	{ id: 'desert', name: 'THEME_DESERT', colors: ['#a4863f', '#b8924d', '#a8843e', '#e3c68e', '#c9a961'] },
	{ id: 'brown', name: 'THEME_MAHOGANY', colors: ['#d15a5a', '#c34a4a', '#8c2323', '#7a1f1f', '#a52a2a'] },
	{ id: 'medieval', name: 'THEME_MEDIEVAL', colors: ['#8a623e', '#5a3b23', '#7b5534', '#2f1c10', '#3d2817'] },
	{ id: 'lava', name: 'THEME_LAVA', colors: ['#a85b56', '#7a332e', '#9a4f4a', '#46201c', '#5d1f1a'] },
	{ id: 'space', name: 'THEME_SPACE', colors: ['#435c7d', '#1f3046', '#38506d', '#162539', '#0d1b2a'] },
	{ id: 'black', name: 'THEME_ONYX', colors: ['#5c5c5c', '#2a2a2a', '#4a4a4a', '#5a5a5a', '#000000'] },
	{ id: 'white', name: 'THEME_PEARL', colors: ['#9e9e9e', '#d0d0d0', '#b5b5b5', '#a8a8a8', '#ffffff'] }
];

export const PATTERN_BACKGROUND = 'pattern-monster';

export type LICENCE = 'cca' | 'gpl' | 'free' | 'per' | 'pub' | 'mit';

export const Backgrounds: Array<{ img: string; name: string; type?: 'jpg' | 'png' | 'svg' | 'MAH'; repeat?: boolean; license?: LICENCE }> = [
	{ img: '', name: 'BACK_NONE' },
	{ img: 'bamboo', name: 'BACK_BAMBOO', license: 'cca' },
	{ img: 'blueclouds', name: 'BACK_BLUE_CLOUDS', license: 'cca' },
	{ img: 'grayclouds', name: 'BACK_GRAY_CLOUDS', license: 'cca' },
	{ img: 'grass-1', name: 'BACK_GRASS', license: 'free' },
	{ img: 'stones-1', name: 'BACK_STONES', license: 'free' },
	{ img: 'wood', name: 'BACK_WOOD', license: 'free' },
	{ img: 'wood-grain-1', name: 'BACK_WOOD_GRAIN', license: 'free' },
	{ img: 'space', name: 'BACK_SPACE', license: 'free' },
	{ img: PATTERN_BACKGROUND, name: 'BACK_PATTERNS', type: 'MAH', repeat: true, license: 'mit' }
];

export const Licenses: Record<string, string> = {
	cca: 'Creative Commons Attribution 4.0 International License',
	gpl: 'GNU General Public License 3',
	free: 'License free',
	per: 'Personal projects',
	pub: 'Public domain',
	mit: 'MIT License'
};

export const ImageSets: Array<{ id: string; type: 'SVG' | 'PNG'; name: string; license: LICENCE }> = [
	{ id: 'riichi', type: 'SVG', name: 'Riichi 2', license: 'cca' },
	{ id: 'picasso', type: 'PNG', name: 'Picasso', license: 'gpl' },
	{ id: 'modern', type: 'PNG', name: 'Modern', license: 'gpl' },
	{ id: 'animals', type: 'SVG', name: 'Animals', license: 'per' },
	{ id: 'birds', type: 'SVG', name: 'Birds', license: 'cca' },
	{ id: 'open-fruits', type: 'PNG', name: 'Fruits', license: 'free' },
	{ id: 'space', type: 'SVG', name: 'Space', license: 'cca' },
	{ id: 'riichi-old', type: 'SVG', name: 'Riichi', license: 'cca' },
	{ id: 'uni', type: 'SVG', name: 'Uni', license: 'pub' },
	{ id: 'cheshire137', type: 'SVG', name: 'Taksuyu', license: 'free' },
	{ id: 'unib', type: 'SVG', name: 'Black & White', license: 'pub' },
	{ id: 'recri2', type: 'SVG', name: 'Recri 2', license: 'free' },
	{ id: 'classic', type: 'PNG', name: 'Classic', license: 'gpl' }
];

export const ImageSetDefault = 'riichi';
export const ThemeDefault = 'ltgreen';
export const LangAuto = 'auto';
export const LangDefault = 'auto';

// the language a tile face is written in
export type TileLang = 'zu' | 'en';

export interface WordPair {
	id: string;
	zulu: string;
	english: string;
	category: string;
}

// zulu/english word pairs shown on the tiles - a tile showing the zulu word pairs with
// a tile showing the english word of the same entry
export const WORDS: Array<WordPair> = [
	{ id: 'sawubona', zulu: 'sawubona', english: 'hello', category: 'WORDS_CATEGORY_GREETINGS' },
	{ id: 'ubaba', zulu: 'ubaba', english: 'father', category: 'WORDS_CATEGORY_FAMILY' },
	{ id: 'umama', zulu: 'umama', english: 'mother', category: 'WORDS_CATEGORY_FAMILY' },
	{ id: 'umntwana', zulu: 'umntwana', english: 'child', category: 'WORDS_CATEGORY_FAMILY' },
	{ id: 'indoda', zulu: 'indoda', english: 'man', category: 'WORDS_CATEGORY_FAMILY' },
	{ id: 'umfazi', zulu: 'umfazi', english: 'woman', category: 'WORDS_CATEGORY_FAMILY' },
	{ id: 'umfana', zulu: 'umfana', english: 'boy', category: 'WORDS_CATEGORY_FAMILY' },
	{ id: 'intombazane', zulu: 'intombazane', english: 'girl', category: 'WORDS_CATEGORY_FAMILY' },
	{ id: 'umngani', zulu: 'umngani', english: 'friend', category: 'WORDS_CATEGORY_FAMILY' },
	{ id: 'indlu', zulu: 'indlu', english: 'house', category: 'WORDS_CATEGORY_HOUSE' },
	{ id: 'umnyango', zulu: 'umnyango', english: 'door', category: 'WORDS_CATEGORY_HOUSE' },
	{ id: 'itafula', zulu: 'itafula', english: 'table', category: 'WORDS_CATEGORY_HOUSE' },
	{ id: 'isitulo', zulu: 'isitulo', english: 'chair', category: 'WORDS_CATEGORY_HOUSE' },
	{ id: 'incwadi', zulu: 'incwadi', english: 'book', category: 'WORDS_CATEGORY_HOUSE' },
	{ id: 'inja', zulu: 'inja', english: 'dog', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'ikati', zulu: 'ikati', english: 'cat', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'inkomo', zulu: 'inkomo', english: 'cow', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'ihhashi', zulu: 'ihhashi', english: 'horse', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'inkukhu', zulu: 'inkukhu', english: 'chicken', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'inhlanzi', zulu: 'inhlanzi', english: 'fish', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'indlovu', zulu: 'indlovu', english: 'elephant', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'ibhubesi', zulu: 'ibhubesi', english: 'lion', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'ingwe', zulu: 'ingwe', english: 'leopard', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'imvubu', zulu: 'imvubu', english: 'hippo', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'ingwenya', zulu: 'ingwenya', english: 'crocodile', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'inyoni', zulu: 'inyoni', english: 'bird', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'umvundla', zulu: 'umvundla', english: 'rabbit', category: 'WORDS_CATEGORY_ANIMALS' },
	{ id: 'ilanga', zulu: 'ilanga', english: 'sun', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'inyanga', zulu: 'inyanga', english: 'moon', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'inkanyezi', zulu: 'inkanyezi', english: 'star', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'amanzi', zulu: 'amanzi', english: 'water', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'umlilo', zulu: 'umlilo', english: 'fire', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'imvula', zulu: 'imvula', english: 'rain', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'ifu', zulu: 'ifu', english: 'cloud', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'umoya', zulu: 'umoya', english: 'wind', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'intaba', zulu: 'intaba', english: 'mountain', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'ulwandle', zulu: 'ulwandle', english: 'sea', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'umuthi', zulu: 'umuthi', english: 'tree', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'ihlabathi', zulu: 'ihlabathi', english: 'sand', category: 'WORDS_CATEGORY_NATURE' },
	{ id: 'ukudla', zulu: 'ukudla', english: 'food', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'inyama', zulu: 'inyama', english: 'meat', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'isonka', zulu: 'isonka', english: 'bread', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'ubisi', zulu: 'ubisi', english: 'milk', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'amaqanda', zulu: 'amaqanda', english: 'eggs', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'uju', zulu: 'uju', english: 'honey', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'ushukela', zulu: 'ushukela', english: 'sugar', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'ummbila', zulu: 'ummbila', english: 'maize', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'ithanga', zulu: 'ithanga', english: 'pumpkin', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'ubhatata', zulu: 'ubhatata', english: 'sweet potato', category: 'WORDS_CATEGORY_FOOD' },
	{ id: 'ikhanda', zulu: 'ikhanda', english: 'head', category: 'WORDS_CATEGORY_BODY' },
	{ id: 'inhliziyo', zulu: 'inhliziyo', english: 'heart', category: 'WORDS_CATEGORY_BODY' },
	{ id: 'izandla', zulu: 'izandla', english: 'hands', category: 'WORDS_CATEGORY_BODY' },
	{ id: 'izinyo', zulu: 'izinyo', english: 'tooth', category: 'WORDS_CATEGORY_BODY' },
	{ id: 'usuku', zulu: 'usuku', english: 'day', category: 'WORDS_CATEGORY_TIME' },
	{ id: 'ubusuku', zulu: 'ubusuku', english: 'night', category: 'WORDS_CATEGORY_TIME' },
	{ id: 'isikhathi', zulu: 'isikhathi', english: 'time', category: 'WORDS_CATEGORY_TIME' },
	{ id: 'unyaka', zulu: 'unyaka', english: 'year', category: 'WORDS_CATEGORY_TIME' },
	{ id: 'iviki', zulu: 'iviki', english: 'week', category: 'WORDS_CATEGORY_TIME' },
	{ id: 'namhlanje', zulu: 'namhlanje', english: 'today', category: 'WORDS_CATEGORY_TIME' },
	{ id: 'kusasa', zulu: 'kusasa', english: 'tomorrow', category: 'WORDS_CATEGORY_TIME' },
	{ id: 'izolo', zulu: 'izolo', english: 'yesterday', category: 'WORDS_CATEGORY_TIME' },
	{ id: 'ukufunda', zulu: 'ukufunda', english: 'to learn', category: 'WORDS_CATEGORY_VERBS' },
	{ id: 'ukulala', zulu: 'ukulala', english: 'to sleep', category: 'WORDS_CATEGORY_VERBS' }
];

export interface WordFace {
	wordId: string;
	lang: TileLang;
	text: string;
}

// face id (e.g. w_inja_zu) -> the word and language shown on that face
export const WORD_FACES: Record<string, WordFace> = Object.fromEntries(
	WORDS.flatMap(word => (['zu', 'en'] as Array<TileLang>).map(lang => [
		`w_${word.id}_${lang}`,
		{ wordId: word.id, lang, text: lang === 'zu' ? word.zulu : word.english }
	]))
);

// word id -> the category the word belongs to (the purge challenge marks a whole category)
export const WORD_CATEGORIES: Record<string, string> = Object.fromEntries(
	WORDS.map(word => [word.id, word.category])
);

// one matching group per word: [zulu A, english A, zulu B, english B]
// v offsets 0 and 1 form pair instance A, offsets 2 and 3 form pair instance B -
// the builders pair v-adjacent tiles and the solver relies on this order (see pairInstanceId)
export const TILES: Array<[string, string, string, string]> = WORDS.map(word => [
	`w_${word.id}_zu`, `w_${word.id}_en`, `w_${word.id}_zu`, `w_${word.id}_en`
]);

export const TILES_EXT: Array<[string, string, string, string]> = [];

export const MAX_LAYOUT_TILES = (TILES.length + TILES_EXT.length) * 4;
export const MIN_LAYOUT_TILES = 2;

export function isPlayableTileCount(count: number): boolean {
	return count >= MIN_LAYOUT_TILES && count <= MAX_LAYOUT_TILES && count % 2 === 0;
}

export const TILES_INFOS = [
	{
		name: 'TILES_SUITS',
		groups: [
			{ name: 'TILES_SUIT_CIRCLES', tiles: ['t_do1', 't_do2', 't_do3', 't_do4', 't_do5', 't_do6', 't_do7', 't_do8', 't_do9'] },
			{ name: 'TILES_SUIT_BAMBOO', tiles: ['t_ba1', 't_ba2', 't_ba3', 't_ba4', 't_ba5', 't_ba6', 't_ba7', 't_ba8', 't_ba9'] },
			{ name: 'TILES_SUIT_CHARACTERS', tiles: ['t_ch1', 't_ch2', 't_ch3', 't_ch4', 't_ch5', 't_ch6', 't_ch7', 't_ch8', 't_ch9'] }
		]
	},
	{
		name: 'TILES_BONUS',
		groups: [
			{ name: 'TILES_BONUS_SEASONS', tiles: ['t_se_spring', 't_se_summer', 't_se_fall', 't_se_winter'] },
			{ name: 'TILES_BONUS_FLOWERS', tiles: ['t_fl_bamboo', 't_fl_orchid', 't_fl_plum', 't_fl_chrysanthemum'] }
		]
	},
	{
		name: 'TILES_HONORS',
		groups: [
			{ name: 'TILES_HONORS_WINDS', tiles: ['t_wi_east', 't_wi_south', 't_wi_west', 't_wi_north'] },
			{ name: 'TILES_HONORS_DRAGONS', tiles: ['t_dr_red', 't_dr_green', 't_dr_white'] }
		]
	},
	{
		name: 'TILES_JOKERS',
		groups: [
			{ name: 'TILES_JOKERS_GENERAL', tiles: ['t_g1', 't_g2', 't_g3'] },
			{ name: 'TILES_JOKERS_BLUEGREEN', tiles: ['t_g4', 't_g5', 't_g6', 't_g7', 't_g8'] },
			{ name: 'TILES_JOKERS_RED', tiles: ['t_g9', 't_g10', 't_g11', 't_g12', 't_g13'] },
			{ name: 'TILES_JOKERS_RANK', tiles: ['t_g14', 't_g15', 't_g16', 't_g17', 't_g18'] }
		]
	},
	{
		name: 'TILES_EXTRA',
		groups: [
			{ name: 'TILES_EXTRA', tiles: ['t_e1', 't_e2', 't_e3', 't_e4', 't_e5', 't_e6', 't_e7', 't_e8', 't_e9'] }
		]
	}
];
