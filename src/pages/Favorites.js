import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useSelector ,useDispatch} from "react-redux"
import axios from "axios";
import { actionCreators as todoActions } from "../redux/modules/articles";
import {history} from "../redux/configureStore";
import {Link} from 'react-router-dom'
import StarIcon from '@material-ui/icons/Star';

const Favorties = (props) => {
  const dispatch = useDispatch();
  const [word,setWord] = React.useState("a")
  const favorites = useSelector((state) => state.articles.favoritesArr);

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
          {favorites.map((article)=>{
            const {multimedia,lead_paragraph,_id} = article
          
            return(
              <All key={_id}>
              <MovePage href={article.web_url}>
              <A_IMG src={`https://static01.nyt.com/${multimedia[0].url}`} alt={article.print_page}/>
              <Box>
              {lead_paragraph.length>=30?`${lead_paragraph.slice(0,31)}...more`:lead_paragraph}
              </Box>
            
            </MovePage>
             <FavortiesBtn onClick={()=>{
              // article.star=true; 
              // favorites.push(article); 
              dispatch(todoActions.deleteFavorites(_id));
              console.log(favorites);
              }}>
              {favorites.includes(article) ?<StarIcon style={{color:"blue"}}/>:<StarIcon style={{color:"lightgrey"}}/>}
            </FavortiesBtn>
        
            </All>
            )}
          )}
        </MainContainer>
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

  const FavortiesBtn = styled.button`
  
  `
  