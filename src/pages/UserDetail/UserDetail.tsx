import s from "./UserDetail.module.scss";
import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import defaultAva from '../../assets/image/defaultAva.svg'
import {message, Modal, Select} from 'antd'
import {SubmitHandler, useForm} from "react-hook-form";
import Preloader from "../../components/Preloader/Preloader";
import {deleteUser, getUserDetail, updateUserRole} from "../../redux/reducers/usersReducer";
import {Link, useNavigate, useParams} from "react-router-dom";

const {Option} = Select;
type ChangeRoleType = {
    permission: number
    course: string
}
const UserDetail = () => {
    const dispatch = useAppDispatch()
    const {id}: any = useParams()
    const navigate = useNavigate()
    let {userDetail} = useAppSelector(state => state.usersPage)
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
    const {handleSubmit, formState: {errors}} = useForm<any>();
    const [permission, setPermission] = useState(userDetail?.role || 'student');
    const handleChange = (value: string) => {
        setPermission(value)

    }
    const onSubmit: SubmitHandler<ChangeRoleType> = (data): any => {
        let request: any = {...userDetail}
        request.permission = permission

        // dispatch(putUserDetail(request)).then(() => {
        //     message.success('Изменения успешно сохранены');
        //     dispatch(getUserDetail(params.id))
        // })
    }

    const updateRole = () => {
        let req = {
            id,
            role: permission
        }
        dispatch(updateUserRole(req)).then(() => {
            message.success('Роль изменена')
            dispatch(getUserDetail(id))
        })
        console.log(req);
    }


    let deleteAcc = () => {
        dispatch(deleteUser(id)).then(() => {
            message.success('Пользователь удален')
            navigate('/allUsers')
        })
    }

    useEffect(() => {
        console.log(id)
        dispatch(getUserDetail(id))
    }, [permission])

    if (!userDetail) return <Preloader/>

    return (
        <div>
            <Header/>
            <div className="container">
                <div className={s.userDetail}>
                    <div className={s.userHeader}>
                        <img
                            className={s.headerAva}
                            src={userDetail.photo || defaultAva}
                            alt="Avatar"
                        />
                    </div>
                    <button className='btnSubmit' onClick={() => {
                        navigate('/createUser')
                    }}>Редактировать юзера
                    </button>
                    <div className={s.userInfo}>
                        <h1 className='title'>{`${userDetail.first_name} ${userDetail.surname} ${userDetail.last_name}`}</h1>
                        <p>Логин: {userDetail.username}</p>
                        <p>Телефон: {userDetail.phone}</p>
                    </div>
                    <div className={s.gridInfo}>
                        <p>Дата рождения: {userDetail.dob ? userDetail.dob : 'Не указан'}</p>
                        <p>Платят родители: {userDetail.paid_by_parents ? 'Да' : 'Нет'}</p>
                        <p>Email: {userDetail.email ? userDetail.email : 'Не указан'}</p>
                        <p>Учиться: {userDetail.study ? 'Да' : 'Нет'}</p>
                        <p>Telegram: {userDetail.telegram ? userDetail.telegram : 'Не указан'}</p>
                        <p>Работает: {userDetail.work ? 'Да' : 'Нет'}</p>
                    </div>
                    <h2 className="title">Группы:</h2>
                    {userDetail.groups.map((g) => <Link to={`/group/${g.id}`}>
                        <p>{`${g.name} | ${g.teacher_name} | ${g.even ? 'По четным числам' : 'По не четным числам'}`}</p>
                    </Link>)}
                    <div className="changeRole">
                        <h2 className='title'>Изменить роль</h2>
                        <form id='formUsersList' className={s.formUsersList} onSubmit={handleSubmit(onSubmit)}>
                            <label className='role'>
                                <p>Роль пользователя: <span>{userDetail.role}</span></p>
                                <p>
                                    {permission === 'student' && 'Студент это тот кто купил хотябы один курс.'}
                                    {permission === 'payer' && 'Родителям приходят смс сообщения'}
                                    {permission === 'teacher' && 'Учитель ведет табели своих групп'}
                                    {permission === 'admin' && 'Админ видит статистику всех групп и создавать учебные группы'}
                                </p>
                                <Select defaultValue={permission} onChange={(e: any) => {
                                    handleChange(e)
                                }}>
                                    <Option value={'student'}>Студент</Option>
                                    <Option value={'payer'}>Родитель</Option>
                                    <Option value={'teacher'}>Учитель</Option>
                                    <Option value={'admin'}>Админ</Option>
                                </Select>
                            </label>
                            <button className='btnSubmit' form='formUsersList' onClick={updateRole}>Сохранить
                                изменения
                            </button>
                        </form>
                    </div>
                    <div className={s.dangerZone}>
                        <h2 className='title'>Danger Zone</h2>
                        <div className={s.zone}>
                            <h3>Удалить пользователя</h3>
                            <p>Вы полностью удалите пользователя. Все его прохождения и историю оплаты.</p>
                            <p>Откатить изменения невозможно!</p>
                            <button onClick={showModal}>Удалить</button>
                        </div>
                    </div>
                    <Modal centered title='Вы уверены, что хотите удалить пользователя?' className='modalCourses'
                           width={1000}
                           visible={isModalVisible} onOk={handleOk}
                           onCancel={handleCancel} footer={null}>
                        <h2>Изменения не откатить</h2>
                        <button className='btnSubmit' onClick={handleCancel}>Нет</button>
                        <button className='btnSubmit' onClick={deleteAcc}>Да, удалить</button>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
