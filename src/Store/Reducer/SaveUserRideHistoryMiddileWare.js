export default function SaveHistoryReducer(state = { isLoading: true, isError: false }, action) {
    switch (action.type) {
        case 'User_History':
            return {
                ...state,
                // data: action.payload,
                isLoading: action.payload,
                isError: false,
            };
        default:
            return state
    }

}  