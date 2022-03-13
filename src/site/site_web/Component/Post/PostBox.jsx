import '../../css/postBox.css';
import {ClockCircleOutlined} from '@ant-design/icons';
import React from 'react';
export default function PostBox() {
    return (
        <div className="postBox">
            <div className="singlePost">
                <div className="postImage h-100">
                    <img style={{cursor:'pointer', zIndex: '10', position:'relative'}} width='100%' height='100%' src="http://localhost:3000/wp-content/uploads/background.jpg" alt="" />
                </div>
                <div className='postContent position-relative'>
                    <h3 className="postTitle">
                        Tập cuối cùng World Trigger Season 3 dời lịch lại vào cuối tuần tiếp theo sau khi trì hoãn do cảnh báo sóng thần
                    </h3>
                    <div className="postInfo">
                        <span style={{ marginRight: '5px' }}>Posted by Shiki</span>
                        <span><ClockCircleOutlined style={{margin: '0', padding: '0'}} /> At Tháng Một 17, 2022</span>
                    </div>
                    <div className="postExcert" style={{ transition: '0.4s ease-in-out', position: 'relative' }}>
                        Tài khoản Twitter chính thức của anime World Trigger đã thông báo vào tối Chủ nhật rằng tập thứ 14 và tập cuối cùng của mùa thứ ba sẽ phát sóng vào thứ Bảy, 
                    </div>
                </div>
            </div>
        </div>
    );
}