import '../../css/carousel.css';
import { useState } from 'react';
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
    const [postCarouselSt, updatePostCarouselSt] = useState(0);
    const contentStyle = {
        height: '100%',
        color: '#fff',
        lineHeight: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
    };

    return (
        <div style={contentStyle} className='postCarousel' onMouseOver={() => {
            updatePostCarouselSt(1);
        }} onMouseLeave={(e) => {
            updatePostCarouselSt(0);
        }}>
            <div className="postImage h-100">
                <img width='100%' height='100%' src="http://localhost:3000/wp-content/uploads/background.jpg" alt="" />
            </div>
            <div className={'postContent ' + (postCarouselSt === 0 ? 'hide' : 'show')} >
                <h3 className="postTitle">
                    Tập cuối cùng World Trigger Season 3 dời lịch lại vào cuối tuần tiếp theo sau khi trì hoãn do cảnh báo sóng thần
                </h3>
                <div className="postInfo">
                    <span style={{marginRight: '5px'}}>Posted by Shiki</span>
                    <span>At Tháng Một 17, 2022</span>
                </div>
                <div className="postExcert" style={{ transition: '0.4s ease-in-out', position: 'relative' }}>
                    Tài khoản Twitter chính thức của anime World Trigger đã thông báo vào tối Chủ nhật rằng tập thứ 14 và tập cuối cùng của mùa thứ ba sẽ phát sóng vào thứ Bảy, ngày 22 tháng 1 lúc 25:30 (hiệu quả là Chủ nhật, ngày 23 tháng 1 lúc 1:30 sáng hoặc thứ bảy, tháng 1 22 lúc 11:30 sáng EST).
                </div>
            </div>
            <div className="postBlur" style={{ display: postCarouselSt === 0 ? 'none' : 'block' }}></div>
        </div>
    );
};