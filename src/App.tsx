import 'antd/dist/antd.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.scss'
import Main from './pages/Main/Main';
import Login from "./pages/Login/Login";
import AllUsers from "./pages/AllUsers/AllUsers";
import CreateUser from "./pages/CreateUser/CreateUser";
import UserDetail from './pages/UserDetail/UserDetail';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {getProfile, logout, setIsLoading} from './redux/reducers/usersReducer';
import Group from "./pages/Group/Group";
import GroupLessons from './pages/Group/Lessons/GroupLessons';
import ReportCard from "./pages/Group/Lessons/ReportCard/ReportCard";
import Preloader from "./components/Preloader/Preloader";
import Specialty from "./pages/Specialty/Specialty";
import Page404 from "./pages/Page404/Page404";

const App = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let {isLoading, userData} = useAppSelector(state => state.usersPage)
    useEffect(() => {
        if (!localStorage.getItem('Token')) navigate('/login')
        else {
            dispatch(getProfile())
        }


        dispatch(setIsLoading(false))
    }, [])

    if (isLoading && !userData) return <Preloader/>;


    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/allUsers" element={<AllUsers/>}/>
            <Route path="/userDetail/:id" element={<UserDetail/>}/>
            <Route path="/group/:id" element={<Group/>}/>
            <Route path="/group/:group/month/:id" element={<GroupLessons/>}/>
            <Route path="/group/:group/month/:month/lesson/:id" element={<ReportCard/>}/>
            {userData?.role === 'admin' &&
            <>
                <Route path="/createUser" element={<CreateUser/>}/>
                <Route path="/specialty" element={<Specialty/>}/>
            </>}


            <Route path="*" element={<Page404/>}/>
        </Routes>
    );
}

export default App;
