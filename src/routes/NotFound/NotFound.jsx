import React from 'react';
import "./404.css"
import spaceMan from "./space.svg"
function NotFound(props) {
  return (
    <>
      <header style={styles.header}>
        <div className="message" style={styles.message}>
          <strong style={{ fontSize: "10rem" }}>404</strong>
          <p className="title" style={styles.title}>LOOKS LIKE YOU ARE LOST IN THE SPACE</p>
          <p className="message-text" style={styles.messageText}>The page you are looking for might be removed or temporally unavailable</p>
        </div>
      </header>
      <div className="box-astronaut">
        <img src={spaceMan} alt="" />
      </div>
    </>
  );
}

const styles = {
  header: {
    height: "100vh",
    display: "flex",
    padding: "0",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right bottom, rgb(182,244,146), #4b32a7) no-repeat ",
    backgroundSize: "cover",
    color: "#fff",
    fontFamily: "Space Mono, monospace",
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    letterSpacing: "1px",
    zIndex: "2",
  },
  title: {
    fontWeight: "500",
    textAlign: "center",
    margin: "0",
    fontSize: "1.5rem",
    color: "#ffcb39",
  },
  messageText: {
    fontWeight: "500",
    textAlign: "center",
    margin: "0",
    maxWidth: "500px",
    marginBottom: "4rem",
  }
}

export default NotFound;