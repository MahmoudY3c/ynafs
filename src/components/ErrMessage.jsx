import React from 'react';
import { Link } from 'react-router-dom';

function ErrMessage(props) {
  return (
    <div className='err-message-container'>
      <div className='err-message'>
        برجاء الانتظار حتى يتم الانتهاء من تحميل البيانات
      </div>
      
      <Link type="submit" className="submit-btn btn" to={props.path || "/"} style={{
        fontSize: "20px",
        width: '125px'
      }}>اضغط للرجوع</Link>
    </div>
  );
}

export default ErrMessage;