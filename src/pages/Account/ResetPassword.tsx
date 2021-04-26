import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom"
import { history } from "../../helpers";
import { userService } from "../../services";

export const ResetPassword = (props: any) => {
    const token  = props.match.params.token;
    const [inputs, setInputs] = useState({
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { password } = inputs;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setLoading(true);
        if (password) {
            setLoading(false);
            const response = await userService.ResetPassWord(password, token);
            console.log(response);
            if(response.data.status === 200){
                setLoading(false);
                history.push('/');
            }
        }
    };

    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Khôi phục mật khẩu của bạn!</h1>
                                    <p className="mb-4">
                                        Bằng cách nhập mật khẩu mới của bạn vào ô bên dưới và nhấn khôi phục mật khẩu, bạn sẽ lấy lại được quyền
                                        truy cập tài khoản của mình với mật khẩu vừa nhập!
                                    </p>
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row">

                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange={handleChange} name='password' className={'form-control form-control-user ' + (submitted && !password ? 'is-invalid' : '')} placeholder="Nhập mật khẩu mới..." />
                                        {submitted && !password && (
                                            <div className='invalid-feedback' style={{ display: "flex", justifyContent: "center" }}>
                                                Mật khẩu là bắt buộc
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
                                <hr />
                                <div className="text-center">
                                    <Link className="small" to='/login'>Bạn đã có tài khoản? Hãy đăng nhập!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}