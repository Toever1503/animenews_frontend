import BreadCrumb from '../../../component/BreadCrumb';
import React, { useEffect, useState } from 'react';
import { getPostByName } from '../../../../axios/common_api/post_api';
import { Link, useParams } from 'react-router-dom';
import '../../css/postSingle.css';
import { Divider, Tag } from 'antd';

export default function SinglePost() {
    const { postName } = useParams();
    const { postDate } = useParams();

    const [post, setPost] = useState(null);
    const tagColor = [
        'magenta',
        'green',
        'blue',
        'red',
        'cyan',
        'gold',
        'lime',
        'pink',
    ];

    const breadCrumbRoutes = [{
        path: 'anime_trending',
        name: 'News'
    }, {
        name: 'Post'
    }];

    useEffect(() => {
        getPostByName(postName, postDate)
            .then(res => {
                const { data } = res;
                setPost(data);
                console.log(data)

            }).catch(err => console.log(err));
    }, [postName, postDate]);

    return post !== null && <>
        <BreadCrumb create={breadCrumbRoutes} />
        <div id="postSingleContainer">
            <div id='postSingleContainerLeft' className='col-8'>
                <div className="postTitle">
                    <h1>{post.title}</h1>
                    <p className='postInfo'>
                        <span>Posted By: <b>{post.author}</b></span>
                        <span>Posted at: {post.createdDate}</span>
                    </p>
                    <hr />
                </div>
                <div id='postSingleContent' dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className='relatedTag' >
                    <span className='mr-2'>Tags: </span>
                    {
                        post.tags.map(tag => {
                            return (<Tag key={tag.id} color={tagColor[Math.round(Math.random() * tagColor.length)]}>
                                <Link to={'/tag/' + tag.slug}> {tag.name}</Link>
                            </Tag>)
                        })
                    }
                </div>
                <div className='nextPrevPost'>
                    <Link to='/'>
                        <div className='prevPost'>
                            <img src='https://cdn.animenewsnetwork.com/hotlink/thumbnails/max650x650/cms/daily-briefs/175208/samurai-cryptos.png.jpg' alt='samurai-cryptos' style={{ float: 'left' }} />

                            <div className='content'>
                                <h3>Post 1</h3>
                                <span>Previous Post</span>
                            </div>
                        </div>
                    </Link>

                    <Link to='/'>
                        <div className='nexPost'>
                            <div className='content'>
                                <h3>Post 1</h3>
                                <span>Next Post</span>
                            </div>
                            <img src='https://animenews.life/wp-content/uploads/2022/02/Fanfare-of-Adolescence-new-char-2.jpg.webp' alt='Fanfare-of-Adolescence-new-char-2' style={{ float: 'right' }} />
                        </div>
                    </Link>
                </div>
            </div>

            <div id='postSingleContainerRight' className='col-4'>
            </div>

        </div>
    </>;
}