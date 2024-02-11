const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch (action.type){
        case('SEARCH'): {
            console.log(action);
            return action.payload
        }
        default: {
            return state
        }

    }
    
}

export const search = (words) => {
    return {
        type: 'SEARCH',
        payload: words
    }
}

export default filterReducer