import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../store';
import { useLocation } from 'react-router';
import { login, logout } from '../../store/Account/actions';
import { AccountState } from '../../store/Account/types';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const account = useSelector<AppState>((state) => state.account) as AccountState;

    const { username, password } = inputs;

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (username && password) {
            const { from }: any = location.state || { from: { pathname: '/' } };
            dispatch(login(username, password, from));
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-xl-6 col-lg-6 col-md-6'>
                    <div className='card o-hidden border-0 shadow-lg my-5'>
                        <div className='card-body p-0'>
                            <div className='p-5'>
                                <div className='text-center'>
                                    <h1 className='h4 text-gray-900 mb-4'>Chào mừng bạn trở lại!</h1>
                                </div>
                                <form className='user' onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <input
                                            type='text'
                                            className={
                                                'form-control form-control-user ' +
                                                (submitted && !username ? 'is-invalid' : '')
                                            }
                                            id='exampleInputEmail'
                                            aria-describedby='emailHelp'
                                            onChange={handleChange}
                                            placeholder='Tên đăng nhập...'
                                            name='username'
                                        />
                                        {submitted && !username && (
                                            <div className='invalid-feedback' style={{ display: "flex", justifyContent: "center" }}>
                                                Tên đăng nhập là bắt buộc
                                            </div>
                                        )}
                                    </div>
                                    <div className='form-group'>
                                        <input
                                            type='password'
                                            className={
                                                'form-control form-control-user ' +
                                                (submitted && !username ? 'is-invalid' : '')
                                            }
                                            id='exampleInputPassword'
                                            placeholder='Mật khẩu...'
                                            onChange={handleChange}
                                            name='password'
                                            autoComplete="on"
                                        />
                                        {submitted && !password && (
                                            <div className='invalid-feedback' style={{ display: "flex", justifyContent: "center" }}>
                                                Mật khẩu là bắt buộc
                                            </div>
                                        )}
                                    </div>
                                    <div className='form-group'>
                                        {submitted && (account.error !== '') ?
                                            <div className='invalid-feedback' style={{ display: "flex", justifyContent: "center" }}>{account.error}</div> : ''
                                        }
                                    </div>
                                    <div className='form-group' style={{ display: "flex", justifyContent: "center" }}>
                                        <button className='btn btn-primary'>
                                            {account.loading && (
                                                <span className='spinner-border spinner-border-sm mr-1'></span>
                                            )}
                                            Đăng nhập
                                        </button>
                                    </div>
                                </form>
                                <hr />
                                <div className="text-center">
                                    <Link className="small" to='/forgot-password'>
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};