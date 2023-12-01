import React from 'react';
import 'quill/dist/quill.snow.css';
import ToolBar from './ToolBar.jsx';
import Quill from "quill";
import MathField from './Math/MathField.jsx';
import { handleEditorState } from '../../handlers/textEditor.js';
// import TldrawWrapper from '../TldrawWrapper/TldrawWrapper.jsx';
import { renderByMathJax } from '../../handlers/handlers.js';
import { useDispatch, useSelector } from 'react-redux';
import { openTldraw } from '../../Redux/features/tldraw/slice.js';

const handleBtnClicked = (state, setState) => {
  if (state) {
    setState(false);
  } else {
    setState(true);
  }
};

const changeDirectionToRight = (container) => {
  const ltr = document.querySelector(container).querySelector('.ql-align[value=""]');
  const rtl = document.querySelector(container).querySelector('.ql-align[value="right"]');
  const rd = document.querySelector(container).querySelector('.ql-direction[value="rtl"]');
  if (ltr.classList.contains('ql-active')) {
    rtl && rtl.click();
    rd && rd.click();
  }
}

const changeDirectionToLeft = (container) => {
  const rtl = document.querySelector(container).querySelector('.ql-align[value="right"]');
  const ltr = document.querySelector(container).querySelector('.ql-align[value=""]');
  const ld = document.querySelector(container).querySelector('.ql-direction[value="rtl"]');
  if (rtl.classList.contains('ql-active')) {
    ltr && ltr.click();
    ld && ld.click();
  }
}


const options = {
  // debug: 'info',
  // placeholder: 'اكتب هنا ..............',
  theme: 'snow',
  modules: {
    toolbar: {
      container: '#toolbar',  // Selector for toolbar container
      handlers: {
        // a real dom event handlers by addEventListener
        math() {
          const toolbar = this;
          console.log(toolbar);
          console.log('math clicked')
        },
        draw() {
          console.log('draw clicked')
        },
        ar() {
          const toolbar = this;
          const container = toolbar.options.container;
          console.log(toolbar);
          changeDirectionToRight(container);
        },
        en() {
          const toolbar = this;
          const container = toolbar.options.container;
          console.log(toolbar);
          changeDirectionToLeft(container);
        },
      }
    },
  }
};

function TextEditor({ id, onChange }) {
  const quillRef = React.useRef();

  const dispatch = useDispatch();
  const isTldrawOpen = useSelector(state => state.tldraw.isOpen);
  // const [displayEditor, setDisplayEditor] = React.useState('none');
  const [displayMathField, setDisplayMathField] = React.useState(false);
  const [quill, setQuill] = React.useState(null);


  React.useEffect(() => {
    if (!quillRef?.current?.__quill && !quill) {
      // change the toolbar container id to use it in different places
      options.modules.toolbar.container = '#toolbar-' + (id || 'editor');
      // change the editor id to use it in different places
      const _quill = new Quill(`#${id || 'editor'}`, options);

      // setting right direction automatically while initialize
      // _quill.format('align', 'right');
      // _quill.format('direction', 'rtl');

      // define the math renderer by using custom render function instead of adding katex library who is required for quilljs to handle formula {replace katex.render with MathLive render methods}
      if (!window.katex) {
        window.katex = {
          render: renderByMathJax,
        }
      }

      setQuill(_quill);

      // handle save / restore quill user inputs history from localStorage
      const handleBeforeUnload = handleEditorState(_quill, id || 'editor');
      const quillContents = _quill.getContents()?.ops;

      // update the editor form field value
      if (onChange && !(quillContents?.length === 1 && quillContents?.[0]?.insert === '\n')) {
        onChange(quillContents);
      }

      //event handler to save previous user inputs before reload or leave the page
      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => {
        // cleanup
        window.removeEventListener('beforeunload', handleBeforeUnload);
        // clearTimeout(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <TldrawWrapper display={displayEditor} setDisplay={setDisplayEditor} /> */}
      <MathField display={displayMathField} quill={quill} />
      <ToolBar
        id={'toolbar-' + (id || 'editor')}
        onMathClick={ev => handleBtnClicked(displayMathField, setDisplayMathField)}
        onDrawClick={ev => handleBtnClicked(isTldrawOpen, state => dispatch(openTldraw(state)))}
      // options={toolbar}
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

// a handler to handle pass the quill contents to the form field as a value
export const handleGetQuillValue = (ev, quill) => {
  // check if the passed value is quill array of contents or a onKeyup event object and if it's not quill contents array use quill parama to get quill contents
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

