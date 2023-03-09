import { userRegisterConstants } from "../actions/constants"

const initialState = {
    error:null,
    message: " ",
    loading: false
}



export default ( state = initialState, action)=> {
    console.log(action)
    switch(action.type){
        case userRegisterConstants.USER_REGISTER_REQUEST:
            state= {
                ...state,
                loading: true
            }
            break;
        case userRegisterConstants.USER_REGISTER_SUCCESS:
            state = {
                 ...state,
                 message: action.payload.message,
                 loading:false,
            }
            break
        case userRegisterConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading:false,
                error: action.payload.error
            }
            break
    }
    return state; 
}