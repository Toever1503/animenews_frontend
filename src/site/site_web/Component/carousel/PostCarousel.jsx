import '../../css/carousel.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    console.log(data);
    let postImage = null;
    if (data.metas !== null && data.metas.length !== 0) {
        const img = data.metas.find(meta => meta.metaKey === 'featuredImage');
        if (img !== undefined)
            postImage = img.metaValue;
    }

    return (
        <div style={contentStyle} className='postCarousel' onMouseOver={() => {
            updatePostCarouselSt(1);
        }} onMouseLeave={(e) => {
            updatePostCarouselSt(0);
        }}>
            <div className="postImage h-100" style={{ backgroundImage: `url(${postImage != null ? postImage : "http://localhost:3000/wp-content/uploads/background.jpg"})` , backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className={'postContent ' + (postCarouselSt === 0 ? 'hide' : 'show')} >
                <h3 className="postTitle">
                    <Link to={'/' + data.name + '/' + data.createdDate.substr(0, 10)}>{
                        data.title
                    }</Link>
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