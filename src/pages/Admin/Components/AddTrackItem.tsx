import { Fragment } from 'react'

export const AddTrackItem = (props: any) => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-11 card shadow" style={{ margin: 'auto auto 5px auto', display: 'inline-block' }}>
                    <img
                        className='img-screen-center'
                        src={`${process.env.REACT_APP_API_URL}${props.track.background.toString()}`}
                        alt={props.track.trackname}
                        style={{ width: '50px', height: '50px', borderRadius: '50%', marginTop: '-25px', marginRight: '20px' }} />
                    <label style={{ color: 'black', fontSize: '20px' }}>
                        {props.track.trackname}
                        <br />
                        <label style={{ color: 'black', fontSize: '14px' }}>
                            {props.track.singer.name}
                        </label>
                    </label>

                    <button className='btn btn-success' style={{ float: 'right', marginTop: '15px' }} onClick={() => props.AddTrackToAlbum(props.track?._id)}>
                        <i className="fas fa-plus" />&nbsp;Thêm vào album
                    </button>
                </div>
            </div>
        </Fragment>
    )
}
