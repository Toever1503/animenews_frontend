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
    MenuFoldOutlined
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import './css/adminStyle.css';

export default function AdminLayout() {
    // let metaAuth = document.querySelector('meta[name="authorization"]');
    const navigate = new useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (window.screen.width < 1000)
            setCollapsed(true);
    }, []);

    const { Header, Footer, Content } = Layout;
    const { SubMenu } = Menu;
    const handleClick = e => {
        console.log('click ', e.key);
        navigate('/admin/' + e.key);
    };

    return (
        <>
            <Header>
                <span className='text-white'>header</span>
            </Header>

            <div className='adminContent d-flex' style={{ minHeight: '500px' }}>
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

                        <SubMenu key="subPages" icon={<PartitionOutlined />} title="Pages">
                            <Menu.Item key="pages">All Pages</Menu.Item>
                            <Menu.Item key="page_new" icon={<FormOutlined />}>Add New</Menu.Item>
                        </SubMenu>

                        <SubMenu key="subPosts" icon={<PartitionOutlined />} title="Posts">
                            <Menu.Item key="posts">All Posts</Menu.Item>
                            <Menu.Item key="post_new" icon={<FormOutlined />}>Add New</Menu.Item>

                            <Menu.Item key="tags" icon={<TagsOutlined />}>Tags</Menu.Item>
                            <Menu.Item key="categories" icon={<TagOutlined />}>Categories</Menu.Item>
                        </SubMenu>

                        <SubMenu key="subAnime" icon={<PartitionOutlined />} title="Anime Media">
                            <SubMenu key="sub-media" title="Animes">
                                <Menu.Item key="animes">All Animes</Menu.Item>
                                <Menu.Item key="anime_new" icon={<FormOutlined />}>Add New</Menu.Item>
                            </SubMenu>
                            <SubMenu key="subCharacter" title="Characters">
                                <Menu.Item key="characters">All Characters</Menu.Item>
                                <Menu.Item key="character_new" icon={<FormOutlined />}>Add New</Menu.Item>
                            </SubMenu>
                        </SubMenu>

                        <SubMenu key="subComment" icon={<PartitionOutlined />} title="Comments">
                            <Menu.Item key="comments">All Comments</Menu.Item>
                            <Menu.Item key="comment_new" icon={<FormOutlined />}>Add New</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="medias" icon={<PictureOutlined />}>Media</Menu.Item>

                        <SubMenu key="subUser" icon={<UsergroupDeleteOutlined />} title="Users">
                            <Menu.Item key="users">All Users</Menu.Item>
                            <Menu.Item key="user_new" icon={<UserAddOutlined />}>Add New</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="settings" icon={<SettingOutlined />}>Settings</Menu.Item>
                    </Menu>
                </aside>
                <Content style={{ padding: 5 }}>
                    <Outlet />
                </Content>
            </div>

            <Footer >
                footer
            </Footer>
        </>
    );
}

