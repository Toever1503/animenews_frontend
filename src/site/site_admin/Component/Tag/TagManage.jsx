import '../../css/tag.css';
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Table, Modal } from 'antd';
import { addTag, updateTag, deleteTags } from '../../../../axios/common_api/tag_api';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const url = 'http://localhost:8080/api/tag';

export default function TagManage() {
    const { Search } = Input;
    const { Option } = Select;
    const [currentBulkAct, setCurrentBulkAct] = useState('');
    const [rowsSelected, setRowsSelected] = useState([]);
    const [typeForm, setTypeForm] = useState('add');

    const [form] = Form.useForm();
    const [errorMessage, setErrorMesaage] = useState(null);

    const pageIndexChange = (page, pageSize) => {
        fetchData(page, pageSize);
    }
    const [content, setContent] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 15,
            pageSizeOptions: [15, 30, 45],
            total: 200,
            onChange: pageIndexChange,

        },
        loading: false,
    });

    const onSubmit = (body) => {
        console.log(body);
        if (typeForm === 'add') {
            //add tag
            addTag(body).then(res => {
                console.log(res);
                if (res.status === 200) {
                    fetchData(1, 15);
                    setTypeForm('add');
                    form.resetFields();
                }
                else {
                    setErrorMesaage('update failed. Code: 500');
                }
            }).catch(err => {
                console.log(err);
                setErrorMesaage('server error: code 500');
            });
        } else {
            updateTag(body).then(res => {
                console.log(res.data);
                if (res.status === 200) {
                    console.log('update success');
                    let updateData = content.data.map(item => {
                        if (item.key === res.data.key)
                            return res.data;
                        return item;
                    });

                    setContent({
                        data: updateData,
                        pagination: content.pagination,
                        loading: content.loading
                    });

                    setTypeForm('add');
                    form.resetFields();
                } else
                    setErrorMesaage('update failed. Code: 500');
            }).catch(err => console.log(err));
            //update tag    
        }
    }
    const onSearch = (e) => {
        console.log(e.length)
    }

    const onDelete = (e) => {
        alert('delete ===')
    }

    const deleteBulk = () => {
        console.log(rowsSelected);
        if (rowsSelected.length > 0)
            Modal.confirm({
                title: 'Confirm',
                icon: <ExclamationCircleOutlined />,
                content: 'Are you sure want to delete these tag?',
                okText: 'Yes',
                cancelText: 'Cancel',
                onOk: () => {
                    deleteTags(rowsSelected).then(res => {
                        console.log(res);
                        if (res.status === 200 && res.data === true) {
                            fetchData(content.pagination.current, content.pagination.pageSize);
                            setRowsSelected([]);
                            alert('delete success');
                        }
                        else 
                            alert('delete failed. Code: 500');
                    }).catch(err => console.log(err));
                }
            });
        else
            alert('Please select tag to delete');
    }

    const onchangeBulk = (e) => {
        setCurrentBulkAct(e);
        console.log(e)
    }

    const onClickBulk = (e) => {
        if (currentBulkAct === 'delete')
            deleteBulk();
    }

    const onEdit = (obj) => {
        form.setFieldsValue(
            { key: obj.key, tagName: obj.tagName, tagSlug: obj.tagSlug }
        );
        setTypeForm('edit');
    }

    const clearForm = () => {
        setTypeForm('add');
        form.resetFields();
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'tagName',
            render: (txt, row) => (<>{txt}
                <div className="itemAction d-flex">
                    <span onClick={() => onEdit(row)}>Edit</span>
                    <span style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }} onClick={() => onDelete(this)}>Delete</span>
                    <span>View</span>
                </div>
            </>),
            key: 'tagName',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Slug',
            dataIndex: 'tagSlug',
            key: 'tagSlug',
            sorter: (a, b) => a.name.length - b.name.length,
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowsSelected(selectedRowKeys);
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        selectedRowKeys: rowsSelected
    };




    const fetchData = (page, size) => {
        // setContent({ loading: true });
        // s={
        //     ...content.pagination,
        //     current: params.page,
        //     pageSize: params.pageSize,
        //     total: 200
        // }

        console.log(size)

        fetch(url + '?page=' + (page - 1) + '&size=' + size)
            .then(res => res.json())
            .then(data => {
                console.log('data')
                console.log(data);
                setContent({
                    loading: false,
                    data: data.content,

                    pagination: {
                        ...content.pagination,
                        current: data.number + 1,
                        pageSize: data.size,
                        total: data.totalElements,
                        // 200 is mock data, you should read it from server
                    },
                });
            });
    };

    useEffect(() => {
    }, []);

    return content.length !== 0 && (
        <>

            <div className="titleMagage">
                <h3 className="title">Tags</h3>
            </div>
            <div className="tagContent">
                <div className="newTag">
                    <Form
                        layout='vertical'
                        labelAlign="left"
                        onFinish={onSubmit}
                        form={form}
                    >
                        <h3 className="title">{typeForm === 'add' ? 'Add New' : 'Edit'} Tag</h3>
                        <Form.Item hidden={true}
                            name='key'>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="tagName"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Slug"
                            name="tagSlug"
                        >
                            <Input />
                        </Form.Item>
                        {errorMessage != null && <p style={{ color: 'red' }}>{errorMessage}</p>}

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {typeForm === 'add' ? 'Add' : 'Edit'}
                            </Button>
                            <Button onClick={() => clearForm()} style={{ marginLeft: 2 }} type="primary">
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="tagList">
                    <div className="tagAction">
                        <div className="bulkAndSearch mb-3" style={{ minHeight: '30px' }}>
                            <div className="bulkAction" style={{ float: 'left' }}>
                                <Select onChange={onchangeBulk} defaultValue={currentBulkAct} className="select-after">
                                    <Option value=''>Bulk Action</Option>
                                    <Option value='delete'>Delete</Option>
                                </Select>
                                <Button onClick={onClickBulk} type='primary'>Apply</Button>
                            </div>
                            <div className="search">
                                <Search style={{ width: 300, float: 'right' }}
                                    allowClear
                                    enterButton="Search Tag"
                                    size="small"
                                    onSearch={onSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tagTable">
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={content.data}
                            pagination={content.pagination}
                            // onChange={handleTableChange}
                            bordered
                        />
                    </div>
                </div>
            </div>
        </>
    );
}