import React from 'react';
import keyboradLayout from './keyboradLayout';

function MathField({ display, quill }) {
  const mathFieldRef = React.useRef();
  const handleShowKeyboard = () => window.mathVirtualKeyboard.show();
  const handleHideKeyboard = () => window.mathVirtualKeyboard.hide();
  const handleSaveFormula = (e) => {
    const latex = mathFieldRef.current.value;
    const { index, length } = quill.getSelection(true);
    quill.insertEmbed(index, 'formula', latex);
    quill.insertText(index + length + 1, ' ');
    quill.setSelection(index + length + 2);
  }

  React.useEffect(() => {
    if (mathFieldRef?.current) {
      const mathField = mathFieldRef.current;
      mathField.mathVirtualKeyboardPolicy = "manual";
      window.mathVirtualKeyboard.layouts = keyboradLayout;
      window.mathVirtualKeyboard.alphabeticLayout = "dvorak";
    }
  }, []);


  return (
    <div
      className="math-field-container"
      style={{
        display: display ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
      }}
    >
      <math-field
        style={{
          width: '70%'
          // direction: 'rtl',
          // textAlign: 'right',
          // unicodeBidi: 'plaintext'
        }}
        id="math-field"
        ref={mathFieldRef}
        onFocus={handleShowKeyboard}
        onBlur={handleHideKeyboard}
      />
      <button type='button' className="btn" id="save-formula" onClick={handleSaveFormula}>اضافة</button>
    </div>
  );
}

export default MathField;