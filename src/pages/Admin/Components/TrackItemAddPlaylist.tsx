import { Fragment } from 'react'

const TrackItemAddPlaylist = (props: any) => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-11 card shadow" style={{ margin: '0 auto 10px auto', display: 'inline-block' }}>
                    <img
                        className='img-screen-center'
                        src={`${process.env.REACT_APP_API_URL}${props.track.background.toString()}`}
                        alt={props.track.trackname}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '5px 40px 5px auto' }} />
                    <label style={{ color: 'black', fontSize: '20px' }}>
                        {props.track.trackname}
                    </label>
                    <label style={{ color: 'black', fontSize: '18px', marginLeft: '40px' }}>
                        {props.track.singer.name}
                    </label>
                    <button className='btn btn-success' style={{ float: 'right', marginTop: '6px' }}>
                    <i className="fas fa-plus" />&nbsp;Thêm vào playlist
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default TrackItemAddPlaylist;