import '../Group.module.scss'
import Header from "../../../components/Header/Header";
import s from "../Group.module.scss";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Link, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {Modal} from "antd";
import {Calendar} from "@natscale/react-calendar";
import '@natscale/react-calendar/dist/main.css';
import Preloader from "../../../components/Preloader/Preloader";
import {createLessons, getMonthDetail} from "../../../redux/reducers/usersReducer";
import moment from "moment";
import {LessonsType} from "../../../types/types";
import check from '../../../assets/image/check.svg'

const GroupLessons = React.memo(() => {
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const {monthDetail} = useAppSelector(state => state.usersPage)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [value, setValue] = useState([]);
    const [date, setDate] = useState([]);

    const onChange = useCallback(
        (val: any) => {
            console.log(val)
            setValue(val);
            setDate(val.map((t: moment.MomentInput) => moment(t).format('YYYY-MM-DD')));
        },
        [setValue],
    );

    const handleOk = () => {
        setIsModalVisible(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false)
    };
    const showModal = () => {
        setIsModalVisible(true)
    }

    let updateLessons = () => {
        let req = {groupmonth: params.id, date}
        dispatch(createLessons(req)).then(() => {
            dispatch(getMonthDetail(params.id))
            handleCancel()
        })
    }

    useEffect(() => {
        dispatch(getMonthDetail(params.id)).then((res: any) => {
            setValue(res.payload.map((m: LessonsType) => new Date(m.date)))
            setDate(res.payload.map((m: LessonsType) => moment(m.date).format('YYYY-MM-DD')));
        })
    }, [])

    if (!monthDetail) return <Preloader/>
    return (
        <div>
            <Header/>
            <div className="container">
                <div className={s.groupDetail}>
                    <h1 className='title'>Уроки</h1>
                    {monthDetail.map((l, key) =>
                        <Link key={key} to={`/group/${params.group}/month/${params.id}/lesson/${l.id}`}>
                            <p className={l.ended ? `${s.months} ${s.ended}` : s.months}>{`${key + 1}. `}{l.date}{l.ended &&
                            <img src={check} alt="Check"/>}</p>
                        </Link>)}
                    <div className='btnSubmit' onClick={showModal}>Добавить уроки</div>
                    <Modal centered title='Добавить уроки?' className='addLessons'
                           width={500}
                           visible={isModalVisible} onOk={handleOk}
                           onCancel={handleCancel} footer={null}>
                        <Calendar className={s.calendarPanel} isMultiSelector value={value} onChange={onChange}/>
                        <button form='addGroup' className='btnSubmit' onClick={updateLessons}>Добавить</button>
                    </Modal>
                </div>
            </div>
        </div>
    )
})

export default GroupLessons