import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../../store";
import { GetMyProfile } from "../../../store/Account/actions";
import { AuthenticatedUser } from "../../../store/Account/types";

const ViewProfile = () => {
    const user = useSelector<AppState>((state) => state.account.user) as AuthenticatedUser;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetMyProfile());
    }, [dispatch]);

    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="col-lg-12">
                            <div className="p-4">
                                <div className="text-center">
                                    <img className="img-profile rounded-circle" src={user?.avatar} alt="undraw_profile" />
                                    <h1 className="h2 text-gray-900 mb-2">{user?.lastname + ' ' + user?.firstname}</h1>
                                    <h5 className="h5 text-gray-900 mb-2">{user?.birthday}</h5>
                                    <h5 className="h5 text-gray-900 mb-2">{user?.gender}</h5>
                                </div>
                                <div className="form-group row justify-content-center">
                                    <Link className='btn btn-success mr-1' to='/update-profile'>
                                        Cập nhật thông tin
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewProfile;