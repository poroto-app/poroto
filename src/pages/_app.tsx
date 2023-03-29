import {AppProps} from "next/app";
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/react";
import {Provider} from "react-redux";
import {reduxStore} from "src/redux/redux";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>poroto</title>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
            </Head>
            {/*@ts-ignore*/}
            <style jsx global>
                {`
                  html {
                    font-family: Helvetica, Hiragino Kaku Gothic Pro, Segoe UI, Yu Gothic, Meiryo, MS PGothic, sans-serif;
                  }

                  button {
                    border-style: none;
                    background-color: transparent;
                    font-size: inherit;
                  }

                  button:focus {
                    outline: none;
                  }

                  html,
                  body,
                  #__next {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    min-width: 370px;
                  }

                  h1,
                  h2,
                  h3,
                  h4,
                  h5,
                  h6 {
                    margin: 0;
                  }

                  a {
                    text-decoration: none;
                    color: inherit;
                  }

                  a:hover {
                    cursor: pointer;
                  }

                  ol,
                  ul {
                    list-style: none;
                  }
                `}
            </style>
            <ChakraProvider>
                <Provider store={reduxStore}>
                    {/*@ts-ignore*/}
                    <Component {...pageProps} />
                </Provider>
            </ChakraProvider>
        </>
    )
}