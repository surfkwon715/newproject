//API에서 불러와서 판단하기 이전에 먼저 반영되도록 리덕스를 구성
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// action
const LOAD = "LOAD ";
const ADD = "ADD";
const DELETE ="DELETE";

// actionCreator
const getArticles = createAction(LOAD, (articles:Object[]) => ({articles}));
const addArticles= createAction(ADD,(article:any)=>({article}));
const deleteArticles= createAction(DELETE,(id:string)=>({id}));

// initialState
// fetchArticles을 통해 불러오는 값(article 10개)을 allArr에 저장
// favoritesArr에는 즐겨찾기 페이지에만 보여지는 article들을 저장
const initialState:any = {
   allArr: [],
   favoritesArr: [],
};

//pageNum을 받아서 fetch를 사용해서 API호출
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

const addFavorites = (article:any) =>{
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


