import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useSelector ,useDispatch} from "react-redux"
import { actionCreators as todoActions } from "../redux/modules/articles";
import {history} from "../redux/configureStore";
import {Link} from 'react-router-dom'
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import "../font.css";

const Favorties = (props) => {
  const dispatch = useDispatch();
  const [word,setWord] = React.useState("a")
  const favorites = useSelector((state) => state.articles.favoritesArr);

    return (
      <React.Fragment>
        <Header>
        <div className="Title" style={{margin: "auto 1%"}}>AWESOME New York TIMES </div>  
        </Header>
        <TopContainer>
        <SearchContainer>
               <SearchIcon style={{marginLeft:"15px"}}/>
               <SearchBox onChange={(e)=>{setWord(e.target.value)}} placeholder="Please click here and Search contents.."></SearchBox >
            </SearchContainer>
            <FavoritesContainer>
        
              <FavoritesBtn onClick={()=>{history.push("/")}}>Back to Main Page</FavoritesBtn > 
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
    display:flex;
    margin:auto;
    justify-content: center;
    width: 90%;
    height: 10vh;
    border: 1px solid black;
    font-size: 5vh;
    font-weight: bold;
    background-color: black;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: white;
    letter-spacing: 2px;

  `
  const TopContainer = styled.div`
    width: 90%;
    height: 5vh;
    display:flex;
    margin:auto;
    justify-content: center;
    flex-direction: row;
    border: 1px solid black;
  `
  const SearchContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    height: 100%;
    background-color: black;
    color: white;
    margin-left: 0px;
  `

  const SearchBox =styled.input`
   width: 100%;
   height:90%;
   background-color: black;
   color: white;
   font-size: 20px;
   font-weight: bold;
   outline :none;
   border: none;
   margin-left:5px;
  `
  const FavoritesContainer = styled.div`
    width: 50%;
    font-size: 25px;
    background-color: black;
    color: white;
    
    
  `
  const  FavoritesBtn = styled.button`
  font-size: 20px;
  background-color: black;
  color: grey;
  outline: none;
  border:none;
  font-weight: bold;
 
  margin-top: 1%;
`
 
  const MainContainer = styled.div`
    width: 90%;
    height: 80%;
    border: 1px solid black;
    
    margin:auto;
    justify-content: center;
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
  