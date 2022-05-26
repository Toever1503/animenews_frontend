import BreadCrumb from '../../../component/BreadCrumb';
import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../../../axios/common_api/post_api';
import { Link, useParams } from 'react-router-dom';
import '../../css/postSingle.css';
import { Comment, Avatar, Form, Button, List, Input, Tag } from 'antd';
import moment from 'moment';
import { getCommentsByPost, addComment } from '../../../../axios/common_api/comment_api';
import { getCookie } from '../../../site_admin/AdminLayout';

export default function SinglePost() {
    const { postName } = useParams();
    const { postDate } = useParams();

    // for comment
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const { TextArea } = Input;
    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    );
    const hasLogged = getCookie('userLogged') === undefined;

    // const [hideReply, setHideReply] = useState(true);

    const [form] = Form.useForm();
    const Editor = () => (
        <>
            <Form
                onFinish={handleSubmitComment}
                form={form}
                autoComplete="off"
            >
                <Form.Item name='commentContent'>
                    <TextArea required='true' placeholder='Leave a comment...' rows={2} />
                </Form.Item>

                {hasLogged === true && <div id='comment_by_anoumyous_user' className='d-flex'>
                    <Form.Item name='commentAuthor'>
                        <Input required='true' placeholder='Leave your name' />
                    </Form.Item>
                    <Form.Item name='commentAuthorEmail'>
                        <Input type='email' required='true' placeholder='leave your email' />
                    </Form.Item>
                </div>}

                <Form.Item>
                    <Button htmlType="submit" loading={submitting} type="primary">
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
        </>
    );

    const handleSubmitComment = (data) => {
        console.log('adding comment');
        console.log(data);
        // setSubmitting(true);

        addComment({
            ...data,
            commentPostId: post.id,
            commentUser: 0,
            commentParent: 0,
            commentType: 'post'
        })
            .then(res => {
                const { data } = res;
                console.log(data);
                setSubmitting(false);
                setComments([
                    ...comments,
                    {
                        author: data.commentAuthor,
                        avatar: 'https://joeschmoe.io/api/v1/random',
                        content: <p>{data.commentContent}</p>,
                        datetime: moment().fromNow(),
                    },
                ]);
                form.resetFields();
            })
            .catch(err => console.log(err));

        // setTimeout(() => {
        //     setSubmitting(false);
        //     setValue('');
        //     setComments([
        //         ...comments,
        //         {
        //             author: 'Han Solo',
        //             avatar: 'https://joeschmoe.io/api/v1/random',
        //             content: <p>{value}</p>,
        //             datetime: moment().fromNow(),
        //         },
        //     ]);
        // }, 1000);
    };

    const handleChangeComment = e => {
        setValue(e.target.value);
    };

    // const createNewComment = () => {
    //     return ReactDOM.render(<Comment
    //         author={<span>Han Solo99</span>}
    //         avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    //         content={
    //             <>
    //                 <p>
    //                     We supply a series of design principles, practical patterns and high quality design
    //                     resources (Sketch and Axure).
    //                 </p>
    //             </>
    //         }
    //     ></Comment>);
    // }

    // const submitReplyComment = (e) => {
    //     const currentEditor = e.target.parentElement.parentElement.parentElement.parentElement
    //     currentEditor.parentElement.append(
    //         createNewComment(currentEditor.parentElement));
    // }

    const ExampleComment = ({ cmtMeta }) => (
        <Comment
            // actions={[
            //     <p key="comment-nested-reply-to" onClick={(e) => {
            //         const replyEditor = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.reply-editor');
            //         replyEditor.classList.remove('d-none');
            //     }}>
            //         Reply to
            //     </p>,
            //     <p className='text-center m-0' style={{ paddingLeft: '25px' }}>
            //         <span className='dash-view-more'>More</span>
            //     </p>
            // ]}
            author={<span>Han Solo</span>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <>
                    <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure).
                    </p>
                </>
            } >
            {/* {
                children
            } */}
        </Comment>
    );

    // const replyComment = (e) => {
    //     console.log(e.target);
    //     document.querySelector('#editorComment')
    // }
    // end for comment


    const [post, setPost] = useState(null);
    const [prevNextPosts, setPrevNextPosts] = useState({
        prev: null,
        next: null
    });
    const [prevNextPostImages, setPrevNextPostImages] = useState({
        prev: null,
        next: null
    });
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
        getSinglePost(postName, postDate)
            .then(res => {
                const data = res.data;
                setPost(data[1]);
                setPrevNextPosts({
                    prev: data[0],
                    next: data[2]
                })
                let imgP = {
                    next: '',
                    prev: ''
                }
                if (data[0].metas !== null && data[0].metas.length !== 0) {
                    const img = data[0].metas.find(meta => meta.metaKey === 'featuredImage');
                    if (img !== undefined)
                        imgP.prev = img.metaValue;
                }
                if (data[2].metas !== null && data[2].metas.length !== 0) {
                    const img = data[2].metas.find(meta => meta.metaKey === 'featuredImage');
                    if (img !== undefined)
                        imgP.next = img.metaValue;
                }
                setPrevNextPostImages({
                    prev: imgP.prev,
                    next: imgP.next
                });
                getCommentsByPost(data[1].id, 0, 10)
                    .then(res => {
                        const cmtData = res.data;
                        console.log('getting comments')
                        console.log(cmtData);
                        setComments(cmtData.content.map(cmt => ({
                            author: cmt.commentAuthor,
                            avatar: 'https://joeschmoe.io/api/v1/random',
                            content: <p>{cmt.commentContent}</p>,
                            datetime: moment().fromNow(),
                        })));
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        // getCommentsByPost(pos)
    }, [postName, postDate]);

    return post !== null && <>
        <BreadCrumb create={breadCrumbRoutes} />
        <div id="postSingleContainer">
            <div id='postSingleContainerLeft' className='col-8 bg-white p-3'>
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
                    {
                        prevNextPosts.prev !== null &&
                        <Link to={'/' + prevNextPosts.prev.name + '/' + prevNextPosts.prev.createdDate.substr(0, 10)}>
                            <div className='prevPost'>
                                <img src={prevNextPostImages.prev} alt='samurai-cryptos' style={{ float: 'left' }} />

                                <div className='content'>
                                    <span>{prevNextPosts.prev.title}</span> <br />
                                    <span>Previous Post</span>
                                </div>
                            </div>
                        </Link>
                    }

                    {
                        prevNextPosts.next !== null &&
                        <Link to={'/' + prevNextPosts.next.name + '/' + prevNextPosts.next.createdDate.substr(0, 10)}>
                            <div className='nexPost'>
                                <div className='content'>
                                    <span>{prevNextPosts.next.title}</span> <br />
                                    <span>Next Post</span>
                                </div>
                                <img src={prevNextPostImages.next} alt='..' style={{ float: 'right' }} />
                            </div>
                        </Link>
                    }
                </div>
                <div className='commentPost'>
                    <h4>Comments</h4>
                    <div className='commentContainer'>
                        {comments.length > 0 && <CommentList comments={comments} />}
                        <Comment
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                            content={
                                <Editor className='commentEditor' />
                            } />
                    </div>
                    {/* <div className='commentHistory'>
                        <ExampleComment>
                        </ExampleComment>
                    </div> */}
                </div>
            </div>

            <div id='postSingleContainerRight' className='col-4'>
            </div>

        </div>
    </>;
}