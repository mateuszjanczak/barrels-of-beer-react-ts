import React from "react";
import {NavLink} from "react-router-dom";
import {routes} from "../routes/Routes";

const Navbar = () => (
    <div>
        <ul>
            <li>
                <NavLink to={routes.taps}>Taps</NavLink>
            </li>

            <li>
                <NavLink to={routes.events}>Events</NavLink>
            </li>
        </ul>
    </div>
);

export default Navbar;