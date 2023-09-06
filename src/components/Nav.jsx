import React from 'react';
import { Link } from 'react-router-dom';

function Icon(props) {
  return props.to
    ?
    <>
      <Link className="icon-holder link" id={(props.id ? props.id : "menu")} to={props.to}>
        <i className={props.icon.match(/\s/) ? props.icon : 'fas fa-' + props.icon}></i>
      </Link>
    </>
    :
    <>
      <div className="icon-holder" id={(props.id ? props.id : "menu")} onClick={props.onClick}>
        <i className={props.icon.match(/\s/) ? props.icon : 'fas fa-' + props.icon}></i>
      </div>
    </>
}

function Nav(props) {
  return (
    <nav>
      <div className="icons-container">
        <Icon icon="file-powerpoint" id="edit" to="/powerpoint" />
        <Icon icon="user" id="admin-login" onClick={() => alert("سيتم تفعيله...")} />
        <Icon icon="edit" id="edit" onClick={() => alert("سيتم تفعيله...")} />
      </div>
      <h1 className="header-title">
        تحضير بلس+
      </h1>
    </nav>
  );
}

export default Nav;