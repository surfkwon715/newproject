import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as todoActions } from "../redux/modules/articles";
import {history} from "../redux/configureStore";
import Favorties from './Favorites';
import StarIcon from '@material-ui/icons/Star';

const Main = (props) => {
  const dispatch = useDispatch();
  // const [term, setTerm]= useState('everything');
  const [pageNum,setPageNum] =useState(0);
  const [word,setWord] = React.useState("a");
  const articles = useSelector((state) => state.articles.allArr);  
  const favorites = useSelector((state) => state.articles.favoritesArr);

  useEffect(()=>{
    dispatch(todoActions.fetchArticles(pageNum));
    window.scrollTo(0,0);
  },[pageNum]);



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
                <FavortiesBtn onClick={()=>{
                  dispatch(todoActions.addFavorites(article));
                  console.log(favorites);
                
                  }}>
                {favorites.includes(article) ?<StarIcon style={{color:"blue"}}/>:<StarIcon style={{color:"lightgrey"}}/>}
                </FavortiesBtn>
            </All>
            )}}
          )}
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
  
