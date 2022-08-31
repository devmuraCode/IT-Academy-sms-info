import s from './Page404.module.scss'

const Page404 = () => {

    function goBack() {
        window.history.back();
    }

    return (
        <div>
            <div className={s.flex_container}>
                <div className={s.text_center}>
                    <h1>
                        <div className={s.cookie}>
                            <span className={s.fade_in} id={s.digit3}>&#62;</span>
                            <span className={s.fade_in} id={s.digit1}>&#60;</span>
                        </div>
                        <span className={s.fade_in} id={s.digit2}><strong>︵</strong></span>

                    </h1>
                    <h3 className={s.fade_in}>СТРАНИЦА НЕ НАЙДЕНА</h3>
                    <button onClick={goBack} type="button" name="button">ВЕРНУТСЯ НА ПРЕДЫДУЩУЮ СТРАНИЦУ</button>
                </div>
            </div>
        </div>
    )

}

export default Page404;