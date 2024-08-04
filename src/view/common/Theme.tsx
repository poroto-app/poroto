export function Theme() {
    return (
        <>
            {/*MEMO:GitHub Actionsでtype checkを実行すると落ちる*/}
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            <style jsx global>
                {`
                    html {
                        font-family:
                            Helvetica,
                            Hiragino Kaku Gothic Pro,
                            Segoe UI,
                            Yu Gothic,
                            Meiryo,
                            MS PGothic,
                            sans-serif;
                        --max-page-width: 990px;
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
                        // FullScreenDialog でダイアログを閉じるときに、もとの位置にスクロールするために必要
                        //scroll-behavior: smooth;
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
                        text-decoration: none !important;
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
