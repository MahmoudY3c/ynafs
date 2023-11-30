import React from 'react';

const handleBtnClicked = (ev, state, setState) => {
  if (setState) {
    if (state) {
      setState(false)
    } else {
      setState(true)
    }
  }
};

function ToolBar({ displayDrawer, setDisplayDrawer, displayMath, setDisplayMath, id, options }) {
  const alignRightRef = React.useRef();
  const directionRef = React.useRef();
  React.useEffect(() => {
    console.log(directionRef);
    if (alignRightRef?.current) {
      alignRightRef.current.click();
      directionRef.current.click();
    }
  }, []);

  return (
    <div id={id}>
      <select className="ql-size">
        <option value="small"></option>
        <option value=""></option>
        <option value="large" defaultValue={true}></option>
        <option value="huge"></option>
      </select>
      <button type="button" className="ql-bold"></button>
      <button type="button" className="ql-italic"></button>
      <button type="button" className="ql-underline"></button>
      <button type="button" className="ql-strike"></button>
      <button type="button" className="ql-align" value=""></button>
      <button type="button" className="ql-align" value="center"></button>
      <button type="button" className="ql-align" value="right" ref={alignRightRef}></button>

      {/* <select className="ql-align">
        <option value=""></option>
        <option value="center"></option>
        <option value="right" defaultValue={true}></option>
      </select> */}
      <button type="button" className="ql-direction" value="rtl" ref={directionRef}></button>
      <button type="button" className="ql-script" value="sub"></button>
      <button type="button" className="ql-script" value="super"></button>
      <button type="button" className="ql-header" value="1"></button>
      <button type="button" className="ql-header" value="2"></button>
      <select className="ql-header">
        <option value=""></option>
        <option value="6"></option>
        <option value="5"></option>
        <option value="4"></option>
        <option value="3"></option>
        <option value="2"></option>
        <option value="1"></option>
      </select>
      <button type="button" className="ql-blockquote" value=""></button>
      <button type="button" className="ql-list" value="ordered"></button>
      <button type="button" className="ql-list" value="bullet"></button>
      <button type="button" className="ql-color"></button>
      <button type="button" className="ql-background"></button>
      <button type="button" className="ql-image"></button>
      <button type="button" className="btn-math" title="math formula" onClick={ev => handleBtnClicked(ev, displayMath, setDisplayMath)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="ql-fill bold-shapes"
            d="M12.42,5.29C11.32,5.19 10.35,6 10.25,7.11L10,10H12.82V12H9.82L9.38,17.07C9.18,19.27 7.24,20.9 5.04,20.7C3.79,20.59 2.66,19.9 2,18.83L3.5,17.33C3.83,18.38 4.96,18.97 6,18.63C6.78,18.39 7.33,17.7 7.4,16.89L7.82,12H4.82V10H8L8.27,6.93C8.46,4.73 10.39,3.1 12.6,3.28C13.86,3.39 15,4.09 15.66,5.17L14.16,6.67C13.91,5.9 13.23,5.36 12.42,5.29M22,13.65L20.59,12.24L17.76,15.07L14.93,12.24L13.5,13.65L16.35,16.5L13.5,19.31L14.93,20.72L17.76,17.89L20.59,20.72L22,19.31L19.17,16.5L22,13.65Z" />
        </svg>
      </button>
      <button type="button" className="btn-draw" title="draw shapes" onClick={ev => handleBtnClicked(ev, displayDrawer, setDisplayDrawer)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="ql-fill bold-shapes"
            d="M2,2H11V11H2V2M17.5,2C20,2 22,4 22,6.5C22,9 20,11 17.5,11C15,11 13,9 13,6.5C13,4 15,2 17.5,2M6.5,14L11,22H2L6.5,14M19,17H22V19H19V22H17V19H14V17H17V14H19V17Z" />
        </svg>
      </button>
    </div>
  );
}

export default ToolBar;