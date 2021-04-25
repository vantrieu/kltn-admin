import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { AuthenticatedUser } from "../../../store/Account/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChangeEvent, useState } from "react";
import moment from 'moment';

const EditProfile = (props: any) => {
    const user = useSelector<AppState>((state) => state.account.user) as AuthenticatedUser;

    const [inputs, setInputs] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        birthDate: moment(user.birthday).format('MM/DD/YYYY'),
        gender: user.gender,
        avatar: user.avatar
    })

    const RenderOption = () => {
        const genders = ['Nam', 'Nữ', 'Không muốn tiết lộ'] as Array<string>;
        return genders.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleChangdate = (date: Date | null) => {
        setInputs((inputs) => ({ 
            ...inputs, 
            birthDate: moment(date?.toString()).format('MM/DD/YYYY')
        }));
    }
    console.log(inputs);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Cập nhật thông tin cá nhân</h6>
            </div>
            <div className="card-body">
                <form>
                    <div className='form-group row'>
                        <div className='col-6'>
                            <label>Họ</label>
                            <div className="row m-1">
                                <input className={"form-control"} name='lastname' onChange={handleChange} defaultValue={user.lastname} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <label>Tên</label>
                            <div className="row m-1">
                                <input className={"form-control"} name='firstname' onChange={handleChange} defaultValue={user.firstname} />
                            </div>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <div>
                            <label>Ngày sinh</label>
                            <div className="m-1" style={{width: '100%'}}>
                                <DatePicker selected={new Date(inputs.birthDate)} dateFormat={'dd/MM/yyyy'}
                                    onChange={(date) => handleChangdate(new Date(moment(date?.toString()).format('MM/DD/YYYY')))} />
                            </div>
                        </div>
                        <div className='col-4'>
                            <label>Giới tính</label>
                            <select name='gender' onChange={handleChange} className="m-1 mr-1" style={{ width: '100%', height: '50%' }}>
                                {RenderOption()}
                            </select>
                        </div>
                        <div className='col-4'>
                            <label>Ảnh đại diện</label>
                            <div className="m-1">
                                <input type='file' accept="image/*" className={"form-control"} name='description' />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="form-group row justify-content-center">
                    <button className='btn btn-success mr-1'>
                        Cập nhật thông tin
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;