import { Menu, Layout, Button, Input, Tag } from 'antd';
import 'antd/dist/antd.min.css';
import React, { useEffect, useState } from 'react';
import './css/header.css';
import {
    TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../site_admin/AdminLayout';

const { Search } = Input;

export default function SiteHeader() {
    const navigate = new useNavigate();
    const [isMobile, updateIsMobile] = useState(0);
    const hasLogged = getCookie('userLogged') !== undefined;

    useEffect(() => {
        if (window.screen.width < 1000)
            updateIsMobile(1)
    }, []);

    const { Header } = Layout;
    const menuList = [{
        id: 151,
        title: "News",
        url: 'news'
    }, {
        id: 612,
        title: "Manga",
        url: 'manga'
    }, {
        id: 913,
        title: "game",
        url: 'game'
    }];

    const onclickMenu = (url) => {
        navigate('/' + url);
    }

    const logoutApp = () => {
        document.cookie = "userLogged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/';
    }

    const search = (value) => {
        navigate('/search/' + value);
    }

    return (
        <>
            <Header style={{ width: '100%', padding: 0, height: '89px' }}>
                <div className='bg-primary topHeader'>
                    <div className="content container d-flex">
                        <div className="topHeaderLeft d-flex">

                            <Menu id='secondMenu' them='dark' style={{ width: '100%', background: 'none', border: 'none' }} mode='horizontal'>
                                {hasLogged !== true ?
                                    <>
                                        <Menu.Item key='login'><Button className='d-block' size={'small'}><Link to='/signin'>Login</Link></Button></Menu.Item>
                                        <Menu.Item key='register'><Button className='d-block' size={'small'}><Link to='/signup'>Register</Link></Button></Menu.Item>
                                    </> :
                                    <Menu.Item key='register'><Button className='d-block' size={'small'} onClick={logoutApp}>Logout</Button></Menu.Item>}
                            </Menu>

                        </div>
                        <div className="topHeaderRight">
                            <Tag style={{ height: '24px' }} icon={<TwitterOutlined style={{ height: '24px' }} />} color="#55acee">
                                Twitter
                            </Tag>
                            <Tag icon={<YoutubeOutlined />} color="#cd201f">
                                Youtube
                            </Tag>
                            <Tag icon={<FacebookOutlined />} color="#3b5999">
                                Facebook
                            </Tag>
                            <Tag icon={<LinkedinOutlined />} color="#55acee">
                                LinkedIn
                            </Tag>
                        </div>
                    </div>
                </div>
                <div className='container content d-flex' >
                    <div className="logo" onClick={() => { navigate('/') }} />
                    <Menu id='mainMenu' theme="dark" mode={isMobile === 0 ? 'horizontal' : 'vertical'} defaultSelectedKeys={['2']}>
                        {
                            menuList.map(menu =>
                                <Menu.Item onClick={() => onclickMenu(menu.url)} key={menu.id}>{menu.title}</Menu.Item>
                            )
                        }
                    </Menu>
                    <Search placeholder="Tìm kiếm" onSearch={search} style={{ margin: 'auto', maxWidth: '450px' }} />
                </div>
            </Header>

        </>
    );
}
