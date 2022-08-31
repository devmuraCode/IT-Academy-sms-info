import s from './Group.module.scss'
import Header from "../../components/Header/Header";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Link, useParams} from 'react-router-dom';
import {message, Modal, Select, Table} from "antd";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Preloader from "../../components/Preloader/Preloader";
import {
    addStudentGroup,
    createGroupMonth,
    getGroupDetail,
    getStudentGroup,
    updateGroupMonth
} from "../../redux/reducers/usersReducer";
import {CreateMonthType, UserType} from "../../types/types";
import editName from "../../assets/image/edit.svg"

const {Option} = Select;
const {Column, ColumnGroup} = Table;
const Group = () => {

    const dispatch = useAppDispatch()
    const params: any = useParams()
    const {groupDetail, students} = useAppSelector(state => state.usersPage)

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isModalVisible2, setIsModalVisible2] = useState(false)
    const [isModalVisible3, setIsModalVisible3] = useState(false)
    const [allStudents, setStudents] = useState([])
    const [modalData, setModalData]: any = useState()
    const {register, handleSubmit, formState: {errors}} = useForm<CreateMonthType>();
    const {
        register: register1,
        setValue: setValue1,
        handleSubmit: handleSubmit1,
        formState: {errors: errors1}
    } = useForm<CreateMonthType>();

    const onSubmit: SubmitHandler<CreateMonthType> = data => {
        data.group = params.id
        dispatch(createGroupMonth(data)).then(() => {
            dispatch(getGroupDetail(params.id))
            handleCancel()
            message.success('Месяц создан')
        })
    }
    const onSecondSubmit: SubmitHandler<CreateMonthType> = data => {
        data.id = modalData.id
        dispatch(updateGroupMonth(data)).then(() => {
            dispatch(getGroupDetail(params.id))
            handleCancel()
            message.success('Месяц обновлен')
        })
    }


    const handleOk = () => {
        setIsModalVisible(false)
        setIsModalVisible2(false)
        setIsModalVisible3(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false)
        setIsModalVisible2(false)
        setIsModalVisible3(false)
    };
    const showModal = () => {
        setIsModalVisible(true)
    }

    const showModalStudents = () => {
        setIsModalVisible2(true)
    }

    const showEditNameMonth = () => {
        setIsModalVisible3(true)
    }


    const handleChange = (value: any) => {
        console.log(value.map((n: any) => Number(n)));
        setStudents(value.map((n: string) => Number(n)))
    };
    useEffect(() => {
        setValue1("name", modalData?.name)
        console.log('CHANGE VALUE')
    }, [modalData])

    useEffect(() => {
        dispatch(getGroupDetail(params.id))
        dispatch(getStudentGroup(params.id))
    }, [])


    let data = [
        {
            lesson: '06/10/2000',
        },

        {
            lesson: '10/10/2000',
        },
    ]


    let users = [
        {
            first_name: 'Alisher',
            surname: 'Second2',
            last_name: 'Last2',
            is_available: true,
            homework_done: true,
        },
        {
            first_name: 'Alisher',
            surname: 'Second2',
            last_name: 'Last2',
            is_available: false,
            homework_done: false,
        }
    ]

    if (!groupDetail || !students) return <Preloader/>

    return (
        <div>
            <Header/>
            <div className="container">
                <div className={s.groupDetail}>
                    <h1 className='title'>Группа: {groupDetail.name}</h1>
                    <p onClick={showModalStudents} className={s.addStudents}>Добавить учеников</p>
                    {/*/!*@ts-ignore*!/*/}
                    {/*<Table bordered={true} dataSource={data}>*/}
                    {/*    <Column title="№" dataIndex="name" key="dob" render={(_, data: UserType, key) =>*/}
                    {/*        <>{key + 1}</>*/}
                    {/*    }/>*/}
                    {/*    <Column title="ФИО слушателя" key="dob" render={(_, data: any, key) => (*/}
                    {/*        <>{`${data.first_name} ${data.surname} ${data.last_name}`}</>*/}
                    {/*    )}/>*/}

                    {/*    {data.map((l, keys) =>*/}
                    {/*        <ColumnGroup key={keys} title={`${keys + 1} урок`}>*/}
                    {/*            <ColumnGroup key={keys} title={l.lesson}>*/}
                    {/*                <Column title="Присуствовал" key="is_available"*/}
                    {/*                        render={(_, data: any, key) => (*/}
                    {/*                            <input defaultChecked={users[keys]?.is_available}*/}
                    {/*                                   type='checkbox'/>*/}
                    {/*                        )}/>*/}
                    {/*                <Column title="Д/З" key="homework_done" render={(_, data: any, key) => (*/}
                    {/*                    <input type='checkbox' defaultChecked={users[keys]?.homework_done}*/}
                    {/*                    />*/}
                    {/*                )}/>*/}
                    {/*            </ColumnGroup>*/}
                    {/*        </ColumnGroup>*/}
                    {/*    )}*/}

                    {/*</Table>*/}


                    {groupDetail.groupmonth.map((m, key) =>
                        <div className={s.months}>
                            <Link key={key} to={`/group/${params.id}/month/${m.id}`}>
                                <p>{`${key + 1}. `}{m.name}</p>
                            </Link>
                            <img src={editName} alt="editName" onClick={() => {
                                showEditNameMonth()
                                setModalData(m)
                            }}/>
                        </div>
                    )}
                    <button className='btnSubmit' onClick={showModal}>Добавить месяц</button>
                </div>

                <Modal centered title='Добавить учебный месяц?' className='modalAddGroup'
                       width={1000}
                       visible={isModalVisible} onOk={handleOk}
                       onCancel={handleCancel} footer={null}>
                    <form id='addGroup' onSubmit={handleSubmit(onSubmit)}>
                        <p>Название месяца:</p>
                        <input type="text" {...register("name", {required: true})} placeholder="1 месяц HTML"/>
                        {errors.name && <span>Поле обязательное</span>}
                    </form>
                    <button form='addGroup' className='btnSubmit'>Создать</button>
                </Modal>

                <Modal centered title='Изменить месяц?' className='modalAddGroup'
                       width={1000}
                       visible={isModalVisible3} onOk={handleOk}
                       onCancel={handleCancel} footer={null}>
                    <form id='updateGroup' onSubmit={handleSubmit1(onSecondSubmit)}>
                        <p>Название месяца:</p>
                        <input type="text" {...register1("name", {required: true})} defaultValue={modalData?.name}
                               placeholder="1 месяц HTML"
                        />
                        {errors1.name && <span>Поле обязательное</span>}
                    </form>

                    <button form='updateGroup' className='btnSubmit'>Обновить</button>
                </Modal>

                <Modal centered title='Выберите учеников:' className=''
                       width={500}
                       visible={isModalVisible2} onOk={handleOk}
                       onCancel={handleCancel} footer={null}>
                    <Select
                        mode="multiple"
                        allowClear
                        showSearch
                        placeholder="Выберите учеников"
                        onChange={handleChange}
                        defaultValue={() => {
                            let std: any = []
                            students.map((s, key) => s.group === Number(params.id) && std.push(s.student))
                            setStudents(std)
                            return std
                        }}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA!.children as unknown as string)
                                .toLowerCase()
                                .localeCompare((optionB!.children as unknown as string).toLowerCase())
                        }
                    >
                        {students.map((u, key) => <Option value={u.student}
                                                          key={key}>{`${u.first_name} ${u.surname}`}</Option>)}
                    </Select>
                    <button form='addGroup' className='btnSubmit' onClick={() => {
                        let req = {group: params.id, student: allStudents}
                        dispatch(addStudentGroup(req)).then(() => {
                            message.success('Студенты добавлены в группу')
                        })
                        handleCancel()
                        console.log(req)
                        console.log(students)
                    }}>Добавить
                    </button>
                </Modal>
            </div>
        </div>
    )
}


export default Group