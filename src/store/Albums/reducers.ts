import { 
    AlbumsActionTypes, 
    AlbumsState, 
    DELETE_ALBUM, 
    LOAD_ALBUM_FAILURE, 
    LOAD_ALBUM_REQUEST,
    LOAD_ALBUM_SUCCESS
} from "./types"

const initialState: AlbumsState = {
    albums: [],
    metaData: null,
    loading: false,
    error: null
}

const RefreshItems = (albumsState: AlbumsState, album_id: string) => {
    const listAlbum = [...albumsState.albums];
    const index = listAlbum?.findIndex(u => u._id === album_id);
    listAlbum?.splice(index, 1);
    return listAlbum;
}

const albumReducer = (
    state: AlbumsState = initialState,
    action: AlbumsActionTypes
): AlbumsState => {
    switch (action.type) {
        case LOAD_ALBUM_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case LOAD_ALBUM_SUCCESS: {
            return {
                ...state,
                loading: false,
                albums: action.payload.albums,
                metaData: action.payload.metaData
            }
        }
        case LOAD_ALBUM_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case DELETE_ALBUM: {
            return {
                ...state,
                albums: RefreshItems(state, action.payload.album_id)
            }
        }
        default:
            return state;
    }
}

export { albumReducer };