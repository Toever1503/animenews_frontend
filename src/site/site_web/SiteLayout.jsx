import { Outlet } from "react-router-dom";
import SiteFooter from './SiteFooter';
import SiteHeader from "./SiteHeader";
import { Layout } from 'antd';
import { Content } from "antd/lib/layout/layout";
import './css/layout.css';

export default function SiteLayout() {
    return (
        <>
            <Layout className='position-relative'>
                <SiteHeader />
                <Content className='container'>
                    <Outlet/>
                </Content>
                <SiteFooter />
            </Layout>
        </>
    );
}