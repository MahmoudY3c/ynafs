const tldrawOverrides = {
  menu(editor, menu, { actions }) {
    // using the findMenuItem helper
    const fileMenu = menu.find(e => e.id === 'menu');
    const fileMenuIndex = menu.indexOf(fileMenu)
    // console.log(fileMenu);
    
    if (fileMenu) {

    }

    return menu
  }
}

export default tldrawOverrides;
