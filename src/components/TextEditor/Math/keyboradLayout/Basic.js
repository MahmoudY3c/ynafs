const basicKeyboard = 
{
  label: 'Basic',
  rows: [
    [
      '[7]', '[8]', '[9]', '[+]', { label: '[separator]', width: 0.5 },
      { class: 'small', latex: '\\frac{#@}{#0}' },
      '\\varnothing', '\\infty', '\\in', '\\notin',
      // '[separator]',
      
      '^\\placeholder{}\\sqrt{\\placeholder{}}'
    ],
    [
      '[4]', '[5]', '[6]', '[-]', { label: '[separator]', width: 0.5 },
      '[(]', '[)]', '\\lt', '\\le', '\\hat{=}',
      
      '\\sqrt{\\placeholder{}}',
      // , '[separator]',
    ],
    [
      '[1]', '[2]', '[3]', '[/]', { label: '[separator]', width: 0.5 },
      '[', ']', '\\gt', '\\ge',

      { label: '[backspace]', width: 2 },
    ],
    [
      '[0]', '[.]', '\\colon', '\\times', { label: '[separator]', width: 0.5 },
      '\\lbrace', '\\rbrace', '=', '\\ne', '[left]', '[right]',
    ],
  ],
}

export default basicKeyboard;

