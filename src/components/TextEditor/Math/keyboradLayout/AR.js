

// const arLetters = ["ؠ", "ء", "آ", "أ", "ؤ", "إ", "ئ", "ا", "ب", "ة", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ػ", "ؼ", "ؽ", "ؾ", "ؿ", "ـ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ى"];
const arLetters = [
  "أ", "ب", "ة", "ت", "ث", "ج", "ح", "خ",
  "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض",
  "ط", "ظ", "ع", "غ", "ؿ", "ـ", "ف", "ق",
  "ك", "ل", "م", "ن", "ه", "و", "ى",
  "ء", "آ", "ػ", "ؼ", "ؽ", "ؠ", "ؾ", "ؿ",
];

const arNumbers = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '۰'];


const keyboardItems = [
  [
    ...arNumbers.slice(0, 3),
    '[/]', { label: '[separator]', width: 0.5 },
    '[', ']', '\\gt', '\\ge',
    ...arLetters.slice(0, 6).reverse(),
    { label: '[backspace]', width: 2 },
  ],
  [
    ...arNumbers.slice(3, 6),
    '[-]', { label: '[separator]', width: 0.5 },
    '[(]', '[)]', '\\lt', '\\le', '\\hat{=}',
    ...arLetters.slice(6, 13).reverse(),
  ],
  [
    ...arNumbers.slice(6, 9),
    '[+]', { label: '[separator]', width: 0.5 },
    { class: 'small', latex: '\\frac{#@}{#0}' },
    '\\varnothing', '\\infty', '\\in', '\\notin',
    // '[separator]',
    ...arLetters.slice(13, 20).reverse(),
  ],
  [
    arNumbers[arNumbers.length - 1], '[.]', '\\colon', '\\times',
    { label: '[separator]', width: 0.5 },
    '\\lbrace', '\\rbrace', '=', '\\ne',
    ...arLetters.slice(20, 28).reverse(),
  ],
  [
    ...arLetters.slice(28, (arLetters.length - 1)).reverse(),
    '[left]', '[right]',
  ],
]


const arKeyboard =
{
  label: 'arabic',
  rows: [
    ...keyboardItems
  ],
};

export default arKeyboard;

