import { 
    AlbumsActionTypes, 
    AlbumsState, 
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
        default:
            return state;
    }
}

export { albumReducer };