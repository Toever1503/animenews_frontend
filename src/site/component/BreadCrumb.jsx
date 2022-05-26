import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import React from 'react';
import { Link } from 'react-router-dom';
export default function BreadCrumb(props) {

    return (
        <Breadcrumb style={{ marginTop: '10px' }}>
            <Breadcrumb.Item key={'homeBreadcrumb'} href="/">
                <HomeOutlined />
                <Link to='/'><span>Home</span></Link>
            </Breadcrumb.Item>
            {
                props.create != null && props.create.map(breadCrumb => (
                    <BreadcrumbItem key={breadCrumb.name} href={breadCrumb.path == null ? '#' : breadCrumb.path}>
                        {breadCrumb.name}
                    </BreadcrumbItem>
                ))
            }
        </Breadcrumb>
    );
}