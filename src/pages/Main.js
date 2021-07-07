import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";
import { actionCreators as todoActions } from "../redux/modules/articles";
import {history} from "../redux/configureStore";
import {Link} from 'react-router-dom'
import Favorties from './Favorites';

const Main = (props) => {
  const dispatch = useDispatch();
  const [term, setTerm]= useState('everything');
  const [pageNum,setPageNum] =useState(0);
  const [isLoading,setIsLoading] = useState(true)
  const [word,setWord] = React.useState("a");
  
  const articles = useSelector((state) => state.articles.allArr);

 console.log(articles);

  useEffect(()=>{
    dispatch(todoActions.fetchArticles(pageNum));
    window.scrollTo(0,0);
  },[pageNum]);


  const favoritesArr = [];
  // const fetchArticles = async() =>{
  //   try {
  //   const res = await fetch(
  //     `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=all&page=${pageNum}&api-key=wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu`
  //     )
  //   const response = await res.json()
  //   setArticles(response.response.docs);
   
  //   // console.log(response.response.docs);

  // } catch (error) {
  //   console.error(error)
  //  }
  // }

 

  // console.log(articles);

  // const Load = () => {
  //   loadArticles()
  // };
  // const apiKey = "";
  
    return (
      <React.Fragment>
      
        <Header>
          MY NYTIMES  
        </Header>
        <TopContainer>
            <SearchContainer>
               <input onChange={(e)=>{setWord(e.target.value)}} placeholder="찾고싶은 단어를 입력해주세요"></input>
            </SearchContainer>
            <FavoritesContainer>
              <button onClick={()=>{history.push("/favorites")}}>즐겨찾기</button>
            </FavoritesContainer>
        </TopContainer>
        <MainContainer>
          {articles.map((article)=>{
            // article['star']=false;
            const {multimedia,lead_paragraph,web_url,_id} = article
            if(lead_paragraph.includes(word)){
              
            return(
              <All key={_id}>
              <MovePage href={web_url}>
            
              
                
                
                
              <A_IMG src={`https://static01.nyt.com/${multimedia[0].url}`} alt={article.print_page}/>
              <Box>
              {lead_paragraph.length>=30?`${lead_paragraph.slice(0,31)}...more`:lead_paragraph}
              </Box>
              
            </MovePage>
              <FavortiesBtn onClick={()=>{article.star=true; favoritesArr.push(article); console.log(favoritesArr)}}>
              즐겨찾기
            </FavortiesBtn>
            </All>
        
            )}}
          )
          }
        </MainContainer>
        <BottomContainer 
          onClick={()=>{
          setPageNum(pageNum+1);
          console.log(pageNum);
         
        }}>
            불러오기
        </BottomContainer>
       
      </React.Fragment>
     
    );
  };
   
  
  export default Main;
  


const Header = styled.div`
width: 100%;
height: 5%;

border: 1px solid black;

`
  const TopContainer = styled.div`
   width: 100%;
   height: 5%;
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
  height: 80%;
  border: 1px solid black;

  `
  const MovePage =styled.a`
  text-decoration: none;
  
  `
  const All = styled.div`
   display: flex;
   flex-direction: row;
   border: 1px solid red;
  `

  const A_IMG = styled.img`
   width: 70px;
   height: 70px;
   background-size: cover;
  `

  const FavortiesBtn = styled.button`
  
  `
  const BottomContainer = styled.div`
  width: 100%;
  height: 10%;
  border: 1px solid black;

  `
  const Box = styled.div`
  width: 100%;
  height: 10%;
 

  `
  
