import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    body {
      background: var(--primary-color);
      -webkit-font-smoothing: antialiased;
    }

    body, input, button {
    font: 400 16px 'Roboto', sans-serif;
      font-size: 1rem;
    }

    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 300;
    }

    button {
      cursor: pointer;
    }

    a {
      text-decoration: none;
    }

    em {
      font-size: 1.2rem;

      &.error {
        margin-top: 0.4rem;
        color: var(--red_200);
      }

      &.subtitle {
        padding-right: 1.2rem;
        margin-top: 0.4rem;
        color: var(--gray_200);
      }
    }
  }

  .skeleton-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 1.2rem 0.8rem;
  }

  .skeleton-item {
    height: 1.6rem;

    & + .skeleton-item {
      margin-left: 1.2rem;
    }
  }

  .background-1 {
    display: flex;
    position: absolute;
    inset: 40% 43% 0px 10%;
    width: 694px;
    height: 814px;
    background: radial-gradient(49.94% 50.1% at 47.9% 48.42%, rgba(252, 238, 33, 0.8) 3%, rgba(221, 209, 29, 0.8) 10%, rgba(164, 154, 21, 0.8) 24%, rgba(114, 107, 15, 0.8) 38%, rgba(73, 69, 10, 0.8) 51%, rgba(41, 39, 5, 0.8) 65%, rgba(18, 17, 2, 0.8) 77%, rgba(5, 4, 1, 0.8) 89%, rgba(0, 0, 0, 0.8) 100%);
    background-blend-mode: screen;
    mix-blend-mode: screen;
    opacity: 0.67;
    transform: matrix(0.05, -1, 1, 0.05, 0, 0);
    z-index: 5;
  }

  .background-2 {
    display: flex;
    position: absolute;
    inset: -3.89% 0.9% 9.29% 33.33%;
    background: radial-gradient(42.71% 40.4% at 49.86% 51.21%, rgba(0, 189, 212, 0.5) 0%, rgba(0, 170, 190, 0.5) 5%, rgba(0, 125, 140, 0.5) 18%, rgba(0, 87, 97, 0.5) 31%, rgba(0, 55, 62, 0.5) 45%, rgba(0, 31, 35, 0.5) 58%, rgba(0, 14, 15, 0.5) 72%, rgba(0, 3, 4, 0.5) 86%, rgba(0, 0, 0, 0.5) 100%);
    background-blend-mode: screen;
    mix-blend-mode: screen;
    opacity: 0.98;
    z-index: 5;
  }

  html {
    font-size: 62.5%;

    @media (max-width: 1400px) {
      font-size: 53% !important;
    }

    @media (max-width: 1080px) {
      font-size: 58%;
    }

    @media (max-width: 720px) {
      font-size: 54%;
    }

    @media (max-width: 425px) {
      font-size: 48%;
    }
  }

  :root {
    --primary-color: #2A004F;
    --secondary-color: #00DBAF;

    --purple: rgb(95, 0, 219);

    --red_200: #C53030;
    --red_100: #FDDEDE;

    --green_300: #2E656A;
    --green_100: #E6FFFA;

    --blue_300: #2179b5;
    --blue_200: #40c8f4;
    --blue_100: #EBF8FF;

    --gray_600: #232129;
    --gray_500: #28262E;
    --gray_400: #312E38;
    --gray_300: #3E3B47;
    --gray_200: #666360;
    --gray_150: #A1A5B7;
    --gray_100: #CED4DA;
    --gray_50: #eff2f5;

    --white_gray: #f6f6f6;
    --white: #FFFFFF;


    --shadow-smallest: 0px 2px 4px rgba(0,0,0,0.1);
    --shadow-extra-small: 0px 4px 8px rgba(0,0,0,0.12);
    --shadow-small: 0 5px 10px rgba(0,0,0,0.12);
    --shadow-medium: 0 8px 30px rgba(0,0,0,0.12);
    --shadow-large: 0 30px 60px rgba(0,0,0,0.12);
    --shadow-hover: 0 30px 60px rgba(0,0,0,0.12);

    --border-radius-small: 0.4rem;
    --border-radius-medium: 0.8rem;
    --border-radius-large: 1.2rem;
  }
`;
