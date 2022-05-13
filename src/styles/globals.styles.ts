import { global } from "styled-jsx/css";

export default global`
*,::before,::after {
  margin: 0;
  padding: 0;
  list-style: none;
}

body,html{
  height:100%;
  overflow-x: hidden;
}

h1, h2, h3 {
  font-weight: 400;
  font-family: 'Mukta', sans-serif;
}

p {
  font-weight: 500;
  font-family: 'Noto Sans TC', sans-serif;
}

a{
  cursor:pointer;
  outline: none;
  text-decoration: none;
}

ul{
  padding:0px;
  margin:0px;
}

img{
  width:100%;
  height:100%;
  object-fit:cover;
}

button{
  background:transparent;
  outline:none;
  border:none;
  cursor:pointer;
}

.title {
  width:100%;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  color: #2b2a2a;
  text-shadow: 10px 10px 20px #4e4949;
  padding-top:1rem;
  padding-bottom:0.5rem;
}

h1 {
  width:100%;
  height: 100px;
  text-align: center;
  line-height: 2.7;
  font-size: 35px;
  color: #fff;
}

.swipe-zoom-up:hover{
  transform:scale(1.2);
  transition: 0.5s ease-in-out;
}
`;
