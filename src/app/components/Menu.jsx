import React from 'react';

const Menu = ({logOutClick}) => (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
            </button>
                <a className="navbar-brand" href="#">Edorator</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/login" onClick={(e) => logOutClick(e)}>Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
);

export default Menu;