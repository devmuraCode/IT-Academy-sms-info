import React, {useEffect, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import s from "./Login.module.scss";
import logo from '../../assets/image/logo.png'
import {useAppDispatch} from '../../redux/hooks'
import {login, logout} from "../../redux/reducers/usersReducer";
import {Input} from "antd";
import {useNavigate} from "react-router-dom";

type Inputs = {
    username: string;
    password: string;
};

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>();
    let [errorMsg, setErrorMsg] = useState()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(login(data)).then((response: any) => {
            console.log(response)
            if (response.error) {
                setErrorMsg(response.payload.non_field_errors[0])
            }else if (response.payload.role === 'student') {
                dispatch(logout())
                window.location.replace('https://youtu.be/dQw4w9WgXcQ?t=42')
            }
            else {
                navigate('/')
            }
        })
    };
    useEffect(() => {
        if (localStorage.getItem('Token')) navigate('/')
    }, [])

    return (
        <div className="container">
            <div className={s.parent}>
                <div className={s.login}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <img src={logo} alt=""/>
                        <p>Логин:</p>
                        <input {...register("username", {required: true})} />
                        {errors.username && <span className={s.error}>Это поле объязательно</span>}
                        <p>Пароль:</p>
                        <Controller
                            name="password"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => <Input.Password {...field} />}
                        />
                        {errors.password && <span className={s.error}>Это поле объязательно</span>}
                        <button className='btnSubmit' type="submit">Отправить</button>
                        <div className={s.errorMsg}>
                            {errorMsg}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
