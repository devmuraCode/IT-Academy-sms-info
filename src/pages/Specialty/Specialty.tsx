import {SubmitHandler, useForm} from "react-hook-form";
import Header from "../../components/Header/Header";
import s from './Specialty.module.scss'
import React, {useEffect, useState} from "react";
import {createSpecialty, deleteSpecialty, getSpecialty} from "../../redux/reducers/usersReducer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import Preloader from "../../components/Preloader/Preloader";
import {CreateSpecialtyType, SpecialityType} from "../../types/types";
import {message, Modal} from "antd";
import deleteImage from "../../assets/image/delete.svg"

import {useNavigate, useParams} from "react-router-dom";


const Specialty = () => {
    const dispatch = useAppDispatch()
    const {id}: any = useParams()
    const navigate = useNavigate()
    let {specialty} = useAppSelector(state => state.usersPage)
    const {register, handleSubmit, formState: {errors}} = useForm<CreateSpecialtyType>();
    const [isModalVisible, setIsModalVisible] = useState(false)
    const handleOk = () => {
        setIsModalVisible(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false)
    };
    const showModal = () => {
        setIsModalVisible(true)
    }

    const onSubmit: SubmitHandler<CreateSpecialtyType> = (data) => {
        dispatch(createSpecialty(data)).then(() => {
            message.success("Специальность создана")
            dispatch(getSpecialty())
        })
    }

    let deleteSpeciality = (id: number) => {
        dispatch(deleteSpecialty(id)).then(() => {
            message.success('Специальность удалена')
            dispatch(getSpecialty())
        })
    }


    useEffect(() => {
        dispatch(getSpecialty())
    }, [])

    if (!specialty) return <Preloader/>
    return (
        <div>
            <Header/>
            <div className="container">
                <div className={s.specialty}>
                    <h1 className="title">Создать специальности</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder='Название' {...register("name", {required: true})}/>
                        <button className='btnSubmit'>Создать специальность</button>
                    </form>

                    <h2>Все специальности:</h2>
                    {specialty.map((sp, key) => <div className={s.speciality}>
                        <p key={key}>{sp.name}</p>
                        <img key={key} className={s.specialty_img} src={deleteImage} alt="delete" onClick={() => {
                            deleteSpeciality(sp.id)
                        }}/>

                    </div>)}
                </div>
            </div>

        </div>
    )
}

export default Specialty