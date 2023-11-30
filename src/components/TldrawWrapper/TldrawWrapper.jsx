import React from 'react';
import { Tldraw, useEditor } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import tldrawOverrides from './tldrawOverrides';
import './styles.css';

function TldrawWrapper({ setDisplay, display }) {
  // eslint-disable-next-line no-unused-vars
  const editor = useEditor();
  const editorRef = React.useRef();
  const hideEditor = () => {
    setDisplay('none')
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000000000, display }} id='#drawer' ref={editorRef}>
      <div className='tldraw-nav'>
        <div className='tldraw-nav-container'>
          <div className='tldraw-nav-btn' onClick={hideEditor}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>back</title>
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" className='tldraw-nav-btn-shape' />
            </svg>
          </div>
        </div>
      </div>
      <Tldraw overrides={tldrawOverrides} />
    </div>
  );
}

export default TldrawWrapper;
