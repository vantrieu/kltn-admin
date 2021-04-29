import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { history } from '../../../helpers';
import { singerService, trackService, trackTypesServices } from '../../../services';
import { ShowNotify } from '../../../store/Notify/actions';

export const AddTrack = () => {
    const [inputs, setInputs] = useState({
        trackname: '',
        description: '',
    });
    const [singer, setSinger] = useState<any>();
    const [trackType, setTrackType] = useState<any>();
    const [singerOption, setSingerOption] = useState<any>([]);
    const [trackTypeOption, setTrackTypeOption] = useState<any>([]);
    const [formData, setFormData] = useState(new FormData());
    const [selectImages, setSelectimages] = useState(Array<string>());
    const [submitted, setSubmitted] = useState(false);
    const [music, setMusic] = useState<any>(false);

    useEffect(() => {
        async function getSingerOption() {
            let response = await singerService.GetListOption()
            let option = new Array<any>();
            response.forEach((element: any) => {
                option.push({ value: element._id, label: element.name })
            });
            setSingerOption(option);
        }
        async function getTrackTypeOption() {
            let response = await trackTypesServices.GetListOption();
            let option = new Array<any>();
            response.forEach((element: any) => {
                option.push({ value: element._id, label: element.typename })
            });
            setTrackTypeOption(option);
        }
        getSingerOption();
        getTrackTypeOption();
    }, [])

    const { trackname, description } = inputs;
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
    const musicHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let form = formData;
        form.delete("music")
        if (e.target.files) {
            form.append("music", e.target.files[0], e.target.files[0].name);
            setMusic(true);
        }
        setFormData(form);
    }

    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (trackname && description && singer && trackType && music && selectImages) {
            const formDataSubmit = formData;
            formDataSubmit.append('trackname', inputs.trackname);
            formDataSubmit.append('description', inputs.description);
            formDataSubmit.append('singer', singer);
            formDataSubmit.append('tracktype', trackType);
            const response = await trackService.CreateTrack(formDataSubmit);
            if(response.data.status === 201){
                dispatch(ShowNotify('Thêm mới bài hát thành công!'));
                history.goBack();
            } 
        }
    };

    return (
        <Fragment>
            <h1 className='h3 mb-4 text-gray-800'>Thêm mới bài hát</h1>
            <div className='card'>
                <div className='card-header'>Thông tin bài hát</div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Tên bài hát</label>
                            <input type='text' className={"form-control" + (submitted && !trackname ? ' is-invalid' : '')} onChange={handleChange} name='trackname' placeholder='Tên bài hát' />
                            {submitted && !trackname && (<small style={{ color: 'red' }}>Tên bài hát là bắt buộc</small>)}
                        </div>
                        <div className='form-group'>
                            <label>Giới thiệu</label>
                            <textarea rows={5} className={"form-control" + (submitted && !description ? ' is-invalid' : '')} onChange={handleChange} name='description' placeholder='Mô tả' />
                            {submitted && !description && (<small style={{ color: 'red' }}>Giới thiệu là bắt buộc</small>)}
                        </div>
                        <div className='row'>
                            <div className="col-4">
                                <label>Thể loại</label>
                                <div className="form-group">
                                    <Select options={trackTypeOption} name='tracktype' placeholder='Chọn thể loại nhạc' onChange={selectedOption => setTrackType(selectedOption?.value)} />
                                    {submitted && !trackType && (<small style={{ color: 'red' }}>Thể loại là bắt buộc</small>)}
                                </div>
                            </div>
                            <div className="col-4">
                                <label>Ca sĩ</label>
                                <div className="form-group">
                                    <Select options={singerOption} name='singer' placeholder='Chọn ca sĩ' onChange={selectedOption => setSinger(selectedOption?.value)} />
                                    {submitted && !singer && (<small style={{ color: 'red' }}>Thể loại là bắt buộc</small>)}
                                </div>
                            </div>
                            <div className="col-4">
                                <label>Chọn bài hát</label>
                                <div className="form-group">
                                    <input type='file' accept='audio/*' className={"form-control" + (submitted && !music ? ' is-invalid' : '')} onChange={musicHandleChange} />
                                    {submitted && !music && (<small style={{ color: 'red' }}>Bài hát là bắt buộc</small>)}
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Ảnh đại diện</label>
                            <input type="file" accept="image/*" className={"form-control" + (submitted && (selectImages.length === 0) ? ' is-invalid' : '')} onChange={imageHandleChange} />
                            {submitted && (selectImages.length === 0) && (<small style={{ color: 'red' }}>Bài hát là bắt buộc</small>)}
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
