import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShowNotify } from '../../../store/Notify/actions';
import { history } from '../../../helpers';
import { albumsServices, singerService } from '../../../services';
import Select from 'react-select';

const CreateAlbum = () => {
    const [inputs, setInputs] = useState({
        albumname: '',
        description: '',
    });
    const [formData, setFormData] = useState(new FormData());
    const [selectImages, setSelectimages] = useState(Array<string>());
    const [submitted, setSubmitted] = useState(false);
    const [singerOption, setSingerOption] = useState<any>([]);
    const [singer, setSinger] = useState<any>([]);

    useEffect(() => {
        async function getSingerOption() {
            let response = await singerService.GetListOption()
            let option = new Array<any>();
            response.forEach((element: any) => {
                option.push({ value: element._id, label: element.name })
            });
            setSingerOption(option);
        }
        getSingerOption();
    }, [])

    const { albumname, description } = inputs;

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };
    const imageHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let fileArray = [];
        let form = formData;
        form.delete('background');
        if (e.target.files) {
            fileArray.push(URL.createObjectURL(e.target.files[0]));
            form.append("background", e.target.files[0], e.target.files[0].name);
            setSelectimages(fileArray);
        }
        setFormData(form);
    }

    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (albumname && description && selectImages) {
            const formDataSubmit = formData;
            formDataSubmit.append('albumname', albumname);
            formDataSubmit.append('description', description);
            singer.forEach((element: any) => {
                formDataSubmit.append('singers', element.value)
            });
            const response = await albumsServices.CreateAlbum(formDataSubmit);
            if(response.data.status === 201){
                dispatch(ShowNotify('Tạo mới album thành công!'));
                history.goBack();
            } 
        }
    };

    return (
        <Fragment>
            <h1 className='h3 mb-4 text-gray-800'>Tạo mới Album</h1>
            <div className='card'>
                <div className='card-header'>Thông tin album</div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Tên album</label>
                            <input type='text' className={"form-control" + (submitted && !albumname ? ' is-invalid' : '')} onChange={handleChange} name='albumname' placeholder='Tên playlist' />
                            {submitted && !albumname && (<small style={{ color: 'red' }}>Tên playlist là bắt buộc</small>)}
                        </div>
                        <div className='form-group'>
                            <label>Giới thiệu</label>
                            <textarea rows={5} className={"form-control" + (submitted && !description ? ' is-invalid' : '')} onChange={handleChange} name='description' placeholder='Mô tả' />
                            {submitted && !description && (<small style={{ color: 'red' }}>Giới thiệu là bắt buộc</small>)}
                        </div>
                        <div className='form-group'>
                        <label>Ca sĩ</label>
                                <div className="form-group">
                                    <Select options={singerOption} isMulti={true} name='singer' placeholder='Chọn ca sĩ' onChange={selectedOption => setSinger(selectedOption)} className={(submitted && singer.length === 0 ? ' is-invalid' : '')} />
                                    {submitted && singer.length === 0 && (<small style={{ color: 'red' }}>Ca sĩ là bắt buộc</small>)}
                                </div>
                        </div>
                        <div className='form-group'>
                            <label>Ảnh bìa</label>
                            <input type="file" accept="image/*" className={"form-control" + (submitted && (selectImages.length === 0) ? ' is-invalid' : '')} onChange={imageHandleChange} />
                            {submitted && (selectImages.length === 0) && (<small style={{ color: 'red' }}>Ảnh bìa là bắt buộc</small>)}
                        </div>
                        <div className='form-group row' style={{ justifyContent: 'center' }}>
                            {selectImages?.map((item, index) => {
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
                            <Link className='btn btn-danger ml-1' to="/albums">
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

export default CreateAlbum;