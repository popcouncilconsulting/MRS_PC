import React from 'react'
import { Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';

const topbarButtons = (
  <div>
    <span>
        <Link to="/login">
          <FlatButton label="Login" style={{color: '#fff'}} />
        </Link>
    </span>

    <span>
        <Link to="/">
          <FlatButton label="Home" style={{color: '#fff'}} />
        </Link>
    </span>

  </div>
);

export default topbarButtons
