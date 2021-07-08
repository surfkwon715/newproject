
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// action
const LOAD = "LOAD ";
const ADD = "ADD";
const DELETE ="DELETE";

// actionCreator
const getArticles = createAction(LOAD, (articles) => ({articles}));
const addArticles= createAction(ADD,(article)=>({article}));
const deleteArticles= createAction(DELETE,(id)=>({id}));


// initialState
const initialState = {
   allArr: [],
   favoritesArr: [],
};

const fetchArticles =  (pageNum) =>{
  return async function (dispatch, getState) {
    try {
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=everything&page=${pageNum}&api-key=wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu`
      )
    const response = await res.json()
    dispatch(getArticles(response.response.docs));
  
    } catch (error) {
    console.error(error)
  }
 }
}

const addFavorites = (article)=>{
  return function (dispatch, getState) {
    dispatch(addArticles(article))
  }
}

const deleteFavorites = (id)=>{
  return function (dispatch, getState) {
    dispatch(deleteArticles(id))
  }
}


// reducer
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.allArr = action.payload.articles;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
      draft.favoritesArr.unshift(action.payload.article);
    }),
    [DELETE]: (state, action) => produce(state, (draft) => {
      draft.favoritesArr = draft.favoritesArr.filter((a)=>{
        if(a._id !== action.payload.id){
          return [...draft.favoritesArr,a]
        }
      })
      })},
  initialState
);

const actionCreators = {
    fetchArticles,
    getArticles,
    addArticles,
    addFavorites,
    deleteFavorites,
    deleteArticles,
};

export { actionCreators };


