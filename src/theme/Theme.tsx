import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }
    
    * {
      word-wrap: break-word;
    }
    
    body {
        margin: 0;
        padding: 0;
        color: white;
        background: #212d40;
    }
    
    *:focus {
      outline: none;
    }
`;

export default GlobalStyle;