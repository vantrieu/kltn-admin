import moment from 'moment';
import { useEffect, useState } from 'react';
import { trackService } from '../../../services';
import { Track } from '../../../store/Tracks/types'
import { TopTrackItem } from '../Components/TopTrackItem';

export const TopTrack = () => {
    const [tracks, setTracks] = useState<any>([]);

    useEffect(() => {
        async function fetchHotTrack() {
            let response = await trackService.GetHotTrack();
            setTracks(response.data.items)
        }

        fetchHotTrack()
    }, []);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Bảng xếp hạng bài hát tháng {moment().format('MM/YYYY')}</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive" style={{ width: '100%', height: '840px', overflowY: 'scroll', overflowX: 'hidden', paddingTop: '10px' }}>
                    {tracks.map((item: Track, index: number) => {
                        return (
                            <TopTrackItem key={index} track={item} index={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
