import { Menu, Layout, Button, Input, Tag } from 'antd';
import 'antd/dist/antd.min.css';
import React,{ useEffect, useState } from 'react';
import './css/header.css';
import {
    TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { SubMenu } = Menu;

export default function SiteHeader() {
    const [isMobile, updateIsMobile] = useState(0);

    useEffect(() => {
        if (window.screen.width < 1000)
            updateIsMobile(1)
    }, []);

    const { Header } = Layout;
    const menuList = [{
        id: 91,
        title: "menu1",
        subMenu: [{
            id: 151,
            title: "sub1"
        }, {
            id: 612,
            title: "sub2"
        }, {
            id: 913,
            title: "sub3"
        }]
    }, {
        id: 825,
        title: "menu2",
        subMenu: []
    }, {
        id: 293,
        title: "menu3",
        subMenu: [{
            id: 331,
            title: "sub31"
        }, {
            id: 332,
            title: "sub32"
        }, {
            id: 313,
            title: "sub33"
        }]
    }];

    return (
        <>
            <Header style={{ width: '100%', padding: 0, height: '89px' }}>
                <div className='bg-primary topHeader'>
                    <div className="content container d-flex">
                        <div className="topHeaderLeft d-flex">
                            <Menu id='secondMenu' them='dark' style={{ width: '100%', background: 'none', border: 'none' }} mode='horizontal'>
                                <Menu.Item key='login'><Button className='d-block' size={'small'}>Login</Button></Menu.Item>
                                <Menu.Item key='register'><Button className='d-block' size={'small'}>Register</Button></Menu.Item>
                            </Menu>
                        </div>
                        <div className="topHeaderRight">
                            <Tag style={{height:'24px'}} icon={<TwitterOutlined style={{height:'24px'}} />} color="#55acee">
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
                    <div className="logo" onClick={() => { window.location.href = '/' }} />
                    <Menu id='mainMenu' theme="dark" mode={isMobile === 0 ? 'horizontal' : 'vertical'} defaultSelectedKeys={['2']}>
                        {
                            menuList.map(menu => {
                                if (menu.subMenu.length === 0)
                                    return <Menu.Item key={menu.id}>{menu.title}</Menu.Item>
                                else
                                    return <SubMenu key={menu.id} title={menu.title}>
                                        {
                                            menu.subMenu.map(mnItem => {
                                                return <Menu.Item key={mnItem.id}>{mnItem.title}</Menu.Item>;
                                            })
                                        }
                                    </SubMenu>
                            })
                        }
                    </Menu>
                    <Search placeholder="Tìm kiếm" loading style={{ margin: 'auto', maxWidth: '450px' }} />
                </div>
            </Header>

        </>
    );
}
