/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { albumsServices, singerService } from "../../../services";
import { DetailAlbum, MetaData } from "../../../store/Albums/types";
import { Track } from "../../../store/Tracks/types";
import { RemoveTrackItem } from "../Components/RemoveTrackItem";
import Pagination from 'react-js-pagination';
import { AddTrackItem } from "../Components/AddTrackItem";

export const AddTrackPlaylist = (props: any) => {
    const [album, setAlbum] = useState<DetailAlbum>({
        tracks: [],
        singers: [],
        _id: '',
        albumname: '',
        description: '',
        background: '',
        createdAt: ''
    });
    const { id } = props.match.params;
    const [page, setPage] = useState<number>(1);
    const [keyWord, setKeyWord] = useState<string>('');
    const [reRender, setReRender] = useState<boolean>(false)
    const [listTrack, setListTrack] = useState<Array<Track>>([]);
    const [metaData, setMetaData] = useState<MetaData>({
        totalDocs: 0,
        limit: 25,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    });

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            let response = await albumsServices.DetailAlbum(id);
            setAlbum(response.data.items);

            let result = await albumsServices.GetOptionTrack(id, page, keyWord);
            setListTrack(result.data.items);
            setMetaData(result.data.meta)
        }
        fetchData();
    }, [dispatch, id, keyWord, page, reRender]);

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyWord(value);
    };

    const buildSingerInfor = () => {
        var singerName = '';
        album.singers.forEach(element => {
            singerName += ' ' + element.name + ',';
        });
        return singerName.substring(0, singerName.length - 1).trim();
    }

    const AddTrackToAlbum = async (track_id: string) => {
        let response = await albumsServices.AddTrackToAlbum(track_id, album._id);
        if(response.status === 200){
            setReRender(!reRender);
        }
    }

    const RemoveTrackFromAlbum = async (track_id: string) => {
        let response = await albumsServices.RemoverackFromAlbum(track_id, album._id);
        if(response.status === 200){
            setReRender(!reRender);
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-6 card shadow">
                    <img
                        className='img-screen-center'
                        src={`${process.env.REACT_APP_API_URL}${album.background.toString()}`}
                        alt={album.background}
                        style={{ width: '200px', height: '200px', borderRadius: '25px', paddingTop: '5px' }} />
                    <label className='text-screen-center text-bold f-1' style={{ marginTop: '10px', marginBottom: '0px' }}>
                        {album.albumname}
                    </label>
                    <label className='text-screen-center text-bold f-2' style={{ marginTop: '10px', marginBottom: '0px' }}>
                        {buildSingerInfor()}
                    </label>
                    <label className='text-screen-center text-normal' style={{ marginTop: '0px', marginBottom: '0px' }}>
                        {moment(album.createdAt).format('DD/MM/YYYY')}
                    </label>
                     <label className='text-screen-center text-normal' style={{ marginTop: '0px', marginBottom: '0px' }}>
                        {album.description}
                    </label>
                    <hr />
                    <div style={{ width: '100%', height: '480px', overflowY: 'scroll', overflowX: 'hidden', paddingTop: '10px', paddingBottom: '10px' }}>
                        {album.tracks?.map((track, index) => {
                            return <RemoveTrackItem
                            key={index}
                            track={track}
                            reRender={reRender}
                            setReRender={setReRender}
                            RemoveTrackFromAlbum={RemoveTrackFromAlbum} />
                        })}
                    </div>
                </div>
                <div className="col-6 card shadow">
                    <div id="dataTable_filter" style={{ margin: '10px 10px 5px auto', color: 'black' }}>
                        <label>Tìm kiếm:&nbsp;</label>
                        <input type="search" className='border' placeholder='Tên bài hát' aria-controls="dataTable" onChange={handleChange} />
                    </div>
                    <div style={{ width: '100%', height: '730px', overflowY: 'scroll', overflowX: 'hidden', paddingTop: '10px' }}>
                        {listTrack?.map((track, index) => {
                            return <AddTrackItem
                                key={index}
                                track={track}
                                reRender={reRender}
                                setReRender={setReRender}
                                AddTrackToAlbum={AddTrackToAlbum} />
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