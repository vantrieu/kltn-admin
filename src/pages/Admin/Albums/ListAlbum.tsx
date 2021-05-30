import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../../store';
import { GetListAlbum } from '../../../store/Albums/actions';
import { Album, MetaData } from '../../../store/Albums/types';
import Pagination from "react-js-pagination";
import moment from 'moment';

const ListAlbum = () => {
    const albums = useSelector<AppState>((state) => state.albums.albums) as Array<Album>;
    const metaData = useSelector<AppState>((state) => state.albums.metaData) as MetaData;
    const [keyWord, setKeyWord] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetListAlbum(20, page, keyWord));
    }, [dispatch, keyWord, page])

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyWord(value);
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6 text-right mb-2">
                    <Link className="btn btn-success" to='/create-album'>
                        <i className="fas fa-plus" />
                        &nbsp; Tạo mới album
                    </Link>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách playlist</h6>
                </div>
                <div className="card-body">
                <div className="form-group row">
                        <div className="col-sm-12 col-md-6 pl-4">
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div id="dataTable_filter" style={{ float: 'right' }}>
                                <label>Tìm kiếm:&nbsp;</label>
                                <input type="search" className='border' placeholder='Tên bài hát' aria-controls="dataTable" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Tên album</th>
                                    <th>Mô tả</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {albums?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.albumname}</td>
                                            <td>{item.description}</td>
                                            <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                            <td>{moment(item.updatedAt).format('DD/MM/YYYY')}</td>
                                            <td>
                                                <button className="btn btn-danger ml-1 mr-1" >
                                                    <i className="far fa-trash-alt" />
                                                    &nbsp; Xóa
                                                </button>
                                                <Link className='btn btn-primary ml-1' to={`/edit-playlist/${item._id}`}>
                                                    <i className="fas fa-play-circle" />
                                                    &nbsp; Chỉnh sửa
                                                </Link>
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

export default ListAlbum;