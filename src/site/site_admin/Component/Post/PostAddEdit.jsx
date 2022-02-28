import { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PageHeader, Input, Select, Button, Checkbox, Row, Col } from 'antd';
import JoditEditor from 'jodit-pro-react';
import '../../../site_admin/css/postAddEdit.css';

export default function PostAddEdit() {

    const navigate = new useNavigate();
    const query = new URLSearchParams(window.location.search);

    const [typeForm, setTypeForm] = useState(query.get('type') === 'edit' ? 'edit' : 'new');

    const { TextArea } = Input;
    const { Option } = Select;

    // for jodit
    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    // end for jodit

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
                                <p className='col-6' style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>Edit</p>
                                <div className="changePostStatus mb-2 d-none">
                                    <Select className='m-0' defaultValue="draft">
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                    <div className="btn btn-outline-primary p-1" style={{ margin: '0 2px' }}>Ok</div>
                                    <div className="btn btn-outline-primary p-1">Cancel</div>
                                </div>
                            </div>
                            <div className="publishAction">
                                <Button>Save draft</Button>
                                <Button style={{ float: 'right' }}>Publish</Button>
                            </div>
                        </div>
                        {/* end publish action */}

                        {/* begin category action */}
                        <div className="categoryAction">
                            <b>Category</b>
                            <hr />
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value="D">Default</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="A">News</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="B">Manga</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="C">Game</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                            <div className="mainCategory d-none">
                                <hr />
                                <Select className='m-0' defaultValue="News">
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
                            <Select className='m-0' mode="tags" style={{ width: '100%' }} placeholder="Enter Tags... " allowClear='true' loading='true'>
                            </Select>
                            {/* need choose tag remote if exist */}
                        </div>
                        {/* end tags action */}
                    </div>
                </div>
            </div>
        </>
    );

}