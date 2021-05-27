import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playlistsServices } from '../../../services/playlist.services';
import { AppState } from '../../../store';
import { Playlist } from '../../../store/Playlist/types';
import { GetListTrack } from '../../../store/Tracks/actions';
import { MetaData, Track } from '../../../store/Tracks/types';
import TrackItem from '../Components/TrackItem';
import Pagination from "react-js-pagination";
import TrackItemAddPlaylist from '../Components/TrackItemAddPlaylist';

const EditPlaylist = (props: any) => {
    const [playlist, setPlaylist] = useState<Playlist>({
        tracks: [],
        total: 0,
        _id: '',
        playlistname: '',
        description: '',
        background: '',
        createdAt: ''
    });
    const { id } = props.match.params;
    const [page, setPage] = useState<number>(1);
    const [keyWord, setKeyWord] = useState<string>('');
    const listTrack = useSelector<AppState>((state) => state.tracks.tracks) as Array<Track>;
    const metaData = useSelector<AppState>((state) => state.tracks.metaData) as MetaData;

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            let response = await playlistsServices.GetPlaylistById(id);
            setPlaylist(response.data.items);
        }
        fetchData();
        dispatch(GetListTrack(20, page, keyWord));
    }, [dispatch, id, keyWord, page]);

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyWord(value);
    };

    console.log(listTrack)
    return (
        <Fragment>
            <div className="row">
                <div className="col-6 card shadow">
                    <img
                        className='img-screen-center'
                        src={`${process.env.REACT_APP_API_URL}${playlist.background.toString()}`}
                        alt={playlist.playlistname}
                        style={{ width: '200px', height: '200px', borderRadius: '25px', paddingTop: '5px' }} />
                    <label className='text-screen-center text-bold f-1' style={{ marginTop: '10px', marginBottom: '0px' }}>
                        {playlist.playlistname}
                    </label>
                    <label className='text-screen-center text-normal' style={{ marginTop: '0px', marginBottom: '0px' }}>
                        {playlist.createdAt}
                    </label>
                    <label className='text-screen-center text-normal' style={{ marginTop: '0px', marginBottom: '0px' }}>
                        {playlist.description}
                    </label>
                    <hr />
                    <div style={{ width: '100%', height: '500px', overflowY: 'scroll', overflowX: 'hidden', paddingTop: '10px' }}>
                        {playlist.tracks?.map((track, index) => {
                            return <TrackItem key={index} track={track} id={playlist._id} />
                        })}
                    </div>
                </div>
                <div className="col-6 card shadow">
                    <div id="dataTable_filter" style={{margin: '10px 10px 5px auto', color: 'black'}}>
                        <label>Tìm kiếm:&nbsp;</label>
                        <input type="search" className='border' placeholder='Tên bài hát' aria-controls="dataTable" onChange={handleChange} />
                    </div>
                    <div style={{ width: '100%', height: '730px', overflowY: 'scroll', overflowX: 'hidden', paddingTop: '10px' }}>
                        {listTrack.map((track, index) => {
                            return <TrackItemAddPlaylist key={index} track={track} id={playlist._id} />
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={metaData?.page}
                        itemsCountPerPage={metaData?.limit}
                        totalItemsCount={metaData?.totalDocs | 0}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditPlaylist;