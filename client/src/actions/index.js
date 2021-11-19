import axios from "axios";
import {
    FETCH_USER,
    FETCH_SURVEYS
} from "./types"


export const fetchUser = () => {
    return async function(dispatch){
        const { data } = await axios.get('/api/current_user')
        dispatch({type: FETCH_USER, payload: data})
    }
}

export const handleToken = (token) =>{
    return async (dispatch) => {
        const {data} = await axios.post('/api/stripe', token)
        dispatch({type: FETCH_USER, payload: data})
    }
}

export const submitSurvey = (values, history)=>{
    return async (dispatch)=>{
        const {data} = await axios.post('/api/surveys', values)
        dispatch({type: FETCH_USER, payload: data})
        history.push('/surveys')
    }
}

export const fetchSurveys = ()=>{
    return async (dispatch)=>{
        const {data}  = await axios.get('/api/surveys')
        dispatch({type: FETCH_SURVEYS, payload: data})
    }
}