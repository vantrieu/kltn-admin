import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../../../helpers';
import { trackTypesServices } from '../../../services/tracktypes.services';
import { AppState } from '../../../store';
import { ShowNotify } from '../../../store/Notify/actions';
import { TrackTypes } from '../../../store/TrackTypes/types';

export const EditTrackType = (props: any) => {
    const id = props.match.params.id?.toString();
    const trackTypes = useSelector<AppState>((state) => state.tracktypes.tracktypes) as Array<TrackTypes>;
    const FindTrackTypeById = (id: string, listTrackTypes: Array<TrackTypes>) => {
        return listTrackTypes.find(t => {
            return t._id === id
        })
    }
    const [inputs, setInputs] = useState(FindTrackTypeById(id, trackTypes) as TrackTypes);
    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (inputs?.typename) {
            var response = await trackTypesServices.EditTrackType(inputs)
            if (response.data.status === 200) {
                dispatch(ShowNotify('Đã cập nhật thông tin thể loại!'));
                history.goBack();
            }
        }
    };
    return (
        <Fragment>
            <h1 className='h3 mb-4 text-gray-800'>Thêm mới thể loại nhạc</h1>
            <div className='card'>
                <div className='card-header'>Thông tin thể loại</div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Tên thể loại</label>
                            <div className="row m-2">
                                <input type='text' defaultValue={inputs?.typename} className={"form-control" + (submitted && !inputs?.typename ? ' is-invalid col-11' : '')} onChange={handleChange} name='typename' placeholder='Tên thể loại...' />
                                {submitted && !inputs?.typename && (
                                    <div className='invalid-feedback col-1'>
                                        Tên thể loại là bắt buộc
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='form-group'>
                            <button className='btn btn-primary mr-1' type='submit'>
                                <i className="fas fa-save" />
                                &nbsp; Lưu
                            </button>
                            <Link className='btn btn-danger ml-1' to="/track-types">
                                <i className="fas fa-window-close" />
                                &nbsp; Hủy
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
