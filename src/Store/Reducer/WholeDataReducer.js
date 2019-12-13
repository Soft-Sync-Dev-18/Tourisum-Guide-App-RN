const initialState = {
    data: "",
    isLoading: true,
    isError: false,
    error: {},
};
export default function WholeDataReducer(state = initialState, action) {
    switch (action.type) {
        case 'Whole_data':
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            };
        default:
            return state
    }

}  