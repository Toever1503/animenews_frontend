import '../../css/postSumary.css';
import React from 'react';
import { Link } from 'react-router-dom';
export default function PostSumary(props) {
    const { data } = props;
    let postImage = null;
    if (data.metas !== null && data.metas.length !== 0) {
        const img = data.metas.find(meta => meta.metaKey === 'featuredImage');
        if (img !== undefined)
            postImage = img.metaValue;
    }
    return (
        <>
            <div className="postSumary">
                <div className="postCover" style={{ backgroundImage: `url(${postImage})` }}></div>
                <div className="postTitle">
                    <Link to={'/' + data.name + '/' + data.createdDate.substr(0, 10)}>
                        <h3 className="postTitle">
                            {data.title.substr(0, 140) + '...'}
                        </h3>
                    </Link>
                    <span className="postedTime"> Tháng Một 12, 2022  Shiki</span>
                </div>
            </div>
        </>
    );
}