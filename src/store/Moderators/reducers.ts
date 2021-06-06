import { 
    ModeratorsActionTypes, 
    ModeratorsState,
    LOAD_MODERATOR_REQUEST, 
    LOAD_MODERATOR_SUCCESS,
    LOAD_MODERATOR_FAILURE,
    LOCK_MODERATOR,
    UN_LOCK_MODERATOR
} from "./types";

const initialState: ModeratorsState = {
    moderators: [],
    metaData: null,
    loading: false,
    error: null
}

const RefreshState = (moderatorsState: ModeratorsState, user_id: string, state: number) => {
    const lstModerator = [...moderatorsState.moderators];
    const index = lstModerator?.findIndex(u => u._id === user_id);
    const moderator = lstModerator[index];
    moderator.islock = state;
    lstModerator?.splice(index, 1, moderator);
    return lstModerator;
}

const moderatorReducer = (
    state: ModeratorsState = initialState,
    action: ModeratorsActionTypes
): ModeratorsState => {
    switch (action.type) {
        case LOAD_MODERATOR_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case LOAD_MODERATOR_SUCCESS: {
            return {
                ...state,
                loading: false,
                moderators: action.payload.moderators,
                metaData: action.payload.metaData
            }
        }
        case LOAD_MODERATOR_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case LOCK_MODERATOR: {
            return {
                ...state,
                moderators: RefreshState(state, action.payload.user_id, 1)
            }
        }
        case UN_LOCK_MODERATOR: {
            return {
                ...state,
                moderators: RefreshState(state, action.payload.user_id, 0)
            }
        }
        default:
            return state;
    }
}

export { moderatorReducer };