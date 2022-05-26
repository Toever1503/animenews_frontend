import React from 'react';
import { PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Menu_Setting() {
    const navigate = new useNavigate();

    return (<>
        <div id='menu_setting' className='row'>
            <PageHeader
                className="site-page-header col-12"
                onBack={() => navigate('/admin/posts')}
                title='Menu Site Setting'
            />
            <div id='menu_setting_top' >
            </div>
            <div id='menu_setting_right' className=''>

            </div>
        </div>
    </>);
}

