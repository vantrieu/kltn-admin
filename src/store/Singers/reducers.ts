import { 
    LOAD_SINGER_FAILURE,
    LOAD_SINGER_REQUEST,
    LOAD_SINGER_SUCCESS,
    SingersActionTypes,
    SingersState 
} from "./types";

const initialState: SingersState = {
    singers: [],
    loading: false,
    error: ''
}

const singerReducer = (
    state: SingersState = initialState,
    action: SingersActionTypes
): SingersState => {
    switch (action.type) {
        case LOAD_SINGER_REQUEST: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        case LOAD_SINGER_SUCCESS: {
            return {
                ...state,
                loading: action.payload.loading,
                singers: action.payload.singers
            }
        }
        case LOAD_SINGER_FAILURE: {
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error
            }
        }
        default:
            return state;
    }
}

export { singerReducer };