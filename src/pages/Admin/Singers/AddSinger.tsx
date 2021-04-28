import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../../../helpers';
import { singerService } from '../../../services';
import { ShowNotify } from '../../../store/Notify/actions';

export const AddSinger = () => {
    const [inputs, setInputs] = useState({
        name: '',
        description: ''
    });
    const [formData, setFormData] = useState(new FormData());
    const [selectImages, setSelectimages] = useState(Array<string>());
    const [submitted, setSubmitted] = useState(false);
    const { name, description } = inputs;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };
    const imageHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileArray = [];
        const formData = new FormData();
        if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
                fileArray.push(URL.createObjectURL(e.target.files[i]));
                formData.append("avatar", e.target.files[i], e.target.files[i].name);
            }
            setSelectimages(fileArray);
        }
        setFormData(formData);
    }
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (name && description) {
            const formDataSubmit = formData;
            formDataSubmit.append('name', inputs.name);
            formDataSubmit.append('description', inputs.description);
            const response = await singerService.CreateSinger(formDataSubmit);
            if(response.data.status === 201){
                 dispatch(ShowNotify('Đã thêm mới ca sĩ!'));
                history.goBack();
            } 
        }
    };
    return (
        <Fragment>
            <h1 className='h3 mb-4 text-gray-800'>Thêm mới ca sĩ</h1>
            <div className='card'>
                <div className='card-header'>Thông tin ca sĩ</div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Tên ca sĩ</label>
                            <div className="row m-2">
                                <input type='text' className={"form-control" + (submitted && !name ? ' is-invalid col-11' : '')} onChange={handleChange} name='name' placeholder='Tên ca sĩ' />
                                {submitted && !name && (
                                    <div className='invalid-feedback col-1'>
                                        Tên ca sĩ là bắt buộc
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Giới thiệu</label>
                            <div className="row m-2">
                                <input type='text' className={"form-control" + (submitted && !description ? ' is-invalid col-11' : '')} onChange={handleChange} name='description' placeholder='Giới thiệu' />
                                {submitted && !description && (
                                    <div className='invalid-feedback col-1'>
                                        Giới thiệu là bắt buộc
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Ảnh đại diện</label>
                            <input type='file' className="form-control" onChange={imageHandleChange} />
                        </div>
                        <div className='form-group row' style={{ justifyContent: 'center' }}>
                            {selectImages.map((item, index) => {
                                return (
                                    <img className="col-2" key={index} src={item} alt="preview" />
                                )
                            })}
                        </div>
                        <div className='form-group'>
                            <button className='btn btn-primary mr-1' type='submit'>
                                <i className="fas fa-save" />
                                &nbsp; Lưu
                            </button>
                            <Link className='btn btn-danger ml-1' to="/singer">
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
