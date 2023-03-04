import React from 'react';

function Icon(props) {
  return (
    <div className="icon-holder" id={(props.id ? props.id : "menu")}>
      <i className={props.icon.match(/\s/) ? props.icon : 'fas fa-'+props.icon}></i>
    </div>
  )
}
function Nav(props) {
  return (
    <nav>
      {/* <div className="icons-container">
        <Icon icon="bars" />
        <Icon icon="user" id="admin-login"/>
        <Icon icon="edit" id="edit"/>
      </div> */}
      <h1 className="header-title">
        تحضير بلس+
      </h1>
    </nav>
  );
}

export default Nav;