import React, { ChangeEvent, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../../store";
import { GetListTrack } from "../../../store/Tracks/actions";
import { MetaData, Track } from "../../../store/Tracks/types";
import Pagination from "react-js-pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { history } from "../../../helpers";

export const ListTrack = (props: any) => {
    const limit = props.match.params.limit || 20;
    const page = props.match.params.page || 1;
    const tracks = useSelector<AppState>((state) => state.tracks.tracks) as Array<Track>;
    const metaData = useSelector<AppState>((state) => state.tracks.metaData) as MetaData;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetListTrack(limit, page));
    }, [dispatch, limit, page])

    const handlePageChange = (pageNumber: number) => {
        history.push(`/list-track/limit=${limit}&page=${pageNumber}`);
    }

    const selectHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        history.push(`/list-track/limit=${e.target.value}&page=${page}`);
    }
    
    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6 text-right mb-2">
                    <Link className="btn btn-success" to='/add-tracktype'>
                        <i className="fas fa-plus" />
                        &nbsp; Thêm mới bài hát
                    </Link>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách bài hát</h6>
                </div>
                <div className="card-body">
                    <div className="form-group row">
                        <div className="col-sm-12 col-md-6 pl-4">
                            <div className="dataTables_length row">
                                <label>Hiển thị:&nbsp;</label>
                                <select name="dataTable_length" className='rounded' aria-controls="dataTable" style={{width: '50px'}} onChange={selectHandleChange}>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={40} >40</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div id="dataTable_filter" style={{float: 'right'}}>
                                <label>Tìm kiếm:&nbsp;</label>
                                <input type="search" className='border' placeholder='Tên bài hát' aria-controls="dataTable" />

                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Mã bài hát</th>
                                    <th>Tên bài hát</th>
                                    <th>Mô tả</th>
                                    <th>Tổng số lượt nghe</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.trackname}</td>
                                            <td>{item.description}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                <Link className="btn btn-success mr-1" to={'/edit-tracktype/' + item._id.toString()}>
                                                    <i className="fas fa-edit" />
                                                    &nbsp; Cập nhật
                                                </Link>
                                                <button className="btn btn-danger ml-1 mr-1" >
                                                    <i className="far fa-trash-alt" />
                                                    &nbsp; Xóa
                                                </button>
                                                <button className='btn btn-primary ml-1'>
                                                    <i className="fas fa-play-circle" />
                                                    &nbsp; Nghe thử
                                                </button>
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
                        activePage={Number(page)}
                        itemsCountPerPage={Number(limit)}
                        totalItemsCount={metaData?.totalDocs || 0}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </Fragment>
    )
}
