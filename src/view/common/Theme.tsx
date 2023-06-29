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
                        --color-primary-400: var(--color-brown-400);
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
        </>
    );
}
