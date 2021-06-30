import { Fragment, useState } from 'react';
import { Track } from '../../../store/Tracks/types'

export const TopTrackItem = (props: any) => {
    const [track] = useState<Track>(props.track);
    return (
        <Fragment>
            <div className="row">
                <div className="col-11 card shadow" style={{ margin: '0 auto 10px auto', display: 'inline-block' }}>
                    <label className='col-1'
                        style={{
                            color: '#4E73DF',
                            fontSize: '40px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingTop: '10px',
                            paddingBottom: '10px'
                        }}>
                        {props.index + 1}
                    </label>
                    <img
                        className='img-screen-center'
                        src={`${process.env.REACT_APP_API_URL}${props.track.background.toString()}`}
                        alt={track.trackname}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            margin: '5px 40px 15px auto'
                        }} />
                    <label className='col-2' style={{ color: 'black', fontSize: '20px' }}>
                        {track.trackname}
                    </label>
                    <label className='col-2' style={{ color: 'black', fontSize: '18px', marginLeft: '40px' }}>
                        {track.singer.name}
                    </label>
                    <label className='col-2' style={{ color: 'black', fontSize: '18px', marginLeft: '40px' }}>
                        {track.tracktype.typename}
                    </label>
                    <label className='col-2' style={{ color: 'black', fontSize: '18px', marginLeft: '40px' }}>
                        {track.total} Lượt nghe
                    </label>
                </div>
            </div>
        </Fragment>
    )
}
