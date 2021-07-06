
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { useDispatch } from "react-redux";


// action
const LOAD = "LOAD ";

// action creator
const getArticles = createAction(LOAD, (articles) => ({articles}));

// 초기값
const initialState = {
   
};

const loadArticles =()=>{
    const apiKey = "wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu";
    axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=politics&api-key=${apiKey}`)
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log("No Connection");
    }); 
}


// 리듀서
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.username;
      }),
  },
  initialState
);

const actionCreators = {
    loadArticles,
    getArticles,
};

export { actionCreators };


