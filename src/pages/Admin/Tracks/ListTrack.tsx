import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../../store";
import { DeleteTrack, GetListTrack } from "../../../store/Tracks/actions";
import { MetaData, Track } from "../../../store/Tracks/types";
import Pagination from "react-js-pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { history } from "../../../helpers";
import Select from 'react-select';
import { PlayMusic } from "../Components/PlayMusic";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ShowNotify } from "../../../store/Notify/actions";

export const ListTrack = (props: any) => {
    const limit = props.match.params.limit || 20;
    const [page, setPage] = useState<number>(props.match.params.page || 1);
    const tracks = useSelector<AppState>((state) => state.tracks.tracks) as Array<Track>;
    const metaData = useSelector<AppState>((state) => state.tracks.metaData) as MetaData;

    const [index, setIndex] = useState<number>(0);
    const [keyWord, setKeyWord] = useState<string>('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetListTrack(limit, page, keyWord));
    }, [dispatch, limit, page, keyWord])

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
        history.push(`/list-track/limit=${limit}&page=${pageNumber}`);
    }

    const handleChange = (selectedOption: any) => {
        history.push(`/list-track/limit=${selectedOption.value}&page=${page}`);
    };

    const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        const { value } = e.target;
        setKeyWord(value);
    };

    const handleDelete = (model: any) => {
        confirmAlert({
            title: 'Warning!',
            message: `Bạn chắc chắn xóa thể loại: ${model.typename}`,
            buttons: [
                {
                    label: 'Xóa',
                    onClick: () => {
                        dispatch(DeleteTrack(model._id));
                        dispatch(ShowNotify(`Đã xóa thể loại: ${model.typename}!`));
                    }
                },
                {
                    label: 'Hủy',
                    onClick: () => dispatch(ShowNotify('Đã hủy hành động xóa!'))
                }
            ]
        });
    }

    const options = [
        { value: '3', label: '3' },
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' },
        { value: '40', label: '40' },
        { value: '50', label: '50' }
    ];

    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6 text-right mb-2">
                    <Link className="btn btn-success" to='/add-track'>
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
                                <Select
                                    className='select-weight'
                                    value={{ value: limit, label: limit }}
                                    onChange={handleChange}
                                    options={options}
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div id="dataTable_filter" style={{ float: 'right' }}>
                                <label>Tìm kiếm:&nbsp;</label>
                                <input type="search" className='border' placeholder='Tên bài hát' aria-controls="dataTable" onChange={handleChangeKeyword} />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Tên bài hát</th>
                                    <th>Mô tả</th>
                                    <th>Ca sĩ</th>
                                    <th>Thể loại</th>
                                    <th>Lượt nghe</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.trackname}</td>
                                            <td>{item.description}</td>
                                            <td>{item.singer.name}</td>
                                            <td>{item.tracktype.typename}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                <button className="btn btn-danger ml-1 mr-1" onClick={() => handleDelete(item)} >
                                                    <i className="far fa-trash-alt" />
                                                    &nbsp; Xóa
                                                </button>
                                                <button className='btn btn-primary ml-1' onClick={() => setIndex(index)}>
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
            <PlayMusic tracks={tracks} index={index} setIndex={setIndex} />
        </Fragment>
    )
}
