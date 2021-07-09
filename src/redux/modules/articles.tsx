
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";


// action
const LOAD = "LOAD ";
const ADD = "ADD";
const DELETE ="DELETE";

// actionCreator
const getArticles = createAction(LOAD, (articles:any) => ({articles}));
const addArticles= createAction(ADD,(article:any)=>({article}));
const deleteArticles= createAction(DELETE,(id:any)=>({id}));


// initialState
const initialState:any = {
   allArr: [],
   favoritesArr: [],
};

const fetchArticles =  (pageNum:number) =>{
  return async function (dispatch:any) {
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

const addFavorites = (article:any)=>{
  return function (dispatch:any) {
    dispatch(addArticles(article))
  }
}

const deleteFavorites = (id:string)=>{
  return function  (dispatch:any)  {
    dispatch(deleteArticles(id))
  }
}


// reducer
export default handleActions(
  {
    [LOAD]: (state:any, action:any) =>
      produce(state, (draft:any) => {
        draft.allArr = action.payload.articles;
      }),
    [ADD]: (state:any, action:any) =>
      produce(state, (draft:any)  => {
      draft.favoritesArr.unshift(action.payload.article);
    }),
    [DELETE]: (state:any, action:any) => produce(state, (draft:any) => {
      draft.favoritesArr = draft.favoritesArr.filter((a:any)=>{
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


