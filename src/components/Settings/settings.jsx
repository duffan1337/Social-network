import React from 'react';
import s from './settings.module.css';
import {NavLink} from "react-router-dom";

const Settings = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/ps" activeClassName={s.activeLink}>Profile settings</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/ms" activeClassName={s.activeLink}>message settings</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/ps" activeClassName={s.activeLink}>Private settings</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/bl" activeClassName={s.activeLink}>Black list</NavLink>
            </div>
        </nav>
    )
}

export default Settings;