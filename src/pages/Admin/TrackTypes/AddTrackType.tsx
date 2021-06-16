import { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { trackTypesServices } from '../../../services/tracktypes.services';
import { history } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { ShowNotify } from '../../../store/Notify/actions';

export const AddTrackType = (props: any) => {
    const [inputs, setInputs] = useState({
        typename: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { typename } = inputs;
    const [formData, setFormData] = useState(new FormData());
    const [selectImages, setSelectimages] = useState(Array<string>());

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
                formData.append("background", e.target.files[i], e.target.files[i].name);
            }
            setSelectimages(fileArray);
        }
        setFormData(formData);
    }

    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (typename) {
            const formDataSubmit = formData;
            formDataSubmit.append('typename', typename);
            const response = await trackTypesServices.CreateTrackType(formDataSubmit);
            if(response.data.status === 201){
                dispatch(ShowNotify('Thêm mới thể loại thành công'));
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
                                <input type='text' className={"form-control" + (submitted && !typename ? ' is-invalid col-11' : '')} onChange={handleChange} name='typename' placeholder='Tên thể loại...' />
                                {submitted && !typename && (
                                    <div className='invalid-feedback col-1'>
                                        Tên thể loại là bắt buộc
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Ảnh đại diện</label>
                            <input type='file' accept="image/*" className="form-control" onChange={imageHandleChange} />
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
