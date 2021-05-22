import { 
    PlaylistsActionTypes,
    PlaylistsState,
    LOAD_PLAYLIST_REQUEST,
    LOAD_PLAYLIST_SUCCESS,
    LOAD_PLAYLIST_FAILURE
} from "./types";

const initialState: PlaylistsState = {
    playlists: [],
    metaData: null,
    loading: false,
    error: null
}

const playlistReducer = (
    state: PlaylistsState = initialState,
    action: PlaylistsActionTypes
): PlaylistsState => {
    switch (action.type) {
        case LOAD_PLAYLIST_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case LOAD_PLAYLIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                playlists: action.payload.playlists,
                metaData: action.payload.metaData
            }
        }
        case LOAD_PLAYLIST_FAILURE: {
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

export { playlistReducer };