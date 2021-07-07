import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { actionCreators as todoActions } from "../redux/modules/articles";
import {history} from "../redux/configureStore";
import {Link} from 'react-router-dom'

const Favorties = (props) => {

  const [articles, setArticles]= useState([])
  const [term, setTerm]= useState('everything')
  const [isLoading,setIsLoading] = useState(true)
  const [word,setWord] = React.useState("a")


  const fetchArticles = async() =>{
    try {
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu`
      )
    const response = await res.json()
    setArticles(response.response.docs);
   
    // console.log(response.response.docs);

  } catch (error) {
    console.error(error)
   }
  }

  useEffect(()=>{

    fetchArticles()
  },[])

  console.log(articles);

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
          MY NYTIMES  
        </Header>
        <TopContainer>
            <SearchContainer>
               <input onChange={(e)=>{setWord(e.target.value)}} placeholder="찾고싶은 단어를 입력해주세요"></input>
            </SearchContainer>
            <FavoritesContainer>
            <button onClick={()=>{history.push("/")}}>메인으로</button>
            </FavoritesContainer>
        </TopContainer>
        <MainContainer>
          {articles.map((article)=>{
            const {multimedia,lead_paragraph} = article
            if(article.star==true){
              
            return(
              <MovePage href={article.web_url}>
            <All key={article._id}>
              
                
                
                
              <A_IMG src={`https://static01.nyt.com/${multimedia[0].url}`} alt={article.print_page}/>
              <Box>
              {lead_paragraph.length>=30?`${lead_paragraph.slice(0,31)}...more`:lead_paragraph}
              </Box>
              
              
              
              
              
            
              
             
            </All>
            </MovePage>
            )}}
          )}
        </MainContainer>
        <BottomContainer onClick={()=>{fetchArticles();}}>
            불러오기
        </BottomContainer>
      </React.Fragment>
    );
  };
   
  
  export default Favorties;
  


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
  height: 150vh;
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
  const BottomContainer = styled.div`
  width: 100%;
  height: 5vh;
  border: 1px solid black;

  `
  const Box = styled.div`
  width: 100%;
  height: 10%;
 

  `
  