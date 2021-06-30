/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, Fragment, useEffect, useState, MouseEvent } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userService } from '../../../services';
import { ShowNotify } from '../../../store/Notify/actions';
import { history } from '../../../helpers';

export const ChangePassword = () => {
    const [inputs, setInputs] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);

    useEffect(() => {
        setErrorFlag(!(inputs.confirmPassword === inputs.newPassword));
    }, [inputs.confirmPassword])

    const handleChangePass = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleChangeNew = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleChangeConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const dispatch = useDispatch();

    const { currentPassword, newPassword, confirmPassword } = inputs;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (currentPassword && newPassword && !errorFlag) {
            const body = {
                currentPassword,
                newPassword
            }
            const response = await userService.ChangePassword(body);
            if (response.data.status === 400) {
                dispatch(ShowNotify('Mật khẩu hiện tại không đúng'));
            }
            if (response.data.status === 200) {
                dispatch(ShowNotify('Đã đổi mật khẩu!'));
                history.goBack();
            }
        }
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <Fragment>
            <div className='row justify-content-center'>
                <div className='card' style={{ width: '500px' }}>
                    <div className='card-header'>Đổi mật khẩu</div>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Mật khẩu hiện tại&nbsp;<sup style={{ color: "red" }}>*</sup></label>
                                <input type='password' className={"form-control" + (submitted && !currentPassword ? ' is-invalid' : '')} onChange={handleChangePass} name='currentPassword' />
                                {submitted && !currentPassword && (
                                    <div className='invalid-feedback'>
                                        Mật khẩu hiện tại là bắt buộc
                                    </div>
                                )}
                            </div>
                            <div className='form-group'>
                                <label>Mật khẩu mới&nbsp;<sup style={{ color: "red" }}>*</sup></label>
                                <input
                                    type='password'
                                    className={"form-control" + (submitted && !newPassword ? ' is-invalid' : '')}
                                    onChange={handleChangeNew}
                                    name='newPassword' />
                                {submitted && !newPassword && (
                                    <div className='invalid-feedback'>
                                        Mật khẩu mới là bắt buộc
                                    </div>
                                )}
                            </div>
                            <div className='form-group'>
                                <label>Xác nhận mật khẩu&nbsp;<sup style={{ color: "red" }}>*</sup></label>
                                <input type='password' className={"form-control" + ((submitted && !confirmPassword) || errorFlag ? ' is-invalid' : '')} onChange={handleChangeConfirm} name='confirmPassword' />
                                {submitted && !confirmPassword && (
                                    <div className='invalid-feedback'>
                                        Xác nhận mật khẩu là bắt buộc
                                    </div>
                                )}
                                {errorFlag && (
                                    <div className='invalid-feedback'>
                                        Xác nhận mật khẩu không khớp mật khẩu mới
                                    </div>
                                )}
                            </div>
                            <div className='form-group' style={{ textAlign: 'center' }}>
                                <button className='btn btn-primary mr-1' type='submit'>
                                    <i className="fas fa-save" />
                                    &nbsp; Lưu
                                </button>
                                <button className='btn btn-danger ml-1' onClick={handleClick}>
                                    <i className="fas fa-window-close" />
                                    &nbsp; Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
