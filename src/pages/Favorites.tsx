import React from 'react';
import styled from "styled-components";
import { useSelector ,useDispatch} from "react-redux"
import { actionCreators as todoActions } from "../redux/modules/articles";
import {history} from "../redux/configureStore";
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import "../font.css";

export interface IArticle {
  multimedia:any;
  lead_paragraph:string;
  _id:string; 
  web_url:string;
  print_page: string;
  abstract: string;
}

// 즐겨찾기 화면을 나타내는 컴포넌트입니다
// 구성: Header + TopContainer + MainContainer 
// 기능:  
//  1. 메인화면과 동일하게 API에서 받은 정보 중 이미지와 본문내용 추출 + 카드에 링크를 달아 클릭시 해당 페이지로 이동합니다
//  (수정사항) 2. localStorage.data에 _id가 있는지의 여부를 판단하고 즐겨찾기 해제가 되도록합니다 => 리덕스로 이동
//  3. 메인화면과 동일하게 사용자의 입력에 따른 검색기능이 있습니다
//  4. 메인페이지로 이동합니다

const Favorties = () => {

  const dispatch = useDispatch();
  const [word,setWord] = React.useState(" ")
  const favorites = useSelector((state:any) => state.articles.favoritesArr);
  
    return (
      <React.Fragment>

        <Header>
          <Title>Awesome New York Times</Title>  
        </Header>

        <TopContainer>
          <SearchContainer>
            <SearchIcon style={{paddingLeft:"10px"}}/>
            <SearchBox onChange={(e)=>{setWord(e.target.value)}} placeholder="Search contents here.."></SearchBox >
          </SearchContainer>
          <FavoritesContainer>
            <FavoritesBtn onClick={()=>{history.push("/")}}>
              🏠 Main Page
            </FavoritesBtn > 
          </FavoritesContainer>
        </TopContainer>

        <MainContainer>
          {favorites.map((article:IArticle)=>{
            const {multimedia,lead_paragraph,_id,web_url,abstract}  = article

            if(lead_paragraph.includes(word)){
            //(수정사항) 별모양버튼을 누를 시에 replace함수를 사용하여 해당 string을 제거합니다=> 리덕스로 이동 + 메인화면과 동일하게 조건부렌더링을 합니다
            return(
              <All key={_id}>
                <MovePage href={web_url}>
                  <A_IMG src={`https://static01.nyt.com/${multimedia[0].url}`} alt={abstract}/>
                  <Box>
                    {lead_paragraph.length>=30?`${lead_paragraph.slice(0,31)}  ...more`:lead_paragraph}
                  </Box>
                </MovePage>
                <FavortiesBtn onClick={()=>{
                  dispatch(todoActions.deleteFavorites(_id));
                  }}>
                  {localStorage.data.includes(_id) ?<StarIcon style={{color:"gold"}}/>:<StarIcon style={{color:"lightgrey"}}/>}
                </FavortiesBtn>
              </All>
            )}}
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
  @media (max-width: 768px){
    font-size: 3rem;
    height: 6vh;
   };
  @media (max-width: 376px){
    font-size: 1rem;
    height: 4vh;
  };
`

const Title = styled.div`
    font-family: 'NewYork';
    margin: 1%; 
    padding: 1%;
  `

const TopContainer = styled.div`
  width: 90%;
  height: 8vh;
  display:flex;
  margin:auto;
  justify-content: center;
  flex-direction: row;
  @media (max-width: 768px){
    height: 3vh;
  };
`
const SearchContainer = styled.div`
  padding: 0% 0% 0% 7%;
  display:flex;
  flex-direction: row;
  align-items: center;
  width: 70%;
  height: 100%;
  background-color: beige;
  color: black;
`

const SearchBox =styled.input`
  width: 100%;
  height:90%;
  background-color: beige;
  color: black;
  font-size: 20px;
  font-weight: bold;
  outline :none;
  border: none;
  margin-left: 10px;
  @media (max-width: 768px){
  font-size: 13px;
  };
  @media (max-width: 376px){
  font-size: 1px;
  margin-left: 4px;
  };
`
const FavoritesContainer = styled.div`
  display:  flex; 
  width: 30%;
  height:100%;
  background-color: beige;
  color: white;
  padding: 0% 12% 0% 0%;
  align-items: center;
`
const  FavoritesBtn = styled.button`
  display:flex;
  flex-direction:row;
  width: 100%;
  font-size: 20px;
  background-color: beige;
  color: grey;
  outline: none;
  border:none;
  font-weight: bold;
  margin-top: 1%;
  cursor: pointer;
  @media (max-width: 768px){
  font-size: 13px;
  };
  @media (max-width: 376px){
  font-size: 10px;
  };
`

const MainContainer = styled.div`
  display:flex;
  flex-wrap: wrap;
  width: 90%;
  height: 80%;
  margin:auto;
  justify-content: center;
  background-color: beige;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @media (max-width: 768px){
    height:120vh;
   };
   @media (max-width: 376px){
    width:90%;
    height:350vh;
  };
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
  height:15%;
  flex-direction: row;
  margin: 3%;
  @media (max-width: 768px){
  height:20vh;
  };
  @media (max-width: 376px){
  width:80%;
  height:30vh;
  };
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

const Box = styled.div`
  display: flex;
  width:100%;
  height:20%;
  background-color: black;
  color: white;
  font-weight: bold;
  align-items: center;
`

