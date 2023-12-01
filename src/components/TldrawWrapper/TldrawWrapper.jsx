import React from 'react';
import { Tldraw, findMenuItem, menuItem, useEditor } from '@tldraw/tldraw';
import './styles.css';
import '@tldraw/tldraw/tldraw.css';
import { useDispatch, useSelector } from 'react-redux';
import { openTldraw } from '../../Redux/features/tldraw/slice';

function TldrawWrapper() {
  const editor = useEditor();
  const editorRef = React.useRef();
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.tldraw.isOpen);
  // eslint-disable-next-line no-unused-vars
  const selectAll = () => editor.selectAll();
  const hideEditor = () => {
    dispatch(openTldraw(false))
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000000000, display: isOpen ? 'block' : 'none' }} id='#drawer' ref={editorRef}>
      <Tldraw overrides={{
        actions(editor, actions) {
          // Create a new action or replace an existing one
          actions['back-to-page'] = {
            id: 'back-to-page',
            label: 'الرجوع للصفحة',
            readonlyOk: true,
            kbd: '$o',
            onSelect(source) {
              hideEditor()
            },
          }

          actions['add-image-to-editor'] = {
            id: 'add-image-to-editor',
            label: 'اضافة الصورة للنص',
            readonlyOk: true,
            kbd: '$1',
            onSelect(source) {
              window.alert('My new action just happened!')
            },
          }

          actions['export-data'] = {
            id: 'export-data',
            label: 'تصدير الملف',
            readonlyOk: true,
            kbd: '$2',
            onSelect(source) {
              window.alert('My new action just happened!')
            },
          }
          return actions
        },
        contextMenu(editor, schema, { actions }) {
          // const viewMenu = findMenuItem(schema, ['shortcuts-dialog.edit'])
          const newMenuItem = menuItem(actions['back-to-page'])
          // viewMenu.children.unshift(newMenuItem)
          schema.unshift(newMenuItem)

          return schema;
        },
        menu(editor, menu, { actions }) {
          // using the findMenuItem helper
          const fileMenu = findMenuItem(menu, ['menu', 'file']);

          if (fileMenu.type === 'submenu') {
            // add the new item to the file menu's children
            const newMenuItem = menuItem(actions['add-image-to-editor'])
            const newMenuItem1 = menuItem(actions['export-data'])
            fileMenu.children.unshift(newMenuItem, newMenuItem1)
          }
          return menu
        },
      }} />
    </div>
  );
}

export default TldrawWrapper;
