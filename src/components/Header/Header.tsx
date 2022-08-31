import {Link, NavLink, useNavigate} from 'react-router-dom'
import s from './Header.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import defaultAva from "../../assets/image/defaultAva.svg";
import Preloader from "../Preloader/Preloader";
import {logout} from '../../redux/reducers/usersReducer';
import { Button, Drawer } from 'antd';
import {useState} from "react";

const Header = () => {
    const dispatch = useAppDispatch()
    let {userData} = useAppSelector(state => state.usersPage)
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    let activeClassName = s.active;
    if (!userData) return <Preloader/>
    return (
        <div className={s.header}>
            <div className='container'>
                <div className={s.menu}>
                    <Link to='/'>
                        <p className={s.name}>
                            <img src={userData.photo || defaultAva} alt="Photo"/>
                            {userData.first_name}
                        </p>
                    </Link>
                    <NavLink to='/' className={({isActive}) =>
                        isActive ? activeClassName : undefined}>
                        <p>Главная</p>
                    </NavLink>
                    <NavLink to='/allUsers' className={({isActive}) =>
                        isActive ? activeClassName : undefined}>
                        <p>Все пользователи</p>
                    </NavLink>
                    {userData.role === 'admin' && <>  <NavLink to='/createUser' className={({isActive}) =>
                        isActive ? activeClassName : undefined}>
                        <p>Создать юзера</p>
                    </NavLink>
                        <NavLink to='/specialty' className={({isActive}) =>
                            isActive ? activeClassName : undefined}>
                            <p>Специальности</p>
                        </NavLink></>}
                    <p onClick={() => {
                        dispatch(logout()).then(() => {
                            navigate('/login')
                        })
                    }}>Выйти</p>
                </div>
                <div className={s.menu_icon} onClick={showDrawer}>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <Drawer placement="right" onClose={onClose} visible={visible} width={"100%"}>
                    <div className={s.menu_mobile}>
                        <Link to='/'>
                            <p className={s.name}>
                                <img src={userData.photo || defaultAva} alt="Photo"/>
                                {userData.first_name}
                            </p>
                        </Link>
                        <NavLink to='/' className={({isActive}) =>
                            isActive ? activeClassName : undefined}>
                            <p>Главная</p>
                        </NavLink>
                        <NavLink to='/allUsers' className={({isActive}) =>
                            isActive ? activeClassName : undefined}>
                            <p>Все пользователи</p>
                        </NavLink>
                        {userData.role === 'admin' && <>  <NavLink to='/createUser' className={({isActive}) =>
                            isActive ? activeClassName : undefined}>
                            <p>Создать юзера</p>
                        </NavLink>
                            <NavLink to='/specialty' className={({isActive}) =>
                                isActive ? activeClassName : undefined}>
                                <p>Специальности</p>
                            </NavLink></>}
                        <p onClick={() => {
                            dispatch(logout()).then(() => {
                                navigate('/login')
                            })
                        }}>Выйти</p>
                    </div>
                </Drawer>
            </div>
        </div>
    )
}

export default Header