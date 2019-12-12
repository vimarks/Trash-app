import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom'





class Nav extends React.Component {
    render() {
        return(
          <nav>
            <h3>Trash-App</h3>
            <ul className="nav-links">
              <Link to="/clean" >
                <li>Clean</li>
              </Link>
              <Link to="/report" >
                <li>Report</li>
              </Link>
            </ul>
          </nav>

        )
  }
}

export default Nav
