import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "../../services";

export const ForgotPassword = () => {
    const [inputs, setInputs] = useState({
        email: ''
    });

    const [res, setRes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const { email } = inputs;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (email) {
            setLoading(true);
            const response = await userService.FotgotPassword(email);
            if (response.status === 200) {
                setRes(true);
                setLoading(false);
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="p-5">
                                    {
                                        res === false ?
                                            <Fragment>
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-2">Bạn quên mật khẩu của mình?</h1>
                                                    <p className="mb-4">
                                                        Chúng tôi hiểu điều gì đang xảy ra với bạn. Hãy nhập email của bạn vào bên dưới
                                                        và ấn khôi phục mật khẩu, bạn sẽ lấy lại được quyền truy cập tài khoản của chính mình!!!
                                                    </p>
                                                </div>
                                                <form className="user" onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <input type="email" name='email' className={'form-control form-control-user ' + (submitted && !email ? 'is-invalid' : '')} onChange={handleChange} id="exampleInputEmail" aria-describedby="emailHelp" placeholder="example@gmail.com" />
                                                        {submitted && !email && (
                                                            <div className='invalid-feedback' style={{ display: "flex", justifyContent: "center" }}>
                                                                Email là bắt buộc
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button className="btn btn-primary btn-user btn-block">
                                                        {loading && (
                                                            <span className='spinner-border spinner-border-sm mr-1'></span>
                                                        )}
                                                        Khôi phục mật khẩu
                                                    </button>
                                                </form>
                                            </Fragment> :
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2">Kiểm tra hòm thư để tiếp tục?</h1>
                                                <p className="mb-4">
                                                    Để hoàn thành quá trình lấy lại mật khẩu, vui lòng kiểm tra hòm thư của bạn và tiếp tục!!!
                                                </p>
                                            </div>
                                    }
                                    <hr />
                                    <div className="text-center">
                                        <Link className="small" to='/login'>
                                            Bạn đã có tài khoản? Hãy đăng nhập!
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}