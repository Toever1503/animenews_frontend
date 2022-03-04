import { Popconfirm, message, Row, Col, Input, Select, Form, Button, Pagination, Skeleton, notification } from 'antd';
import { useEffect, useState } from 'react';
import { deleteImageByName, getImages, updateImage } from '../../../../axios/common_api/image_api';
import { CopyOutlined } from '@ant-design/icons';

// import 

export default function LibraryList() {
    const { Search } = Input;
    const { Option } = Select;
    const [form] = Form.useForm();

    const [listImages, setListImages] = useState([]);
    const [activeSkeleton, setActiveSkeleton] = useState(false);
    const [imageDetail, setImageDetail] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0
    });

    const onSearchImage = keyword => {
        console.log(keyword);
    }

    const onChangePage = page => {
        console.log(page);
    }

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
            duration: 2
        });
    }

    const showDetail = (img) => {
        console.log(img);
        setImageDetail(img);
        form.setFieldsValue({
            title: img.title,
            alt: img.alt,
            imageName: img.imageName
        });
    }

    const onUpdateImage = (obj) => {
        if (!isUpdating) {
            let type = 'success';
            let message = 'Update image successfully';
            // update
            setIsUpdating(true);
            updateImage(obj)
                .then(res => {
                    setIsUpdating(false);
                    if (res.status === 200) {
                        setImageDetail(res.data);
                    } else {
                        type = 'error';
                        message = 'Update image failed, code: 500';
                    }
                })
                .catch(err => {
                    setIsUpdating(false);
                    console.log(err)
                    type = 'error';
                    message = 'Update image failed, code: 500';
                });
            openNotification(type, message);
        }
    }

    const onDeleteImage = (imgName) => {
        deleteImageByName(imgName).then(res => {
            if (res.status === 200 && res.data === true) {
                openNotification('success', 'Delete image successfully');
                setListImages(listImages.filter(img => img.id !== imgName));
            }
            else
                openNotification('error', 'Delete image failed');
        }).catch(err => {
            console.log('delete image error!');
        });
    }

    const copyImageUrl = (url) => {
        window.navigator.clipboard.writeText(url);
        message.success('Copied to clipboard', 0.5);
    }

    useEffect(() => {
        setActiveSkeleton(true);
        getImages(0).then(res => {
            const { data } = res;
            console.log(data)
            if (res.status === 200) {
                setActiveSkeleton(false);
                setListImages(data.content);
                setPagination({
                    current: data.pageable.pageNumber + 1,
                    total: data.totalElements
                })
            }
            else {
                setActiveSkeleton(false);
                openNotification('error', 'Cannot get images, code: 500');
            }
        }).catch(err => {
            console.log(err);
            setActiveSkeleton(false);
            openNotification('error', 'Cannot get images, code: 500');
        })
    }, []);

    return (
        <>
            <div className="libraryImages row">
                <div className="libraryImagesLeft col-9">
                    <div className="libraryImagesLeftTitle mb-2 row">
                        <div className="libraryImagesLeftTitleFilter col-8">
                            <p style={{ margin: '2px' }}><b>Filter</b></p>
                            <Select className='m-0' defaultValue="">
                                <Option value="">All media items</Option>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                            <Select className='mt-1' defaultValue="">
                                <Option value="">All dates</Option>
                            </Select>
                        </div>
                        <div className="libraryImagesLeftTitleSearch col-4">
                            <p style={{ margin: '2px' }}><b>Search Image</b></p>
                            <Search
                                placeholder="Image searching..."
                                allowClear
                                onSearch={onSearchImage}
                            />
                        </div>
                    </div>
                    <Skeleton paragraph={{ rows: 10 }} loading={activeSkeleton} active />
                    {listImages.length !== 0 && (
                        <Row className='p-1' style={{ paddingLeft: '10px !important', background: 'rgb(245 242 242 / 69%)', overflowY: 'scroll', maxHeight: 500 }} gutter={[10, 10]}>
                            {listImages.map(img =>
                            (
                                <Col key={img.id} className='imageItem position-relative' onClick={() => showDetail(img)} style={{ border: '1px solid gainsboro', cursor: 'pointer' }} xs={7} sm={8} md={5} lg={4} xl={3}>
                                    <img src={img.id} title={img.title} alt={img.alt} />
                                </Col>
                            ))}
                        </Row>
                    )}

                    <div className="pagination w-100">
                        <Pagination className='m-auto' onChange={onChangePage} pageSize={40} {...pagination} />
                    </div>
                </div>

                <div className="imageDetail col-3" style={{ borderLeft: '1px solid gray' }}>
                    {imageDetail !== null && (
                        <>
                            <div className="imageDetail_title">
                                <b className='mb-2'>
                                    Attachment Details
                                </b>
                            </div>
                            <div className="imageDetail_content">
                                <div className="imageDetail_content_item">
                                    <img style={{ height: 200, width: 150 }} src={imageDetail.id} title='' alt="" />
                                </div>
                                <div className="imageDetail_content_infor">
                                    <p style={{ borderBottom: '1px solid #8f7777' }}>{imageDetail.imageName}</p>
                                    <p style={{ borderBottom: '1px solid #8f7777' }}>{imageDetail.mimeType}</p>
                                    <p style={{ borderBottom: '1px solid #8f7777' }}>Last update at: {imageDetail.lastEdit}</p>

                                    <Popconfirm
                                        title="Title"
                                        onConfirm={() => onDeleteImage(imageDetail.imageName)}>
                                        <p style={{ color: 'red', cursor: 'pointer' }}>Delete Permanently</p>
                                    </Popconfirm>
                                    <hr />
                                </div>
                            </div>
                            <div className="imageDetail_body">
                                <Form form={form} onFinish={onUpdateImage} layout='horizontal' labelAlign='left' labelCol={{ flex: '60px' }}>
                                    <Form.Item className='d-none' name='imageName'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Alt Text" name={'alt'}>
                                        <Input placeholder="Enter alt..." />
                                    </Form.Item>
                                    <Form.Item label="Title" name={'title'}>
                                        <Input placeholder="Enter title..." />
                                    </Form.Item>
                                    <Form.Item label="File URL">
                                        <Input prefix={
                                            <CopyOutlined style={{ cursor: 'pointer' }} onClick={() => copyImageUrl(imageDetail.id)} />}
                                            style={{ cursor: 'pointer !important' }} onClick={() => copyImageUrl(imageDetail.id)} readOnly={true} value={imageDetail.id} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Update</Button>
                                    </Form.Item>

                                </Form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}