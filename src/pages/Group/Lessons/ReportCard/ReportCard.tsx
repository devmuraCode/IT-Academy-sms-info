import '../../Group.module.scss'
import Header from "../../../../components/Header/Header";
import s from "../../Group.module.scss";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {message, Modal, Table} from 'antd';
import {UserType} from '../../../../types/types';
import {
    getGroupStudents,
    postReportCard,
    sendSMS,
    updateGroupStudentsHomework,
    updateGroupStudentsIsAvailable
} from "../../../../redux/reducers/usersReducer";
import {useParams} from "react-router-dom";

const {Column} = Table;

const ReportCard = () => {
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const {groupStudents} = useAppSelector(state => state.usersPage)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleOk = () => {
        setIsModalVisible(false)
        dispatch(sendSMS(params.id))
        message.success('СМС отправлены')
    };
    const handleCancel = () => {
        setIsModalVisible(false)
    };
    const showModal = () => {
        setIsModalVisible(true)
    }

    let updateReqAttended = (key: number, data: any) => {
        dispatch(updateGroupStudentsIsAvailable({newState: data, index: key}))
        console.log(groupStudents)
    }

    let updateReqSignatureHomework = (key: number, data: any) => {
        dispatch(updateGroupStudentsHomework({newState: data, index: key}))
        console.log(groupStudents)
    }

    useEffect(() => {
        console.log(params)
        dispatch(getGroupStudents(params.id))
    }, [])

    //if (!groupStudents) return <Preloader/>
    return (
        <div>
            <Header/>
            <div className="container">
                <div className={s.groupDetail}>
                    {/*<h1 className='title'>Урок: {groupDetail.months[0].lessons[0].date}</h1>*/}
                    <Table pagination={false} bordered={true} dataSource={groupStudents}>
                        <Column title="№" dataIndex="name" key="dob" render={(_, data: UserType, key) => (
                            <>{key + 1}</>
                        )}/>
                        <Column title="ФИО слушателя" key="dob" render={(_, data: UserType, key) => (
                            <>{`${data.first_name} ${data.surname} ${data.last_name}`}</>
                        )}/>
                        <Column title="Платят родители?" key='paid_by_parents' dataIndex="paid_by_parents"
                                render={(paid_by_parents) => (
                                    <>{`${paid_by_parents ? 'Да' : 'Нет'}`}</>
                                )}/>
                        <Column title="Присуствовал" key="is_available" render={(_, data: UserType, key) => (
                            <input checked={data.is_available} onClick={(e: any) => {
                                updateReqAttended(key, e.target.checked)
                            }} type='checkbox'/>
                        )}/>
                        <Column title="Д/З" key="homework_done" render={(_, data: UserType, key) => (
                            <input type='checkbox' checked={data.homework_done} onClick={(e: any) => {
                                updateReqSignatureHomework(key, e.target.checked)
                            }}/>
                        )}/>
                    </Table>
                    <button className='btnSubmit' onClick={() => {
                        let req = {id: params.id, students: groupStudents}
                        dispatch(postReportCard(req))
                        message.success('Табель сохранен')
                        console.log(req)
                    }}>Сохранить табель
                    </button>
                    <button className='btnSubmit' onClick={showModal}>Отправить СМС</button>
                </div>
                <Modal centered title='Информирование родителей' className='modalAddGroup'
                       width={1000}
                       visible={isModalVisible}
                       onCancel={handleCancel} footer={null}>
                    <p>Вы действительно хотите отправить СМС родителям студентов этой группы?</p>
                    <button className='btnSubmit' onClick={handleOk}>Да, отправить</button>
                </Modal>
            </div>
        </div>
    )
}

export default ReportCard