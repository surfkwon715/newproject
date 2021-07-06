import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { actionCreators as todoActions } from "../redux/modules/articles";

const Main = (props) => {

  const [articles, setArticles]= useState([])
  const [term, setTerm]= useState('everything')
  const [isLoading,seIsLoading] = useState(true)

  useEffect(()=>{
   
  const fetchArticles = async() =>{
    try {
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu`
      )
    const response = await res.json()
    setArticles(response.response.docs);
    console.log(articles);

  } catch (error) {
    console.error(error)
   }
  }
    fetchArticles()
  },[])


  // const Load = () => {
  //   loadArticles()
  // };
  // const apiKey = "";
  
  // const loadArticles = () =>{
  //  
  //   axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu`)
  //     .then((response) => {
  //       console.log( response );
  //     })
  //     .catch(error => {
  //       console.log("No Connection");
  //     }); 
  // }



    return (
      <React.Fragment>
        <Header>

        </Header>
        <TopContainer>
            <SearchContainer>
                검색
            </SearchContainer>
            <FavoritesContainer>
                <button>즐겨찾기</button>
            </FavoritesContainer>
        </TopContainer>
        <MainContainer>
          {articles.map((article)=>
          
          <Box>
            {article.abstract}
            {article.web_url}
          </Box>
          )}
        </MainContainer>
        <BottomContainer>
            불러오기
        </BottomContainer>
      </React.Fragment>
    );
  };
   
  
  export default Main;
  


const Header = styled.div`
width: 100%;
height: 10vh;

border: 1px solid black;

`
  const TopContainer = styled.div`
   width: 100%;
   height: 5vh;
   display: flex;
   flex-direction: row;
   border: 1px solid black;

  `
  const SearchContainer = styled.div`
  width: 70%;
  border: 1px solid black;

  `
  const FavoritesContainer = styled.div`
  width: 20%;
  border: 1px solid black;

  `
  const MainContainer = styled.div`
  width: 100%;
  height: 60vh;
  border: 1px solid black;

  `
  const BottomContainer = styled.div`
  width: 100%;
  height: 5vh;
  border: 1px solid black;

  `
  const Box = styled.div`
  width: 100%;
  height: 10%;
  border: 1px solid black;

  `
  

// (function(){
// 	const form = document.querySelector("#search-form");
// 	const searchField = document.querySelector("#search-keyword");
// 	let searchedForText;
// 	const responseContainer = document.querySelector("#response-container");

	

// 	// submt버튼을 눌렀을 때 실행(이벤트를 등록함)
// 	form.addEventListener('submit',function(e){
// 		e.preventDefault();
// 		// ''; << 준이유 초기화한 상태에서 다시 보여주기 위해
// 		responseContainer.innerHTML ='';
// 		// searchField는 입력창
// 		searchedForText = searchField.value;

// 		 //NYT API
// 		 const articleRequest = new XMLHttpRequest();
// 		 articleRequest.onload = addArticles;
// 		 articleRequest.onerror = function (err) {
// 			 requestError(err, 'articles');
// 		 }
// 		 articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nytAPIKey}`);
// 		 articleRequest.send();
 
// 		 function addArticles() {
// 			 let htmlContent = '';
// 			 const data = JSON.parse(this.responseText);
// 			 if (data && data.response.docs && data.response.docs[0]) {			
 
// 				 htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
// 					 <h1><a href="${article.web_url}" target="_blank">${article.headline.print_headline}</h1></a>
// 					 <h2>${article.headline.main}</h2>
// 					 <p>${article.snippet}</p></li>`
// 				 ).join('') + '</ul>';
 
 
// 			 } else {
// 				 htmlContent = '<div class="error-no-articles">No articles available </div>';
// 			 }
 
// 			 responseContainer.insertAdjacentHTML('afterend', htmlContent);
// 		 }




// 	});
// })();