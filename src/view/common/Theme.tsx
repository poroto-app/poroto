export function Theme() {
    return (
        <>
            {/*MEMO:GitHub Actionsでtype checkを実行すると落ちる*/}
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            <style jsx global>
                {`
                    html {
                        font-family: Helvetica, Hiragino Kaku Gothic Pro,
                            Segoe UI, Yu Gothic, Meiryo, MS PGothic, sans-serif;
                        --max-page-width: 990px;
                    }

                    :root {
                        --color-brown-400: #ac8e6c;
                        --color-brown-500: #8c6d5c;
                        --color-brown-600: #6c4d4c;
                        --color-brown-700: #4c2d3c;
                        --color-brown-800: #2c230d;

                        --color-beige-200: #f7f5ee;
                        --color-beige-300: #d8bfc5;
                        --color-beige-400: #bba0a6;
                        --color-beige-500: #958797;

                        --color-primary-400: var(--color-brown-400);
                        --color-primary-500: var(--color-brown-500);
                        --color-primary-600: var(--color-brown-600);
                        --color-primary-700: var(--color-brown-700);
                        --color-primary-800: var(--color-brown-800);
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
                        appearance: none;
                    }

                    a:hover {
                        cursor: pointer;
                        text-decoration: none;
                        appearance: none;
                    }

                    ol,
                    ul {
                        list-style: none;
                    }
                `}
            </style>
        </>
    );
}
