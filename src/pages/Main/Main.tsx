import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import s from './Main.module.scss'
import {message, Modal} from "antd";
import {SubmitHandler, useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import Preloader from "../../components/Preloader/Preloader";
import {createGroup, getAllGroups, getSpecialty, getTeachers} from "../../redux/reducers/usersReducer";
import {CreateGroupType} from "../../types/types";


const Main = () => {
    const dispatch = useAppDispatch()
    const {groups, specialty, teachers} = useAppSelector(state => state.usersPage)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<CreateGroupType>();

    const onSubmit: SubmitHandler<CreateGroupType> = (data) => {
        dispatch(createGroup(data)).then(() => {
            message.success("Группа создана")
            dispatch(getAllGroups())
            handleCancel()
        })
        console.log(data);
    }
    const handleOk = () => {
        setIsModalVisible(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false)
    };
    const showModal = () => {
        setIsModalVisible(true)
    }

    useEffect(() => {
        dispatch(getAllGroups())
        dispatch(getSpecialty())
        dispatch(getTeachers())
    }, [])

    if (!groups || !specialty || !teachers) return <Preloader/>
    return (
        <div>
            <Header/>
            <div className="container">
                <h1 className='title group_title'>Группы</h1>
                <div className={s.groups}>
                    {groups.map((group, key: number) => <Card key={key} data={group} teachers={teachers} specialty={specialty}/>)}
                    <div className={s.addGroup} onClick={showModal}>+</div>
                </div>
            </div>
            <Modal centered title='Создать группу?' className='modalAddGroup'
                   width={1000}
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <form id='addGroup' onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid">
                        <label>
                            <p>Название группы:</p>
                            <input type="text" placeholder='FRU_10.10.2020' {...register("name", {required: true})}/>
                            {errors.name && <span>Поле обязательное</span>}
                        </label>
                        <label>
                            <p>Учитель:</p>
                            <select defaultValue={4} {...register("teacher", {required: true})}>
                                {teachers.map((t, key) => <option value={t.id} key={key}>{`${t.first_name} ${t.surname}`}</option>)}
                            </select>
                        </label>
                        <label>
                            <p>Специальность:</p>
                            <select defaultValue='Frontend' {...register("specialty", {required: true})}>
                                {specialty.map((s, key) => <option value={s.id} key={key}>{s.name}</option>)}
                            </select>
                            {errors.specialty && <span>Поле обязательное</span>}
                        </label>
                        <label>
                            <p>Время старта:</p>
                            <input type="time" {...register("start_time", {required: true})} placeholder='Время старта'/>
                            {errors.start_time && <span>Поле обязательное</span>}
                        </label>
                        <label>
                            <p>Длительность урока:</p>
                            <input type="number" step="0.1" {...register("time", {required: true})} placeholder='1.5'/>
                            {errors.time && <span>Поле обязательное</span>}
                        </label>
                        <label>
                            <p>Уроки по четным числам?</p>
                            <input type="checkbox" {...register("even")}/>
                        </label>
                        <label>
                            <p>Длительность курса в месяцах:</p>
                            <input type="text" placeholder='6' {...register("duration", {required: true})}/>
                            {errors.duration && <span>Поле обязательное</span>}
                        </label>
                    </div>
                </form>
                <button form='addGroup' className='btnSubmit'>Создать</button>
            </Modal>
        </div>
    )
}

export default Main