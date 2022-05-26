import { Menu, Layout, Button } from 'antd';
import {
    SettingOutlined,
    DashboardOutlined,
    FormOutlined,
    PictureOutlined,
    UserAddOutlined,
    UsergroupDeleteOutlined,
    PartitionOutlined,
    TagsOutlined,
    TagOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import './css/adminStyle.css';
import MediaLibrary from './Component/Media/MediaLibrary.jsx';
import { checkUser } from '../../axios/common_api/account_api';

export function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

export default function AdminLayout() {
    const navigate = new useNavigate();
    const auth = getCookie('userLogged');
    // if (auth === '' || auth === undefined) {
    //     navigate('/signin');
    // }
    // const [checkRole, setCheckRole] = useState(false);
    // if (auth === undefined || auth === '' || checkRole === false) {
    //     navigate('/signin?redirect=/admin');
    // }

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // useEffect(() => {
    //     if (window.screen.width < 1000)
    //         setCollapsed(true);

    //     checkUser('ROLE_ADMIN')
    //         .then(res => {
    //             console.log('check: ' + res.data);
    //             if (res.data === true)
    //                 setCheckRole(res.data);
    //             else
    //                 navigate('/signin?redirect=/admin');
    //         }).catch(err => console.log(err));
    // }, []);

    const { Header, Footer, Content } = Layout;
    const { SubMenu } = Menu;
    const handleClick = e => {
        console.log('click ', e.key);
        navigate('/admin/' + e.key);
    };
    const handleSubMenuClick = e => {
        navigate('/admin/' + e.key.replace('sub', '').toLowerCase());
    }

    return (
        <>
            <Header>
                <span className='text-white'>header</span>
            </Header>

            <div className='adminContent d-flex' style={{ minHeight: '800px' }}>
                <aside>
                    <Button type="primary" onClick={toggleCollapsed} style={{ display: collapsed ? 'block' : 'none' }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                    <Menu
                        onClick={handleClick}
                        defaultSelectedKeys={['admin']}
                        defaultOpenKeys={['admin']}
                        mode="inline"
                        inlineCollapsed={collapsed}>

                        <Menu.Item key="admin" icon={<DashboardOutlined />}>Dashboard</Menu.Item>

                        {/* <SubMenu key="subPages" icon={<PartitionOutlined />} title="Pages" onTitleClick={(e) => handleSubMenuClick(e)}>
                            <Menu.Item key="pages">All Pages</Menu.Item>
                            <Menu.Item key="page_new" icon={<FormOutlined />}>Add New</Menu.Item>
                        </SubMenu> */}

                        <SubMenu key="subPosts" icon={<PartitionOutlined />} title="Posts" onTitleClick={(e) => handleSubMenuClick(e)}>
                            <Menu.Item key="posts">All Posts</Menu.Item>
                            <Menu.Item key="post_new" icon={<FormOutlined />}>Add New</Menu.Item>

                            <Menu.Item key="tags" icon={<TagsOutlined />}>Tags</Menu.Item>
                            <Menu.Item key="categories" icon={<TagOutlined />}>Categories</Menu.Item>
                        </SubMenu>

                        <SubMenu key="subAnimeMedia" icon={<PartitionOutlined />} title="Anime Media" >
                            <SubMenu key="subAnimes" title="Animes" onTitleClick={(e) => handleSubMenuClick(e)}>
                                <Menu.Item key="animes">All Animes</Menu.Item>
                                <Menu.Item key="anime_new" icon={<FormOutlined />}>Add New</Menu.Item>
                            </SubMenu>
                            <SubMenu key="subCharacters" title="Characters" onTitleClick={(e) => handleSubMenuClick(e)}>
                                <Menu.Item key="characters">All Characters</Menu.Item>
                                <Menu.Item key="character_new" icon={<FormOutlined />}>Add New</Menu.Item>
                            </SubMenu>
                        </SubMenu>

                        <SubMenu key="subComments" icon={<PartitionOutlined />} title="Comments" onTitleClick={(e) => handleSubMenuClick(e)}>
                            <Menu.Item key="comments">All Comments</Menu.Item>
                            <Menu.Item key="comment_new" icon={<FormOutlined />}>Add New</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="medias" icon={<PictureOutlined />}>Media</Menu.Item>

                        <SubMenu key="subUsers" icon={<UsergroupDeleteOutlined />} title="Users" onTitleClick={(e) => console.log(e)}>
                            <Menu.Item key="users">All Users</Menu.Item>
                            <Menu.Item key="user_new" icon={<UserAddOutlined />}>Add New</Menu.Item>
                        </SubMenu>
                        <SubMenu key="subSettings" icon={<SettingOutlined />} title="settings">
                            <Menu.Item icon={<MenuOutlined />} key="settings/menu">Menu Setting</Menu.Item>
                        </SubMenu>

                    </Menu>
                </aside>
                <Content style={{ padding: 5 }}>
                    <Outlet />
                </Content>
            </div>
            <MediaLibrary />

            <Footer >
                footer
            </Footer>
        </>
    );
}

