import s from "./CreateUser.module.scss";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import React, {useEffect, useState} from "react";
import {Input, message, Select} from "antd";
import NumberFormat from "react-number-format";
import Header from "../../components/Header/Header";
import {UserType} from "../../types/types";
import {createStudent, getPayers, updateUser} from "../../redux/reducers/usersReducer";
import Preloader from "../../components/Preloader/Preloader";

const {Option} = Select;

const CreateUser = () => {
    const dispatch = useAppDispatch();
    const {payers, userDetail} = useAppSelector(state => state.usersPage)
    let [role, setRole] = useState(userDetail && userDetail.role || "student");
    let [reqPayers, setReqPayers]: any = useState();
    let [isPayer, setIsPayer] = useState(userDetail && userDetail.paid_by_parents);
    const {register, handleSubmit, control, formState: {errors}} = useForm<UserType>();
    const onSubmit: SubmitHandler<UserType> = (data) => {
        data.parent = reqPayers;
        console.log(data)
        if (!userDetail) {
            dispatch(createStudent(data)).then((res: any) => {
                if (res.error) {
                    message.error('Произошла ошибка! Проверьте введенные данные')
                } else {
                    message.success("Пользователь создан")
                    dispatch(getPayers())
                }
            })
        } else {
            data.id = userDetail.user_id
            dispatch(updateUser(data)).then((res: any) => {
                if (res.error) {
                    message.error('Произошла ошибка! Проверьте введенные данные')
                } else {
                    message.success("Пользователь обновлен")
                    dispatch(getPayers())
                }
            })
        }
    };

    const handleChange = (value: number[]) => {
        //console.log(value.map((n) => Number(n)));
        setReqPayers(value)
    };

    useEffect(() => {
        dispatch(getPayers())
    }, [])

    if (!payers) return <Preloader/>

    return (
        <div>
            <Header/>
            <div className="container">
                <div className={s.settings}>
                    <h2 className="title">{userDetail ? 'Обновить данные пользователя' : 'Создать нового студента'}</h2>
                    <div className={s.content}>
                        <h3>О себе</h3>
                        <form id='create' onSubmit={handleSubmit(onSubmit)}>
                            <div className={s.doubleField}>
                                <div className={s.field}>
                                    <p>Имя:</p>
                                    {errors.first_name && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <input
                                        placeholder='Ваше имя'
                                        type="text"
                                        defaultValue={userDetail?.first_name}
                                        {...register("first_name", {required: true})}
                                    />
                                </div>

                                <div className={s.field}>
                                    <p>Фамилия:</p>
                                    {errors.surname && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <input
                                        placeholder='Ваша фамилия'
                                        type="text"
                                        defaultValue={userDetail?.surname}
                                        {...register("surname", {required: true})}
                                    />
                                </div>
                                <div className={s.field}>
                                    <p>Отчество:</p>
                                    {errors.last_name && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <input
                                        placeholder='Ваша отчество'
                                        type="text"
                                        defaultValue={userDetail?.last_name}
                                        {...register("last_name")}
                                    />
                                </div>

                                <div className={s.field}>
                                    <p>Логин:</p>
                                    {errors.username && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <input
                                        placeholder='Ваш логин'
                                        type="text"
                                        defaultValue={userDetail?.username}
                                        {...register("username", {required: true})}
                                    />
                                </div>
                                <div className={s.field}>
                                    <p>Email:</p>
                                    {errors.email && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <input
                                        placeholder='Ваш Email'
                                        type="text"
                                        defaultValue={userDetail?.email}
                                        {...register("email")}
                                    />
                                </div>

                                <div className={s.field}>
                                    <p>Роль:</p>
                                    {errors.role && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <Controller
                                        name="role"
                                        control={control}
                                        render={({field}) => (
                                            <select defaultValue={userDetail?.role} onChange={(e: any) => {
                                                field.onChange(e);
                                                setRole(e.target.value);
                                                console.log(role)
                                            }}>
                                                <option value={"student"}>Студент</option>
                                                <option value={"payer"}>Родитель</option>
                                                <option value={"teacher"}>Учитель</option>
                                                <option value={"admin"}>Админ</option>
                                            </select>
                                        )}
                                    />
                                </div>
                                <div className={s.field}>
                                    <p>Работает?</p>
                                </div>
                                <div className={s.input}>
                                    <input type='checkbox' defaultChecked={userDetail?.work} {...register("work")}/>
                                </div>
                                {(role === 'student' || isPayer) && <>
                                    <div className={s.field}>
                                        <p>Платят родители?</p>
                                    </div>
                                    <div className={s.input}>
                                        <input type='checkbox'
                                               defaultChecked={userDetail?.paid_by_parents} {...register("paid_by_parents")}
                                               onClick={(e: any) => {
                                                   setIsPayer(e.target.checked)
                                               }}/>
                                    </div>
                                    <div className={s.field}>
                                        <p>Учиться?</p>
                                    </div>
                                    <div className={s.input}>
                                        <input type='checkbox'
                                               defaultChecked={userDetail?.study} {...register("study")}/>
                                    </div>
                                </>}
                                {isPayer && <>
                                    <div className={s.field}>
                                        <p>Выберите родителей::</p>
                                    </div>
                                    <div className={s.select}>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            showSearch
                                            placeholder="Выберите родителей"
                                            onChange={handleChange}
                                            defaultValue={userDetail?.parent}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA!.children as unknown as string)
                                                    .toLowerCase()
                                                    .localeCompare((optionB!.children as unknown as string).toLowerCase())
                                            }
                                        >
                                            {payers.map((u, key) =>
                                                <Option value={u.id}
                                                        key={key}>{`${u.first_name} ${u.surname}`}</Option>)}
                                        </Select>
                                    </div>
                                </>}
                                <div className={s.field}>
                                    <p>Ваш телеграм аккаунт:</p>
                                </div>
                                <div className={s.input}>
                                    <input
                                        placeholder="@username или ссылка"
                                        type="text"
                                        defaultValue={userDetail?.telegram}
                                        {...register("telegram")}
                                    />
                                </div>
                                <div className={s.field}>
                                    <p>Телефон:</p>
                                    {errors.phone && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        defaultValue={userDetail?.phone}
                                        rules={{required: true}}
                                        render={({field}) => (
                                            <NumberFormat
                                                defaultValue={userDetail?.phone}
                                                format="+998 ## ###-##-##"
                                                mask={"_"}
                                                placeholder="90 123-45-67"
                                                onChange={(e: any) => {
                                                    field.onChange(e.target.value);
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={s.field}>
                                    <p>Дата рождения:</p>
                                    {errors.dob && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <Controller
                                        name="dob"
                                        control={control}
                                        rules={{required: false}}
                                        defaultValue={userDetail?.dob}
                                        render={({field}) => (
                                            <NumberFormat
                                                defaultValue={userDetail?.dob}
                                                format="####-##-##"
                                                mask={"_"}
                                                placeholder="2021-06-10"
                                                onChange={(e: any) => {
                                                    field.onChange(e.target.value);
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={s.field}>
                                    <p>Гендер:</p>
                                    {errors.gender && (
                                        <span className="error">Поле обязательно</span>
                                    )}
                                </div>
                                <div className={s.input}>
                                    <select
                                        defaultValue={userDetail?.gender}
                                        placeholder="Пол"
                                        {...register("gender", {required: false})}
                                    >
                                        <option value="man">Мужчина</option>
                                        <option value="woman">Женщина</option>
                                    </select>
                                </div>
                                <div className={s.hidden}/>
                            </div>
                            <>
                                <h3>Пароль</h3>
                                <div className="passwords">
                                    <div className={s.field}>
                                        <p>Пароль:</p>
                                        {errors.password && (
                                            <span className="error">Поле обязательно</span>
                                        )}
                                    </div>
                                    <div className={s.input}>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{required: false}}
                                            render={({field}) => (
                                                <Input.Password
                                                    onChange={(e: any) => {
                                                        field.onChange(e);
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </>
                            <button form='create' className="btnSubmit" type="submit">
                                {userDetail ? 'Обновить пользователя' : 'Создать студента'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;