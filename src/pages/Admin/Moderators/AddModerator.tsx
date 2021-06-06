/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { history } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { ShowNotify } from '../../../store/Notify/actions';
import { userService } from '../../../services';
import moment from 'moment';

export const AddModerator = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        email: "",
        phonenumber: "",
        firstname: "",
        lastname: "",
        birthday: "",
        gender: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };
    const dispatch = useDispatch();
    const { username, password, email, phonenumber, firstname, lastname, birthday, gender } = inputs;
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (username && password && email && phonenumber && firstname && lastname && birthday && gender) {
            const response = await userService.CreateModerator(inputs)
            if (response.data.status === 201) {
                dispatch(ShowNotify('Thêm mới Người kiểm duyệt thành công'));
                history.goBack();
            }
        }
    };
    return (
        <Fragment>
            <h1 className='h3 mb-4 text-gray-800'>Thêm mới người kiểm duyệt</h1>
            <div className='card'>
                <div className='card-header'>Thông tin người kiểm duyệt</div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group row'>
                            <div className="col-6">
                                <label>Tên đăng nhập</label>
                                <input
                                    type='text'
                                    className="form-control"
                                    onChange={handleChange}
                                    name='username' />
                            </div>
                            <div className="col-6">
                                <label>Mật khẩu</label>
                                <input
                                    type='password'
                                    className="form-control"
                                    onChange={handleChange}
                                    name='password' />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className="col-6">
                                <label>Email</label>
                                <input
                                    type='email'
                                    className="form-control"
                                    onChange={handleChange}
                                    name='email' />
                            </div>
                            <div className="col-6">
                                <label>Số điện thoại</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    onChange={handleChange}
                                    name='phonenumber' />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className="col-6">
                                <label>Họ</label>
                                <input
                                    type='text'
                                    className="form-control"
                                    onChange={handleChange}
                                    name='lastname' />
                            </div>
                            <div className="col-6">
                                <label>Tên</label>
                                <input
                                    type='text'
                                    className="form-control"
                                    onChange={handleChange}
                                    name='firstname' />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className="col-6">
                                <label>Ngày sinh</label>
                                <input
                                    type='date'
                                    className="form-control"
                                    onChange={handleChange}
                                    name='birthday'
                                    max={moment().format("YYYY-MM-DD")} />
                            </div>
                            <div className="col-6">
                                <label>Giới tính</label>
                                <select className="form-control" name="gender" onChange={handleChange}>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <button className='btn btn-primary mr-1' type='submit'>
                                <i className="fas fa-save" />
                                &nbsp; Lưu
                            </button>
                            <button className='btn btn-danger ml-1' onClick={() => history.goBack()}>
                                <i className="fas fa-window-close" />
                                &nbsp; Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
