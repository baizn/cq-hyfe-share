import * as types from '../constants/actionTypes'

export default function(state = 0,action){
    switch (action.type) {
        case types.ADD_COUNT:
            return state + 1
            break;
        case types.SUB_COUNT:
            return state - 1
            break;
        default:
            return state
    }
}

function xxx(params) {
    let y = params + 1;
    return y
}