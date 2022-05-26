import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PageHeader, Input, Select, Button, Checkbox, notification, message, Form } from 'antd';
import JoditEditor from 'jodit-pro-react';
import '../../../site_admin/css/postAddEdit.css';
import DebounceSelect from '../../../component/DebounceSelect';
import { searchTags } from '../../../../axios/common_api/tag_api';
import { useDispatch } from 'react-redux';
import { openMediaLibrary } from '../../../../reducers/mediaLibraryReducer';
import { getTerms } from '../../../../axios/common_api/term_api';
import { addPost, getPost, updatePost } from '../../../../axios/common_api/post_api';
export default function PostAddEdit() {

    const dispatch = useDispatch();
    const navigate = new useNavigate();
    const query = new URLSearchParams(window.location.search);
    const typeForm = query.get('type') === 'edit' ? 'edit' : 'new';
    const [form] = Form.useForm();
    const [btnSubmitStatus, setBtnSubmitStatus] = useState(true);

    const { Option } = Select;

    // for jodit
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    // end for jodit
    const [postFeaturedImage, setPostFeaturedImage] = useState(null);
    //begin edit post status
    const [postStatus, setPostStatus] = useState('draft');
    const [postCategory, setPostCategory] = useState(0);


    // end edit post status

    // begin for category
    const [categoryList, setCategoryList] = useState([]);

    const onChangeCategory = () => {
        setPostCategory(form.getFieldValue('terms').length);
    }
    const onChooseMainCategory = (cat) => {
        form.setFieldsValue({
            mainCategory: cat
        });
    }
    // end for category

    //begin for tag
    const fetchTagSuggestions = async (value) => {
        return searchTags(value, 0, 5).then(body => body.data.content.map(tag => ({
            key: tag.id,
            label: tag.name,
            value: tag.slug
        })));
    };
    //end for tag

    // post

    const publishPost = () => {
        form.setFieldsValue({
            status: 'publish'
        });
        setPostStatus('publish');
    }
    // save draft
    const draftPost = () => {
        form.setFieldsValue({
            status: 'draft'
        })
        setPostStatus('draft');
    };

    const onSubmitForm = (post) => {
        if (postCategory >= 2 && post.mainCategory === undefined) {
            openNotification('warn', 'Please select main category');
            return;
        }
        console.log('submit', post);
        const obj = getPostData(post);

        if(post.id !== undefined){
            console.log('update post')

            updatePost({...obj, id: post.id})
            .then(res => {
                console.log(res);
                openNotification('success', 'Update post successfully!');
            })
            .catch(err => console.log(err));
        }
        else{
            console.log('add new post');
            addPost(post)
            .then(res => {
                console.log(res);
                openNotification('success', 'Add new post successfully!');
            })
            .catch(err => console.log(err));
        }
        
    };

    const getPostData = (post) => {
        let originalMetas = form.getFieldValue('metas');
        const postMetas = [];


        if (originalMetas !== undefined) {
            let check = {
                featuredImage: false,
                main_category: false
            };
            originalMetas = originalMetas.map(meta => {
                if (meta.metaKey === 'featuredImage' && post.featuredImage !== undefined) {
                    check.featuredImage = true;
                    return {
                        id: meta.id,
                        metaKey: meta.metaKey,
                        metaValue: post.featuredImage
                    };
                }
                else if (meta.metaKey === 'main_category' && post.mainCategory !== undefined) {
                    check.main_category = true;
                    return {
                        id: meta.id,
                        metaKey: meta.metaKey,
                        metaValue: post.mainCategory
                    };
                }
                else
                    return meta;
            });
            if (!check.featuredImage && post.featuredImage !== undefined)
                originalMetas.push({
                    metaKey: 'featuredImage',
                    metaValue: post.featuredImage
                });
            if (!check.main_category && post.mainCategory !== undefined)
                originalMetas.push({
                    metaKey: 'main_category',
                    metaValue: post.mainCategory
                });
        }
        else {
            originalMetas = postMetas;
        }
        return {
            title: post.title,
            content: content,
            status: post.status,
            name: post.name === undefined ? post.title : post.name,
            tags: post.tags.map(tag => {
                return { id: tag.key, name: tag.label === undefined ? tag.value : tag.label, slug: tag.value };
            }),
            terms: post.terms.map(t => categoryList.find(c => c.id === t)),
            metas: originalMetas
        };
    }
    // end save post

    // const choose featured image post
    const chooseFeaturedPost = () => {
        showImageLibrary(setFeaturedPostFromLibrary);
    };

    const setFeaturedPostFromLibrary = (img) => {
        setPostFeaturedImage(img.id);
        form.setFieldsValue({
            featuredImage: img.id
        });
    }

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
        });
    }

    const showImageLibrary = (callback) => {
        console.log(form.getFieldValue('terms'));
        dispatch(openMediaLibrary(typeof (callback) !== 'function' ? () => { } : callback));
    }

    const emmbedTwitter = () => {
        const code = prompt('Twitter Embed, paste link below');
        fetch('https://publish.twitter.com/oembed?url=' + code.trim(), {
            mode: 'no-cors',
        })
            .then(res => res.json())
            .then(data => {
                window.navigator.clipboard.writeText(data.html);
                message.success('Copied to clipboard', 1);
            }).catch(err => console.log(err));
    }



    const onChangeTitle = (e) => {
        e.target.value.length === '' ? setBtnSubmitStatus(true) : setBtnSubmitStatus(false);
    }
    useEffect(() => {
        form.setFieldsValue({
            tags: [],
            terms: [],
        });
        getTerms(0, 100)
            .then(res => {
                const { data } = res;
                setCategoryList(data.content);
            });
        const pId = query.get('postId');
        if (pId != null) {
            getPost(pId)
                .then(res => {
                    const { data } = res;
                    form.setFieldsValue({
                        id: data.id,
                        title: data.title,
                        status: data.status,
                        name: data.name,
                        terms: data.terms.map(term => term.id),
                        metas: data.metas,
                        tags: data.tags.map(tag => {
                            return {
                                key: tag.id,
                                label: tag.slug,
                                value: tag.name
                            };
                        })
                    });
                    data.metas !== null && data.metas.forEach(meta => {
                        if (meta.metaKey === 'featuredImage') {
                            form.setFieldsValue({
                                mainCategory: meta.metaValue
                            });
                            setPostFeaturedImage(meta.metaValue);
                        }
                        else if (meta.metaKey === 'main_category')
                            form.setFieldsValue({
                                mainCategory: meta.metaValue
                            });
                    });
                    setBtnSubmitStatus(data.status === 'draft');
                    setPostStatus(data.status);
                    setPostCategory(data.terms.length);
                    setContent(data.content);
                }).catch(err => console.log(err));
        }

    }, [])

    return (
        <>
            <div className="postAddEdit">
                <PageHeader
                    className="site-page-header"
                    onBack={() => navigate('/admin/posts')}
                    title={typeForm === 'new' ? 'Add New Post' : 'Edit Post'}
                />
                <Form onFinish={onSubmitForm} form={form} autoComplete='off'>
                    <Form.Item className='d-none' name='id'>
                        <Input />
                    </Form.Item>
                    <Form.Item className='d-none' name='featuredImage' value=''>
                        <Input />
                    </Form.Item>
                    <Form.Item className='d-none' name='mainCategory' value=''>
                        <Input />
                    </Form.Item>
                    <Form.Item className='d-none' name='status'>
                        <Input className='col-4 d-none' />
                    </Form.Item>
                    <div className="formPost row">
                        <div className="formPostLeft col-9">
                            <div className="formPost__title mb-2">
                                <Form.Item style={{ fontWeight: 'bolder' }} onChange={onChangeTitle} required={true} name='title'>
                                    <Input placeholder="Write title for post here..." />
                                </Form.Item>
                            </div>
                            <div className="formPost__content position-relative">
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent(content => newContent)}  // preferred to use only this option to update the content for performance reasons
                                />
                            </div>
                        </div>
                        <div className="formPostRight col-3">
                            {/* begin publish action */}
                            <div className="postPublishAction mt-0">
                                <b>Publish</b>
                                <hr />
                                <div className="postStatus">
                                    <p>Status: <b>{postStatus}</b></p>
                                </div>
                                <div className="publishAction">
                                    <Button disabled={btnSubmitStatus} onClick={draftPost} htmlType='submit'>Save draft</Button>
                                    <Button style={{ float: 'right' }} onClick={publishPost} disabled={btnSubmitStatus} htmlType='submit'>Publish</Button>
                                </div>
                            </div>
                            {/* end publish action */}

                            <div className="addtionalPostPlugin">
                                <Button type="primary" size='small' onClick={showImageLibrary}>Images</Button>
                                <Button type="primary" size='small' onClick={emmbedTwitter}>Emmbed</Button>
                            </div>

                            {/* begin category action */}
                            <div className="categoryAction">
                                <b>Category</b>
                                <hr />
                                <Form.Item name='terms' defaultValue={[]} onChange={onChangeCategory}>
                                    <Checkbox.Group>
                                        {
                                            categoryList.map(cat => (
                                                <Checkbox key={cat.id} value={cat.id}> {cat.name}</Checkbox>
                                            ))
                                        }
                                    </Checkbox.Group>
                                </Form.Item>
                                <div className="mainCategory" style={{ display: postCategory >= 2 ? 'block' : 'none' }}>
                                    <hr />
                                    <Select className='m-0' onChange={onChooseMainCategory}>
                                        {categoryList.length !== 0 && categoryList.map(cat => (
                                            <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                                        ))}
                                    </Select>
                                    <label style={{ fontSize: 12, marginLeft: '5px' }}>Main category?</label>
                                </div>
                            </div>
                            {/* end category action */}

                            {/* begin tags action */}
                            <div className="tagAction">
                                <b>Tag</b>
                                <hr />
                                <Form.Item name='tags' >
                                    <DebounceSelect className='m-0' mode="tags" style={{ width: '100%' }} loading={true} fetchOptions={fetchTagSuggestions} placeholder="Enter Tags... " />
                                </Form.Item>
                            </div>
                            {/* end tags action */}
                            <div className="tagAction">
                                <b>Featured Image</b>
                                <hr />
                                <div className="featuredImage">
                                    {postFeaturedImage !== null &&
                                        <div className="featuredImage__image">
                                            <img height='100%' src={postFeaturedImage} alt="featuredImage" />
                                        </div>
                                    }
                                    <div className="featuredImage__action">
                                        {postFeaturedImage === null ?
                                            <Button type="primary" size='small' onClick={chooseFeaturedPost} >Choose Image</Button> :
                                            <Button type="primary" size='small' onClick={() => setPostFeaturedImage(null)} >Remove Image</Button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>

            </div>
        </>
    );

}