import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../../store";

const LefMenu = (props: any) => {
    const [account] = useState(useSelector((state: AppState) => state.account));
    return (
        <ul className={"navbar-nav bg-gradient-primary fixed-top sidebar sidebar-dark accordion" + (props.toggled ? ' toggled' : '')} id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">MUSIC DISCOVER</div>
            </Link>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Quản trị hệ thống
            </div>
            <li className="nav-item">
                <Link className="nav-link" to='/'>
                    <i className="fas fa-users" />
                    <span>Người dùng</span>
                </Link>
            </li>
            {account.role === 'Administrator' ?
                <li className="nav-item">
                    <Link className="nav-link" to='/moderator'>
                        <i className="fas fa-users" />
                        <span>Người kiểm duyệt</span>
                    </Link>
                </li> : null
            }
            <li className="nav-item">
                <Link className="nav-link" to='/singer'>
                    <i className="fas fa-users" />
                    <span>Ca sĩ</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/track-types'>
                    <i className="fas fa-fw fa-table" />
                    <span>Thể loại nhạc</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/list-track/limit=20&page=1'>
                    <i className="fab fa-typo3" />
                    <span>Bài hát</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/list-album'>
                    <i className="fab fa-jedi-order" />
                    <span>Album</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/top-track'>
                    <i className="fas fa-compact-disc" />
                    <span>Bảng xếp hạng bài hát</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/list-album'>
                    <i className="fas fa-comments" />
                    <span>Bảng xếp hạng ca sĩ</span>
                </Link>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
            <div className="text-center d-none d-md-inline" onClick={() => props.setToggled(!props.toggled)}>
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
        </ul>
    )
}


export default LefMenu;