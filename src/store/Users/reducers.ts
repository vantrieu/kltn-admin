import { 
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOCK_USER,
    UN_LOCK_USER,
    UsersActionTypes,
    UsersState 
} from "./types";

const initialState: UsersState = {
    users: [],
    metaData: null,
    loading: false,
    error: null
}

const RefreshState = (usersState: UsersState, user_id: string, state: number) => {
    const lstUser = [...usersState.users];
    const index = lstUser?.findIndex(u => u._id === user_id);
    const user = lstUser[index];
    user.isLock = state;
    lstUser?.splice(index, 1, user);
    return lstUser;
}

const userReducer = (
    state: UsersState = initialState,
    action: UsersActionTypes
): UsersState => {
    switch (action.type) {
        case LOAD_USER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                users: action.payload.users,
                metaData: action.payload.metaData
            }
        }
        case LOAD_USER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case LOCK_USER: {
            return {
                ...state,
                users: RefreshState(state, action.payload.user_id, 1)
            }
        }
        case UN_LOCK_USER: {
            return {
                ...state,
                users: RefreshState(state, action.payload.user_id, 0)
            }
        }
        default:
            return state;
    }
}

export { userReducer };