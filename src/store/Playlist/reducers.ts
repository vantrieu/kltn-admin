import { 
    PlaylistsActionTypes,
    PlaylistsState,
    LOAD_PLAYLIST_REQUEST,
    LOAD_PLAYLIST_SUCCESS,
    LOAD_PLAYLIST_FAILURE,
    DELETE_PLAYLIST
} from "./types";

const initialState: PlaylistsState = {
    playlists: [],
    metaData: null,
    loading: false,
    error: null
}

const RefreshItems = (playlistsState: PlaylistsState, playlist_id: string) => {
    const listPlaylist = [...playlistsState.playlists];
    const index = listPlaylist?.findIndex(u => u._id === playlist_id);
    listPlaylist?.splice(index, 1);
    return listPlaylist;
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
        case DELETE_PLAYLIST: {
            return {
                ...state,
                playlists: RefreshItems(state, action.payload.playlist_id)
            }
        }
        default:
            return state;
    }
}

export { playlistReducer };