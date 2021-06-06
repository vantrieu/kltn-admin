/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import Pagination from "react-js-pagination";
import moment from "moment";
import { ShowNotify } from '../../../store/Notify/actions';
import { GetListUser, LockUser, UnLockUser } from "../../../store/Users/actions";
import { MetaData, User } from "../../../store/Users/types";

export const ListUser = () => {
    const users = useSelector<AppState>((state) => state.users.users) as Array<User>;
    const metaData = useSelector<AppState>((state) => state.users.metaData) as MetaData;
    const [keyWord, setKeyWord] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const [index, setIndex] = useState<number>(0);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetListUser(page, keyWord));
    }, [dispatch, keyWord, page])

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyWord(value);
    };

    const unLock = (user: User) => {
        dispatch(UnLockUser(user._id));
        dispatch(ShowNotify(`Đã mở khóa tài khoản: ${user.username}`));
    }

    const lock = (user: User) => {
        dispatch(LockUser(user._id));
        dispatch(ShowNotify(`Đã khóa tài khoản: ${user.username}`));
    }

    return (
        <Fragment>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách người dùng</h6>
                </div>
                <div className="card-body">
                    <div className="form-group row">
                        <div className="col-sm-12 col-md-6 pl-4">
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div id="dataTable_filter" style={{ float: 'right' }}>
                                <label>Tìm kiếm:&nbsp;</label>
                                <input type="search" className='border' placeholder='tên người dùng' aria-controls="dataTable" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên đăng nhập</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Ngày tạo</th>
                                    <th>Tình trạng tài khoản</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + (metaData.page - 1) * metaData.limit + 1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                                            <td>
                                                {
                                                    (item.islock === 1) ?
                                                        <button className="btn btn-danger" onClick={() => unLock(item)}>
                                                            <i className="fas fa-lock" />
                                                            &nbsp; Mở khóa
                                                        </button> :
                                                        <button className="btn btn-success" onClick={() => lock(item)}>
                                                            <i className="fas fa-lock-open" />
                                                            &nbsp; Khóa
                                                        </button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={metaData?.page}
                        itemsCountPerPage={metaData?.limit}
                        totalItemsCount={metaData?.totalDocs | 0}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </Fragment>
    )
}