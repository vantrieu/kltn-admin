import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../../store";
import { logout } from "../../../store/Account/actions";
import { AuthenticatedUser } from "../../../store/Account/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotifyState } from "../../../store/Notify/types";

const TopNavbar = () => {
    const user = useSelector<AppState>((state) => state.account.user) as AuthenticatedUser;
    const nofify = useSelector<AppState>((state) => state.notify) as NotifyState;
    const [isShowProfilemenuDropdown, setIsShowProfilemenuDropdown] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        toast(nofify.message);
    }, [nofify.message])
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <ul className="navbar-nav ml-auto">
                    {/* Nav Item - User Information */}
                    <li className={"nav-item dropdown no-arrow" + (isShowProfilemenuDropdown ? ' show' : '')}>
                        <label className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded={isShowProfilemenuDropdown ? 'true' : 'false'} onClick={() => setIsShowProfilemenuDropdown(!isShowProfilemenuDropdown)}>
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.lastname + ' ' + user?.firstname}</span>
                            <img className="img-profile rounded-circle" src={process.env.REACT_APP_API_URL + user?.avatar} alt="undraw_profile" />
                        </label>
                        {/* Dropdown - User Information */}
                        <div className={"dropdown-menu dropdown-menu-right shadow animated--grow-in" + (isShowProfilemenuDropdown ? ' show' : '')} aria-labelledby="userDropdown">
                            <Link className="dropdown-item" to='/my-profile'  onClick={() => setIsShowProfilemenuDropdown(!isShowProfilemenuDropdown)}>
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                                    Thông tin cá nhân
                            </Link>
                            <div className="dropdown-divider" />
                            <label className="dropdown-item" onClick={() => dispatch(logout())}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                Đăng xuất
                            </label>
                        </div>
                    </li>
                </ul>
            </nav>
            <ToastContainer />
        </div>
    )
}

export default TopNavbar;