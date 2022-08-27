import styled from "styled-components";

export const Container = styled.div`
  background-color: transparent;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  justify-content: space-between;
  position: fixed;
  width: 100vw;
`

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
`

export const Logo = styled.div`
  background: linear-gradient(30deg, #c850c0, #ffcc70);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  font-weight: bolder;
  letter-spacing: 0;
  font-style: italic;
`