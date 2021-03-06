/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../../store";
import { MetaData } from "../../../store/Tracks/types";
import Pagination from "react-js-pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { DeletePlaylist, GetListPlaylist } from "../../../store/Playlist/actions";
import { Playlist } from "../../../store/Playlist/types";
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ShowNotify } from '../../../store/Notify/actions';

const Playlists = (props: any) => {
    const playlists = useSelector<AppState>((state) => state.playlists.playlists) as Array<Playlist>;
    const metaData = useSelector<AppState>((state) => state.playlists.metaData) as MetaData;
    const [keyWord, setKeyWord] = useState<String>('');
    const [page, setPage] = useState<number>(1);

    const [index, setIndex] = useState<number>(0);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetListPlaylist(20, page, keyWord));
    }, [dispatch, keyWord, page])

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyWord(value);
    };

    const handleDelete = (playlist: Playlist) => {
        confirmAlert({
            title: 'Xác nhận!',
            message: `Bạn chắc chắn xóa playlist: ${playlist.playlistname}`,
            buttons: [
                {
                    label: 'Xóa',
                    onClick: () => {
                        dispatch(DeletePlaylist(playlist._id));
                        dispatch(ShowNotify(`Đã xóa playlist: ${playlist.playlistname}!`));
                    }
                },
                {
                    label: 'Hủy',
                    onClick: () => dispatch(ShowNotify('Đã hủy hành động xóa!'))
                }
            ]
        });
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6 text-right mb-2">
                    <Link className="btn btn-success" to='/create-playlist'>
                        <i className="fas fa-plus" />
                        &nbsp; Tạo mới playlist
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
                                    <th>Tên playlist</th>
                                    <th>Hình ảnh</th>
                                    <th>Mô tả</th>
                                    <th>Ngày tạo</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playlists?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.playlistname}</td>
                                            <td>
                                                <img style={{ width: '150px' }} src={process.env.REACT_APP_API_URL + item.background} alt={item.playlistname} />
                                            </td>
                                            <td>{item.description}</td>
                                            <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                            <td>
                                                <button className="btn btn-danger ml-1 mr-1" onClick={() => handleDelete(item)}>
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

export default Playlists;