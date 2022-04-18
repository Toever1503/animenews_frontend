import '../../css/postBox.css';
import { ClockCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function PostBox(props) {
    const [postImage, setPostImage] = useState('');
    const { data } = props;

    const content = data.content.match(/<p[^>]*>([^<]+)<\/p>/);
    console.log(data.createdDate.substr(0, 10));

    return (
        <div className="postBox">
            <div className="singlePost">
                <div className="postImage h-100">
                    <img style={{ cursor: 'pointer', zIndex: '10', position: 'relative' }} width='100%' height='100%' src="http://localhost:3000/wp-content/uploads/background.jpg" alt="" />
                </div>
                <div className='postContent position-relative'>
                    <Link to={'/' + data.name + '/' + data.createdDate.substr(0, 10)}>
                        <h3 className="postTitle">
                            {data.title}
                        </h3>
                    </Link>
                    <div className="postInfo">
                        <span style={{ marginRight: '5px' }}>Posted by {data.author}</span>
                        <span><ClockCircleOutlined style={{ margin: '0', padding: '0' }} /> At {data.createdDate}</span>
                    </div>
                    <div className="postExcert" style={{ transition: '0.4s ease-in-out', position: 'relative' }} dangerouslySetInnerHTML={{ __html: content == null ? '' : content[0] }}></div>
                </div>
            </div>
        </div>
    );
}