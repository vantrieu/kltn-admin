import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../../store';
import { GetListSinger } from '../../../store/Singers/actions';
import { Singer } from '../../../store/Singers/types';
import moment from 'moment';

export const ListSinger = () => {
    const singers = useSelector<AppState>((state) => state.singers.singers) as Array<Singer>;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetListSinger());
    }, [dispatch])
    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6 text-right mb-2">
                    <Link className="btn btn-success" to='/singer/create'>
                        <i className="fas fa-plus" />
                        &nbsp; Thêm mới ca sĩ
                    </Link>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách ca sĩ</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Tên ca sĩ</th>
                                    {/* <th>Hình ảnh</th> */}
                                    <th>Tiểu sử</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {singers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            
                                            {/* <td>
                                                <img src={process.env.REACT_APP_API_URL + item.avatar} alt={item.name} />
                                            </td> */}
                                            <td>{item.description}</td>
                                            <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                            <td>{moment(item.updatedAt).format('DD/MM/YYYY')}</td>
                                            <td>
                                                <Link className="btn btn-success mr-1" to={'/singer/edit/' + item._id.toString()}>
                                                    <i className="fas fa-edit" />
                                                    &nbsp; Cập nhật
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
