import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PageHeader, Input, Select, Button, Checkbox, Row, Col, notification, message } from 'antd';
import JoditEditor from 'jodit-pro-react';
import '../../../site_admin/css/postAddEdit.css';
import DebounceSelect from '../../../component/DebounceSelect';
import { searchTags } from '../../../../axios/common_api/tag_api';
import { useDispatch } from 'react-redux';
import { openMediaLibrary } from '../../../../reducers/mediaLibraryReducer';

export default function PostAddEdit() {

    const dispatch = useDispatch();
    const navigate = new useNavigate();
    const query = new URLSearchParams(window.location.search);

    const typeForm = query.get('type') === 'edit' ? 'edit' : 'new';

    const { TextArea } = Input;
    const { Option } = Select;

    // for jodit
    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    // end for jodit

    //begin edit post status
    const [editPostStatus, setEditPostStatus] = useState(false);
    const onClickEditPostStatus = () => {
        setEditPostStatus(true);
    }
    const onOkEditPostStatus = () => {
        setEditPostStatus(false);
    }
    const onCancelEditPostStatus = () => {
        setEditPostStatus(false);
    }
    const onChangePostStatus = (e) => { }
    // end edit post status

    // begin for category
    const [categoryList, setCategoryList] = useState([
        {
            id: 1,
            name: 'category 1',
            slug: 'category-1',
        },
        {
            id: 2,
            name: 'category 2',
            slug: 'category-2',
        },
        {
            id: 3,
            name: 'category 3',
            slug: 'category-3',
        },
    ]);
    const [postCategory, setPostCategory] = useState([
        'category-3'
    ]);
    const [mainCategory, setMainCategory] = useState('');

    const onChangeCategory = (cats) => {
        setPostCategory(cats);
    }
    const onChooseMainCategory = (cat) => {
        setMainCategory(cat);
    }
    // end for category

    //begin for tag
    const [tagOpts, setTagOpts] = useState([
        {
            key: 't-1',
            label: 'Tag 1',
            value: 'tag1'
        }
    ]);

    const fetchTagSuggestions = async (value) => {
        return searchTags(value, 0, 5).then(body => body.data.content.map(tag => ({
            key: 't-' + tag.id,
            label: tag.name,
            value: tag.slug
        })));
    };
    //end for tag

    // save post
    const onSavePost = () => {
        console.log('saving post...');
        if (postCategory.length >= 2 && mainCategory === '') {
            openNotification('warn', 'Please select main category');
            return;
        }
    }
    // end save post

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
        });
    }

    const showImageLibrary = () => {
        dispatch(openMediaLibrary());
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



    useEffect(() => {

    }, [])

    return (
        <>
            <div className="postAddEdit">
                <PageHeader
                    className="site-page-header"
                    onBack={() => navigate('/admin/posts')}
                    title={typeForm === 'new' ? 'Add New Post' : 'Edit Post'}
                />
                <div className="formPost row">
                    <div className="formPostLeft col-9">
                        <div className="formPost__title mb-2">
                            <TextArea placeholder="Write title for post here..." autoSize />
                        </div>
                        <div className="formPost__content position-relative">
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => { }}
                            />
                        </div>
                    </div>
                    <div className="formPostRight col-3">
                        {/* begin publish action */}
                        <div className="postPublishAction mt-0">
                            <b>Publish</b>
                            <hr />
                            <div className="postStatus row">
                                <p className='col-6'>Status: <span>Draft</span></p>
                                <p className='col-6' style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue', display: editPostStatus === true ? 'none' : '' }} onClick={onClickEditPostStatus}>Edit</p>
                                <div className="changePostStatus mb-2" style={{ display: editPostStatus === false ? 'none' : 'block' }}>
                                    <Select className='m-0' defaultValue="draft">
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                    <div className="btn btn-outline-primary p-1" style={{ margin: '0 2px' }} onClick={onOkEditPostStatus}>Ok</div>
                                    <div className="btn btn-outline-primary p-1" onClick={onCancelEditPostStatus}>Cancel</div>
                                </div>
                            </div>
                            <div className="publishAction">
                                <Button>Save draft</Button>
                                <Button style={{ float: 'right' }} onClick={onSavePost}>Publish</Button>
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
                            <Checkbox.Group style={{ width: '100%' }} defaultValue={postCategory} onChange={onChangeCategory}>
                                <Row>
                                    {
                                        categoryList.map(cat => (
                                            <Col key={'c-' + cat.id}>
                                                <Checkbox value={cat.slug}>{cat.name}</Checkbox>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Checkbox.Group>
                            <div className="mainCategory" style={{ display: postCategory.length >= 2 ? 'block' : 'none' }}>
                                <hr />
                                <Select className='m-0' defaultValue={mainCategory} onChange={onChooseMainCategory}>
                                    <Option value="Default">Default</Option>
                                    <Option value="News">News</Option>
                                    <Option value="Manga">Manga</Option>
                                    <Option value="Gane">Gane</Option>
                                </Select>
                                <label style={{ fontSize: 12, marginLeft: '5px' }}>Main category?</label>
                            </div>
                        </div>
                        {/* end category action */}

                        {/* begin tags action */}
                        <div className="tagAction">
                            <b>Tag</b>
                            <hr />
                            <DebounceSelect className='m-0' defaultValue={tagOpts} mode="tags" style={{ width: '100%' }} onChange={(newValue) => {
                                setTagOpts(newValue);
                            }} loading={true} fetchOptions={fetchTagSuggestions} placeholder="Enter Tags... " />
                        </div>
                        {/* end tags action */}
                    </div>
                </div>
            </div>
        </>
    );

}