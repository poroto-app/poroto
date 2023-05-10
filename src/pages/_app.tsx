import { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { reduxStore, useAppDispatch } from "src/redux/redux";
import { useEffect } from "react";
import { popHistoryStack, pushHistoryStack } from "src/redux/history";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>poroto</title>
                <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0, user-scalable=no"/>
                <meta name="theme-color" content="#F7F5EE"/>
                <link rel="manifest" href="/manifest.webmanifest"/>
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg"/>
                <link rel="icon" type="image/png" href="/favicon/favicon.png"/>
                {/* ogp */}
                <meta property="og:title" content="poroto"/>
                <meta property="og:site_name" content="poroto"/>
                <meta property="og:description" content="porotoは、あなたの暇な時間を楽しく過ごすための最適なプランを自動的に生成します！"/>
                <meta property="og:url" content="https://poroto.app/"/>
                <meta property="og:image" content="https://poroto.app/ogp/ogp.png"/>
                <meta property="og:type" content="website"/>
            </Head>
            {/*MEMO:GitHub Actionsでtype checkを実行すると落ちる*/}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
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
                    <History/>
                    <Component {...pageProps} />
                </Provider>
            </ChakraProvider>
        </>
    )
}

// ページ遷移を記録するためのコンポーネント
const History = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        let previousUrl = document.location.href;

        window.onpopstate = () => {
            if (previousUrl && previousUrl !== location.href) {
                dispatch(popHistoryStack());
            }
        }

        document.addEventListener("click", (e) => {
            if (e.target["tagName"] !== "A") return;
            const url = e.target["href"];
            if (previousUrl && previousUrl !== url) dispatch(pushHistoryStack());
            previousUrl = url;
        })
    }, []);

    return <></>
}