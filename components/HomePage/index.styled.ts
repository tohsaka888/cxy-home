import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 60px);
`

export const CoderName = styled.div`
  font-size: 3.8rem;
  font-weight: bold;
  letter-spacing: 16px;
  font-family: Roboto,Verdana,"Raleway","PingFang SC","Microsoft Yahei",sans-serif;
  color: #fff;
  text-shadow: 5px 3px 5px #cecece;
  /* background: linear-gradient(0deg, #c850c0, tomato);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`

export const CoderNameEn = styled.div`
  font-size: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: italic;
  text-shadow: 5px 3px #cecece;
  /* background: linear-gradient(30deg, #c850c0, tomato); */
  color: #fff;
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`