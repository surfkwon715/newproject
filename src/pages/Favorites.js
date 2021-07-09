import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useSelector ,useDispatch} from "react-redux"
import { actionCreators as todoActions } from "../redux/modules/articles";
import {history} from "../redux/configureStore";
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
        <div className="Title" style={{ margin: "1%", padding: "1%"}}>Awesome New York Times </div>  
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
              {lead_paragraph.length>=30?`${lead_paragraph.slice(0,31)}  ...more`:lead_paragraph}
              </Box>
            
            </MovePage>
             <FavortiesBtn onClick={()=>{
               dispatch(todoActions.deleteFavorites(_id));
              console.log(favorites);

              let modifiedData = localStorage.data.replace(_id," ");
              localStorage.data = modifiedData;
              }}>
              {favorites.includes(_id) ?<StarIcon style={{color:"blue"}}/>:<StarIcon style={{color:"lightgrey"}}/>}
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
    margin: auto;
    justify-content: center;
    width: 90%;
    height: 15vh;
    font-size: 9vh;
    background-color: beige;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #121212;
    font-weight: 500px;
    letter-spacing: 2px;
  
  `
  const TopContainer = styled.div`
    width: 90%;
    height: 8vh;
    display:flex;
    margin:auto;
    justify-content: center;
    flex-direction: row;
  `
  const SearchContainer = styled.div`
    padding: 1% 0% 0% 7%;
    display:flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    height: 100%;
    background-color: beige;
    color: black;
   
  `

  const SearchBox =styled.input`
   width: 100%;
   height:90%;
   background-color: beige;
   color: white;
   font-size: 20px;
   font-weight: bold;
   outline :none;
   border: none;
   margin-left: 10px;
  `
  const FavoritesContainer = styled.div`
   display:  flex; 
  width: 20%;
    font-size: 25px;
    background-color: beige;
    color: white;
    padding: 1% 12% 0% 0%;
    align-items: center;
  `
  const  FavoritesBtn = styled.button`
  font-size: 20px;
  background-color: beige;
  color: grey;
  outline: none;
  border:none;
  font-weight: bold;
  margin-top: 1%;
  cursor: pointer;
`
 
  const MainContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    width: 90%;
    height: 250vh;
    margin:auto;
    justify-content: center;
    background-color: beige;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  `
  const MovePage =styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  
  width: 90%;
  :hover {
    box-shadow: 2px 5px 12px 2px black ;
    transition: box-shadow 0.2s ease-in 0s;
  }
  
  `
  const All = styled.div`
   display: flex;
   flex-direction: row;
   width:40%;
   height:40vh;
   flex-direction: row;
   margin: 3%;
  `

  const A_IMG = styled.img`
   display: flex;
   width: 100%;
   height: 80%;
  `

  const FavortiesBtn = styled.button`
   display:flex;
   flex-direction:flex-start;
   width: 10%;
   height:10%;
   outline: none;
   border: none;
   margin-left: 15px;
   background-color: beige;
   cursor: pointer;
  `
  const BottomContainer = styled.div`
  width: 90%;
  height: 15vh;
  background-color: beige;
  color: black;
  display:flex;
  margin:auto;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  `
  const Box = styled.div`
  display: flex;
  width:100%;
  height:20%;
  background-color: black;
  color: white;
  font-weight: bold;
  align-items: center;
  `

  const BText = styled.div`
  display: flex;
  margin: auto;
  cursor: pointer;
  `
  
