import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { AppState } from "../../../store";
import { DeleteTrackType, GetListTrackType } from "../../../store/TrackTypes/actions";
import { TrackTypes } from "../../../store/TrackTypes/types";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ShowNotify } from "../../../store/Notify/actions";

export const ListTrackTypes = () => {
    const trackTypes = useSelector<AppState>((state) => state.tracktypes.tracktypes) as Array<TrackTypes>;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetListTrackType());
    }, [dispatch])

    const submit = (model: TrackTypes) => {
        confirmAlert({
            title: 'Warning!',
            message: `Bạn chắc chắn xóa thể loại: ${model.typename}`,
            buttons: [
                {
                    label: 'Xóa',
                    onClick: () => {
                        dispatch(DeleteTrackType(model._id));
                        dispatch(ShowNotify(`Đã xóa thể loại: ${model.typename}!`));
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
                    <Link className="btn btn-success" to='/add-tracktype'>
                        <i className="fas fa-plus" />
                        &nbsp; Thêm mới thể loại
                    </Link>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách loại nhạc</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Mã loại</th>
                                    <th>Tên loại</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackTypes.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.typename}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{item.updatedAt}</td>
                                            <td>
                                                <Link className="btn btn-success mr-1" to={'/edit-tracktype/' + item._id.toString()}>
                                                    <i className="fas fa-edit" />
                                                    &nbsp; Cập nhật
                                                </Link>
                                                <button className="btn btn-danger ml-1" onClick={() => submit(item)}>
                                                    <i className="far fa-trash-alt" />
                                                    &nbsp; Xóa
                                                </button>
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
