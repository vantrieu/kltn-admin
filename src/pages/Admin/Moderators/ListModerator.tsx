/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../../store";
import Pagination from "react-js-pagination";
import { ShowNotify } from '../../../store/Notify/actions';
import { MetaData } from "../../../store/Users/types";
import { Moderator } from "../../../store/Moderators/types";
import { GetListModerator, LockModerator, UnLockModerator } from "../../../store/Moderators/actions";

export const ListModerator = () => {
    const moderators = useSelector<AppState>((state) => state.moderators.moderators) as Array<Moderator>;
    const metaData = useSelector<AppState>((state) => state.moderators.metaData) as MetaData;
    const [keyWord, setKeyWord] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const [index, setIndex] = useState<number>(0);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetListModerator(page, keyWord));
    }, [dispatch, keyWord, page])

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyWord(value);
    };

    const unLock = (moderator: Moderator) => {
        dispatch(UnLockModerator(moderator._id));
        dispatch(ShowNotify(`Đã mở khóa tài khoản: ${moderator.username}`));
    }

    const lock = (moderator: Moderator) => {
        dispatch(LockModerator(moderator._id));
        dispatch(ShowNotify(`Đã khóa tài khoản: ${moderator.username}`));
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6 text-right mb-2">
                    <Link className="btn btn-success" to='/create-moderator'>
                        <i className="fas fa-plus" />
                        &nbsp; Tạo mới người kiểm duyệt
                    </Link>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách người kiểm duyệt</h6>
                </div>
                <div className="card-body">
                    <div className="form-group row">
                        <div className="col-sm-12 col-md-6 pl-4">
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div id="dataTable_filter" style={{ float: 'right' }}>
                                <label>Tìm kiếm:&nbsp;</label>
                                <input type="search" className='border' placeholder='tên người kiểm duyệt' aria-controls="dataTable" onChange={handleChange} />
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
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {moderators?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + (metaData?.page - 1) * metaData?.limit + 1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>{item.createdAt}</td>
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
