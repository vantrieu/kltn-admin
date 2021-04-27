import { 
    DELETE_TRACK,
    LOAD_TRACK_FAILURE,
    LOAD_TRACK_REQUEST,
    LOAD_TRACK_SUCCESS,
    TracksActionTypes, 
    TracksState 
} from "./types";

const initialState: TracksState = {
    tracks: [],
    metaData: null,
    loading: false,
    error: null
}

const RefreshItems = (tracksState: TracksState, id: string) => {
    const listTrack = [...tracksState.tracks];
    const index = listTrack?.findIndex(u => u._id === id);
    listTrack?.splice(index, 1);
    return listTrack;
}

const trackReducer = (
    state: TracksState = initialState,
    action: TracksActionTypes
): TracksState => {
    switch (action.type) {
        case LOAD_TRACK_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case LOAD_TRACK_SUCCESS: {
            return {
                ...state,
                loading: false,
                tracks: action.payload.tracks,
                metaData: action.payload.metaData
            }
        }
        case LOAD_TRACK_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case DELETE_TRACK: {
            return {
                ...state,
                tracks: RefreshItems(state, action.payload.id)
            }
        }
        default:
            return state;
    }
}

export { trackReducer };