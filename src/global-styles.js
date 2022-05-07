import { css } from '@emotion/react'
import { layout } from './utils/utils';

const fontColors = {
  head1: '#141416',
  head2: '#0E342C',
  head3: '#2F695D',
  body: '#314235',
  links: '#00AB88'
}

const cssReset = css`
    body {
        margin: 0px;
        padding: 0px;
    }

`;

const fonts = css`

    p {
        color: ${fontColors.body};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: ${layout.reponsiveCssValue(14, 18, 1200, 14, 1600, 18)};
        line-height: 156%;
        letter-spacing: ${layout.reponsiveCssValue(0.384712, 0.5, 1200, 0.384712, 1600, 0.5)};
    }

    h1 { 
        color: ${fontColors.head1};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: ${layout.reponsiveCssValue(34, 44, 1200, 34, 1600, 44)};
        line-height: ${layout.reponsiveCssValue(44, 58, 1200, 44, 1600, 58)};
    }

    h2 { 
        color: ${fontColors.head1};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: ${layout.reponsiveCssValue(28, 36, 1200, 28, 1600, 36)};
        line-height: ${layout.reponsiveCssValue(44, 58, 1200, 44, 1600, 58)};
    }

    h3 {
        color: ${fontColors.head2};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: ${layout.reponsiveCssValue(22, 28, 1200, 22, 1600, 28)};
        line-height: ${layout.reponsiveCssValue(34, 44, 1200, 34, 1600, 44)};
    }

    h4 { 
        color: ${fontColors.head2};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: ${layout.reponsiveCssValue(18, 24, 1200, 18, 1600, 24)};
        line-height: ${layout.reponsiveCssValue(29, 38, 1200, 29, 1600, 38)};
    }

    h5 { 
        color: ${fontColors.head2};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: ${layout.reponsiveCssValue(16, 20, 1200, 16, 1600, 20)};
        line-height: ${layout.reponsiveCssValue(26, 32, 1200, 26, 1600, 32)};
    }

    h6 { 
        color: ${fontColors.head2};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: ${layout.reponsiveCssValue(14, 18, 1200, 14, 1600, 18)};
        line-height: ${layout.reponsiveCssValue(22, 28, 1200, 22, 1600, 28)};
    }

    .button1 { 
        color: ${fontColors.head3};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: ${layout.reponsiveCssValue(13, 16, 1200, 13, 1600, 16)};
        line-height: ${layout.reponsiveCssValue(21, 26, 1200, 21, 1600, 26)};
    }

    .button2 { 
        color: ${fontColors.links};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: ${layout.reponsiveCssValue(13, 16, 1200, 13, 1600, 16)};
        line-height: ${layout.reponsiveCssValue(21, 26, 1200, 21, 1600, 26)};
        text-transform: uppercase;
    }


    .small-text1 {
        color: ${fontColors.head3};
        font-family: "IBM Plex Sans", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: ${layout.reponsiveCssValue(13, 16, 1200, 13, 1600, 16)};
        line-height: ${layout.reponsiveCssValue(21, 26, 1200, 21, 1600, 26)};
        letter-spacing: ${layout.reponsiveCssValue(0.5, 0.5, 1200, 0.5, 1600, 0.5)};

        &.bold {
            font-weight: 700;
            font-size: ${layout.reponsiveCssValue(11, 14, 1200, 11, 1600, 14)};
            line-height: ${layout.reponsiveCssValue(17.6, 22, 1200, 17.6, 1600, 22)};
            letter-spacing: ${layout.reponsiveCssValue(0.5, 0.5, 1200, 0.5, 1600, 0.5)};
        }

        &.semibold {
            font-weight: 600;
            font-size: ${layout.reponsiveCssValue(11, 14, 1200, 11, 1600, 14)};
            line-height: ${layout.reponsiveCssValue(17.6, 22, 1200, 17.6, 1600, 22)};
            letter-spacing: ${layout.reponsiveCssValue(0.5, 0.5, 1200, 0.5, 1600, 0.5)};
        }
    }

`;


const globalStyle = () =>
  css([
    cssReset,
    fonts,
  ]);

export default globalStyle;