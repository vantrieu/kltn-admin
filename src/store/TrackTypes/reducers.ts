import { 
    DELETE_TRACKTYPE,
    LOAD_TRACKTYPE_FAILURE,
    LOAD_TRACKTYPE_REQUEST,
    LOAD_TRACKTYPE_SUCCESS,
    TrackTypes,
    TrackTypesActionTypes, 
    TrackTypesState 
} from "./types";

const initialState: TrackTypesState = {
    tracktypes: [],
    loading: false,
    error: null
}

const RefreshItems = (trackTypesState: TrackTypesState, trackType: TrackTypes) => {
    const listTrackTypes = [...trackTypesState.tracktypes];
    const index = listTrackTypes?.findIndex(u => u._id === trackType._id);
    listTrackTypes?.splice(index, 1);
    return listTrackTypes;
}

const trackTypesReducer = (
    state: TrackTypesState = initialState,
    action: TrackTypesActionTypes
): TrackTypesState => {
    switch (action.type) {
        case LOAD_TRACKTYPE_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case LOAD_TRACKTYPE_SUCCESS: {
            return {
                ...state,
                loading: false,
                tracktypes: action.payload.tracktypes
            }
        }
        case LOAD_TRACKTYPE_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case DELETE_TRACKTYPE: {
            return {
                ...state,
                tracktypes: RefreshItems(state, action.payload.trackType)
            }
        }
        default:
            return state;
    }
}

export { trackTypesReducer };