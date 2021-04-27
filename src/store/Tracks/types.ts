export const LOAD_TRACK_REQUEST = 'LOAD_TRACK_REQUEST';
export const LOAD_TRACK_SUCCESS = 'LOAD_TRACK_SUCCESS';
export const LOAD_TRACK_FAILURE = 'LOAD_TRACK_FAILURE';

export const DELETE_TRACK = 'DELETE_TRACK';

export interface Track {
    _id: string;
    trackname: string;
    description: string;
    background: string;
    tracklink: string;
    total: number;
}

export interface MetaData {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface TracksState {
    tracks: Array<Track>,
    metaData: MetaData | null,
    loading: boolean,
    error: string | null
}

interface LoadTrackRequest {
    type: typeof LOAD_TRACK_REQUEST
}

interface LoadTrackSuccess {
    type: typeof LOAD_TRACK_SUCCESS,
    payload: {
        tracks: Array<Track>,
        metaData: MetaData
    }
}

interface LoadTrackFailure {
    type: typeof LOAD_TRACK_FAILURE,
    payload: {
        error: string
    }
}

interface DeleteTrack {
    type: typeof DELETE_TRACK,
    payload: {
        id: string
    }
}

export type TracksActionTypes = 
    | LoadTrackRequest
    | LoadTrackSuccess
    | LoadTrackFailure
    | DeleteTrack