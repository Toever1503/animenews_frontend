import '../../css/carousel.css';
import React, { useState } from 'react';
/*
    props properties:
        + id
        + type
        + content excert
        + content link
        + date create
        + author
        + image link
        + 
*/


export default function PostCarouse(props) {
    const { data } = props;

    const [postCarouselSt, updatePostCarouselSt] = useState(0);
    const contentStyle = {
        height: '100%',
        color: '#fff',
        lineHeight: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
    };

    const [postImage, setPostImage] = useState('');

    return (
        <div style={contentStyle} className='postCarousel' onMouseOver={() => {
            updatePostCarouselSt(1);
        }} onMouseLeave={(e) => {
            updatePostCarouselSt(0);
        }}>
            <div className="postImage h-100">
                <img width='100%' height='100%' src={postImage} alt="" />
            </div>
            <div className={'postContent ' + (postCarouselSt === 0 ? 'hide' : 'show')} >
                <h3 className="postTitle">
                    {
                        data.title
                    }
                </h3>
                <div className="postInfo">
                    <span style={{ marginRight: '5px' }}>Posted by {data.author}</span>
                    <span>At {data.createdDate}</span>
                </div>
                <div className="postExcert" style={{ transition: '0.4s ease-in-out', position: 'relative' }} dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <div className="postBlur" style={{ display: postCarouselSt === 0 ? 'none' : 'block' }}></div>
        </div>
    );
};