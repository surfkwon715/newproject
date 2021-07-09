import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as todoActions } from "../redux/modules/articles";
import { history } from "../redux/configureStore";


import styled from "styled-components";
import "../font.css";

import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
 
// 메인화면을 나타내는 컴포넌트입니다
// 구성: Header + TopContainer + MainContainer + BottomContainer
// 기능: 
//  1. pageNum을 dependency로 설정하고 fetchArticles에 parameter로 전달해서 렌더링
//  2. API에서 받은 정보 중 이미지와 본문내용 추출 + 카드에 링크를 달아 클릭시 해당 페이지로 이동
//  3-1. 해당 카드마다 별모양의 버튼을 누르면 해당 article의 _id값이 localStorage.data의 value값에 string으로 더해져서 저장  
//  3-2. localStorage.date에 _id가 있는지의 여부에 따라 별의 색상을 변경시켜 구분합니다 
//  4. 사용자의 입력에 따른 검색기능
//  5. 즐겨찾기 페이지로 이동
//  6. 불러오기 버튼을 누르면 
const Main = (props) => {
  const dispatch = useDispatch();
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
        <div className="Title" style={{ margin: "1%", padding: "1%"}}>Awesome New York Times </div>  
      </Header>
      <TopContainer>
          <SearchContainer>
            <SearchIcon/>
            <SearchBox onChange={(e)=>{setWord(e.target.value)}} placeholder="Please click here and Search contents.."></SearchBox >
          </SearchContainer>
          <FavoritesContainer>
            <FavoritesBtn onClick={()=>{history.push("/favorites")}}>⭐ Your Favorites</FavoritesBtn > 
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
                  <BText>
                  {lead_paragraph.length>=30? <div>{lead_paragraph.slice(0,31)} <span style={{color:"grey"}}>...more</span> </div> :lead_paragraph}
                  </BText>
                </Box>
              </MovePage>
              <FavortiesBtn onClick={()=>{
                dispatch(todoActions.addFavorites(article));
                localStorage.data+=_id;
                }}>
              {localStorage.data? localStorage.data.includes(_id) ?<StarIcon style={{color:"gold"}}/>:<StarIcon style={{color:"grey"}}/>: <StarIcon style={{color:"grey"}}/>}
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
        <BText>
          Do you want more articles?... <span style={{color:"blue"}}> 불러오기</span>
        </BText>
      </BottomContainer>
    </React.Fragment>
  )};
  export default Main;
  
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
  
