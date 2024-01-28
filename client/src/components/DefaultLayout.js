import React from "react";
// import { Menu, Dropdown, Button, Space , Row , Col } from "antd";
// import {Link} from 'react-router-dom'

function DefaultLayout(props) {
    
  return (
    <div>
      <div className="header bs1">
        <div className="d-flex justify-content-between">
             <h1>RentalRevolve</h1>
        </div>
           
        
      </div>
      <div className="content">{props.children}</div>

      
      </div>
    
  );
}

export default DefaultLayout;