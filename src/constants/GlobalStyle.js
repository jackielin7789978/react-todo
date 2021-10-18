import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    height: 100vh;
    font-family: 'Roboto', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  button {
    border: none;
    cursor: pointer;
  }
`
export default GlobalStyle
