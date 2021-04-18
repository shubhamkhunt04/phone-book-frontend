import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

const initialState = {
    contacts : [
    {
        id:1,
        name:"shubham khunt",
        phone:'9067987334'
    },
    {
        id:2,
        name:"ravi virani",
        phone:'123456789'
    },
    {
        id:3,
        name:"yash mantri",
        phone:'987612345'
    }
],
version:"1.0.0"
} 


const contactReducer = (state=initialState,action)=>{
    switch(action.type){
        default:
            return state
    }
}

const store = createStore(contactReducer,composeWithDevTools())

export default store