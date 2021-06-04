export const LOAD_PLAYLIST_SUCCESS = 'LOAD_PLAYLIST_SUCCESS';
export const LOAD_PLAYLIST_REQUEST = 'LOAD_PLAYLIST_REQUEST';
export const LOAD_PLAYLIST_FAILURE = 'LOAD_PLAYLIST_FAILURE';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';

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

export interface Playlist {
    tracks: Array<any>,
    total: number,
    _id: string,
    playlistname: string,
    description: string,
    background: string,
    createdAt: string
}

export interface PlaylistsState {
    playlists: Array<Playlist>,
    metaData: MetaData | null,
    loading: boolean,
    error: string | null
}

interface LoadPlaylistRequest {
    type: typeof LOAD_PLAYLIST_REQUEST
}

interface LoadPlaylistSuccess {
    type: typeof LOAD_PLAYLIST_SUCCESS,
    payload: {
        playlists: Array<Playlist>,
        metaData: MetaData
    }
}

interface LoadPlaylistFailure {
    type: typeof LOAD_PLAYLIST_FAILURE,
    payload: {
        error: string
    }
}

interface DeletePlaylistById {
    type: typeof DELETE_PLAYLIST,
    payload: {
        playlist_id: string
    }
}

export type PlaylistsActionTypes =
    | LoadPlaylistRequest
    | LoadPlaylistSuccess
    | LoadPlaylistFailure
    | DeletePlaylistById