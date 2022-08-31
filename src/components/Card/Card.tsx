import React, {FC, useState} from 'react'
import s from './Card.module.scss'
import {GroupType, SpecialityType, UserType} from "../../types/types";
import {Link} from 'react-router-dom';
import settingsImage from '../../assets/image/settings.svg'
import {message, Modal} from "antd";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../redux/hooks";
import {getAllGroups, updateGroup} from "../../redux/reducers/usersReducer";
import Preloader from "../Preloader/Preloader";

type PropsType = {
    data: GroupType,
    specialty: Array<SpecialityType> | null,
    teachers: UserType[] | null
}

const Card: FC<PropsType> = ({data, specialty, teachers}) => {
    const dispatch = useAppDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<GroupType>();


    const onSubmit: SubmitHandler<GroupType> = (req) => {
        req.id = data.id
        dispatch(updateGroup(req)).then(() => {
            dispatch(getAllGroups()).then(() => {
                handleCancel()
                message.success('Группа обновлена')
            })
        })
        console.log(req);
        console.log(data)
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
    if (!specialty || !teachers) return <Preloader/>
    return (
        <div className={s.card}>
            <div onClick={showModal} className={s.setting}>
                <h1>{data.name}</h1>
                <img src={settingsImage} alt="Edit Group"/>
            </div>
            <Link to={`/group/${data.id}`}>
                <h2>Учитель: {data.teacher_name}</h2>
                <h2>Специальность: {data.specialty_name}</h2>
                <h2>Время старта: в {data.start_time}</h2>
                <h2>Длительность: {data.duration_hours} часа</h2>
                <h2>Продолжительность: {data.duration_monthes} месяцев</h2>
                <h2>Уроки но чётным числам?{data.even ? " - Да" : " - Нет"}</h2>
                <h2>Студенты: {data.students_num}</h2>
            </Link>
            <Modal centered title='Обновить группу' className='modalAddGroup'
                   width={1000}
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <form id='updateGroup' onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid">
                        <label>
                            <p>Название группы:</p>
                            <input type="text" placeholder='FRU_10.10.2020' {...register("name", {required: true})}
                                   defaultValue={data.name}/>
                            {errors.name && <span>Поле обязательное</span>}
                        </label>
                        <label>
                            <p>Учитель:</p>
                            <select placeholder='Выберите учителя' {...register("teacher", {required: true})}
                                    defaultValue={data.teacher_id}>
                                {teachers.map((t, key) => <option value={t.id}
                                                                  key={key}>{`${t.first_name} ${t.surname}`}</option>)}
                            </select>
                        </label>
                        <label>
                            <p>Специальность:</p>
                            <select {...register("specialty", {required: true})} defaultValue={data.specialty_id}>
                                {specialty.map((s, key) => <option value={s.id} key={key}>{s.name}</option>)}
                            </select>
                            {errors.specialty_id && <span>Поле обязательное</span>}
                        </label>
                        <label>
                            <p>Время старта:</p>
                            <input type="time" {...register("start_time", {required: true})} placeholder='Время старта'
                                   defaultValue={data.start_time}/>
                            {errors.start_time && <span>Поле обязательное</span>}
                        </label>
                        <label>
                            <p>Длительность урока:</p>
                            <input type="number" step="0.1" {...register("duration_hours", {required: true})}
                                   placeholder='1.5'
                                   defaultValue={data.duration_hours}/>
                            {errors.duration_hours && <span>Поле обязательное</span>}
                        </label>
                        <label>
                            <p>Уроки по четным числам?</p>
                            <input type="checkbox" {...register("even")} defaultChecked={data.even}/>
                        </label>
                        <label>
                            <p>Длительность курса в месяцах:</p>
                            <input type="text" placeholder='6' {...register("duration_monthes", {required: true})}
                                   defaultValue={data.duration_monthes}/>
                            {errors.duration_monthes && <span>Поле обязательное</span>}
                        </label>
                    </div>
                    <button className='btnSubmit'>Обновить</button>
                </form>
            </Modal>
        </div>
    )
}

export default Card