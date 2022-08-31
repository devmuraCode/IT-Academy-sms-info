import type {ColumnsType} from 'antd/lib/table';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Button, Input, Space, Table} from 'antd';
import {Link} from 'react-router-dom';
import s from './AllUsers.module.scss'
import Header from '../../components/Header/Header'
import {GroupType, UserType} from "../../types/types";
import defaultAva from "../../assets/image/defaultAva.svg";
import Preloader from "../../components/Preloader/Preloader";
import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../../redux/reducers/usersReducer";
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const AllUsers = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const dispatch = useAppDispatch()
    let {allUsers} = useAppSelector(state => state.usersPage)

    //Table search button
    let searchInput: any
    let getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
            <div style={{padding: 8}}>
                <Input
                    ref={(node: any) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text: any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    let handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    let handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText('')
    };

    const columns: ColumnsType<UserType> = [
        {
            title: 'Имя',
            key: "name",
            dataIndex: 'first_name',
            ...getColumnSearchProps('first_name'),
            render: (name: string, data, key) =>
                <Link key={key} to={`/userDetail/${data.user_id}`}>
                    <img className={s.avatarUser} src={data.photo || defaultAva}
                         alt="Avatar"/>{`${data.first_name} ${data.surname} ${data.last_name}`}
                </Link>
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: "role"
        },
        {
            title: 'Курсы',
            dataIndex: 'groups',
            key: "groups",
            render: (groups: [GroupType], data, key) =>
                <>{groups.map((g) => <p>{g.name}</p>)}</>
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Дата рождения',
            dataIndex: 'dob',
            key: 'dob'
        },
        {
            title: 'Работает',
            dataIndex: 'work',
            key: 'isWork',
            render: (work: boolean, data, key) => <div key={key}>{work ? 'Да' : 'Нет'}</div>
        },
        {
            title: 'Учиться',
            dataIndex: 'study',
            key: 'isStudy',
            render: (study: boolean, data, key) => <div key={key}>{study ? 'Да' : 'Нет'}</div>
        },
        {
            title: 'Платят родители',
            dataIndex: 'paid_by_parents',
            key: 'isPayParents',
            render: (paid_by_parents: boolean, data, key) => <div key={key}>{paid_by_parents ? 'Да' : 'Нет'}</div>
        },
    ];



    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    if (!allUsers) return <Preloader/>
    return (
        <div>
            <Header/>
            <div className="container">
                <div className={s.allUsers}>
                    <h2 className='title'>Всего пользователей: {allUsers.length}</h2>
                    <Table columns={columns} dataSource={allUsers}/>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
