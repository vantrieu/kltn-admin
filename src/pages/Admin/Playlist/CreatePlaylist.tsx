import { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { playlistsServices } from '../../../services/playlist.services';
import { ShowNotify } from '../../../store/Notify/actions';
import { history } from '../../../helpers';

const CreatePlaylist = () => {
    const [inputs, setInputs] = useState({
        playlistname: '',
        description: '',
    });
    const [formData, setFormData] = useState(new FormData());
    const [selectImages, setSelectimages] = useState(Array<string>());
    const [submitted, setSubmitted] = useState(false);

    const { playlistname, description } = inputs;

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
        if (playlistname && description && selectImages) {
            const formDataSubmit = formData;
            formDataSubmit.append('playlistname', playlistname);
            formDataSubmit.append('description', description);
            const response = await playlistsServices.CreatePlayList(formDataSubmit);
            if(response.data.status === 200){
                dispatch(ShowNotify('Tạo mới playlist thành công!'));
                history.goBack();
            } 
        }
    };

    return (
        <Fragment>
            <h1 className='h3 mb-4 text-gray-800'>Tạo mới playlist</h1>
            <div className='card'>
                <div className='card-header'>Thông tin playlist</div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Tên playlist</label>
                            <input type='text' className={"form-control" + (submitted && !playlistname ? ' is-invalid' : '')} onChange={handleChange} name='playlistname' placeholder='Tên playlist' />
                            {submitted && !playlistname && (<small style={{ color: 'red' }}>Tên playlist là bắt buộc</small>)}
                        </div>
                        <div className='form-group'>
                            <label>Giới thiệu</label>
                            <textarea rows={5} className={"form-control" + (submitted && !description ? ' is-invalid' : '')} onChange={handleChange} name='description' placeholder='Mô tả' />
                            {submitted && !description && (<small style={{ color: 'red' }}>Giới thiệu là bắt buộc</small>)}
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
                            <Link className='btn btn-danger ml-1' to="/playlists">
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

export default CreatePlaylist;