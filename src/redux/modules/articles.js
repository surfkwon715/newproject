
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";



// action
const LOAD = "LOAD ";

// action creator
const getArticles = createAction(LOAD, (articles) => ({articles}));

// 초기값
const initialState = {
   allArr: [],
};

const fetchArticles =  (pageNum) =>{
  return async function (dispatch, getState) {
    try {
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=all&page=${pageNum}&api-key=wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu`
      )
    
    const response = await res.json()
    dispatch(getArticles(response.response.docs));
  
    } catch (error) {
    console.error(error)
  }
 }
}



// 리듀서
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.allArr = action.payload.articles;
      }),
  },
  initialState
);

const actionCreators = {
    fetchArticles,
    getArticles,
};

export { actionCreators };


