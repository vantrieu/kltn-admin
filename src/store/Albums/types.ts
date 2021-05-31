export const LOAD_ALBUM_REQUEST = 'LOAD_ALBUM_REQUEST';
export const LOAD_ALBUM_SUCCESS = 'LOAD_ALBUM_SUCCESS';
export const LOAD_ALBUM_FAILURE = 'LOAD_ALBUM_FAILURE';

export interface Album {
    _id: string;
    albumname: string;
    description: string;
    background: string;
    updatedAt: string;
    createdAt: string;
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

export interface DetailAlbum {
    tracks: Array<any>,
    singers: Array<any>,
    _id: string,
    albumname: string,
    description: string,
    background: string,
    createdAt: string
}
export interface AlbumsState {
    albums: Array<Album>;
    metaData: MetaData | null,
    loading: boolean;
    error: string | null;
}

interface LoadAlbumRequest {
    type: typeof LOAD_ALBUM_REQUEST
}

interface LoadAlbumSuccess {
    type: typeof LOAD_ALBUM_SUCCESS,
    payload: {
        albums: Array<Album>,
        metaData: MetaData
    }
}

interface LoadAlbumFailure {
    type: typeof LOAD_ALBUM_FAILURE,
    payload: {
        error: string
    }
}

export type AlbumsActionTypes =
    | LoadAlbumRequest
    | LoadAlbumSuccess
    | LoadAlbumFailure