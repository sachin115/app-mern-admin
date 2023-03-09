import axios from "../helpers/axios"
import { userRegisterConstants } from "./constants";

export const signup = (user) => {


    console.log('user',user)
    return async (dispatch) => {
        dispatch({ type: userRegisterConstants.USER_REGISTER_REQUEST })
        const res = await axios.post(`/admin/signup`, {
            ...user
        });

        if (res.status === 201) {
            const { message } = res.data;
            dispatch({
                type: userRegisterConstants.USER_REGISTER_SUCCESS,
                payload: {message}
            });
        } else {
            if (res.status === 400) {
                dispatch({
                    type: userRegisterConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }
    }
}