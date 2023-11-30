import React from 'react';
import 'quill/dist/quill.snow.css';
import ToolBar from './ToolBar.jsx';
import Quill from "quill";
import MathField from './Math/MathField.jsx';
import { handleEditorState } from '../../handlers/textEditor.js';
import TldrawWrapper from '../TldrawWrapper/TldrawWrapper.jsx';
import { latexToSvg, renderByMathJax, renderByMathLive } from '../../handlers/handlers.js';

const options = {
  // debug: 'info',
  // placeholder: 'اكتب هنا ..............',
  theme: 'snow',
  modules: {
    toolbar: {
      container: '#toolbar',  // Selector for toolbar container
      handlers: {
        // image(node, value) {
        //   console.log(node, value);
        //   return node;
        // },
      }
    },
  }
};

function TextEditor({ id, onChange, toolbar }) {
  const quillRef = React.useRef();
  const [displayEditor, setDisplayEditor] = React.useState('none');
  const [displayMathField, setDisplayMathField] = React.useState(false);
  const [quill, setQuill] = React.useState(null);



  React.useEffect(() => {
    if (quillRef?.current && !quill?.isSet) {
      options.modules.toolbar.container = '#toolbar-' + (id || 'editor')
      const _quill = new Quill(`#${id || 'editor'}`, options);
      // define the math renderer by using custom render function instead of adding katex library who is required for quilljs to handle formula {replace katex.render with MathLive render methods}
      if (!window.katex) {
        window.katex = {
          render: renderByMathJax,
        }
      }

      setQuill(_quill);

      // handle save / restore quill user inputs history from localStorage
      const handleBeforeUnload = handleEditorState(_quill);
      const quillContents = _quill.getContents()?.ops;

      // update the field value
      if (onChange && !(quillContents?.length === 1 && quillContents?.[0]?.insert === '\n')) {
        onChange(quillContents);
      }

      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TldrawWrapper display={displayEditor} setDisplay={setDisplayEditor} />
      <MathField display={displayMathField} quill={quill} />
      <ToolBar
        displayDrawer={displayEditor}
        setDisplayDrawer={setDisplayEditor}
        displayMath={displayMathField}
        setDisplayMath={setDisplayMathField}
        id={'toolbar-' + (id || 'editor')}
        options={toolbar}
      />
      {/** passing quill.getContents value as the event when keyup to the Form.Item to make it his value */}
      <div
        id={id || "editor"}
        ref={quillRef}
        style={{ position: 'relative', direction: 'inherit !important' }}
        onKeyUp={(ev) => onChange(quill.getContents()?.ops)}
      />
    </div>
  )
}

export const handleGetQuillValue = (ev, quill) => {
  let value = ev.constructor === Array
    ? ev
    : quill
      ? quill?.getContents()?.ops
      : null;

  if (value?.length === 1 && value?.[0]?.insert === '\n') {
    value = null;
  }

  // console.log(value, ev);
  return value;
}


export default TextEditor;

