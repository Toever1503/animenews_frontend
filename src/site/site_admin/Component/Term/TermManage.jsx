import '../../css/tag.css';
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Table, Modal, notification } from 'antd';
import { addTerm, updateTerm, deleteTerms, deleteTerm, getTerms } from '../../../../axios/common_api/term_api';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function TermManage() {
    const { Search } = Input;
    const { Option } = Select;
    const [currentBulkAct, setCurrentBulkAct] = useState('');
    const [rowsSelected, setRowsSelected] = useState([]);
    const [typeForm, setTypeForm] = useState('add');

    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);

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
            //add Term
            addTerm(body).then(res => {
                console.log(res);
                if (res.status === 200) {
                    fetchData(1, 15);
                    setTypeForm('add');
                    form.resetFields();
                }
                else {
                    setErrorMessage('update failed. Code: 500');
                }
            }).catch(err => {
                console.log(err);
                setErrorMessage('server error: code 500');
            });
        } else {
            updateTerm(body).then(res => {
                console.log(res.data);
                if (res.status === 200) {
                    console.log('update success');
                    let updateData = content.data.map(item => {
                        if (item.id === res.data.id)
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
                    setErrorMessage('Update failed. Code: 500');
            }).catch(err => console.log(err));
            //update Term    
        }
    }
    const onSearch = (e) => {
        console.log(e.length)
    }

    const onDelete = (e) => {
        showModalConfirm(() => {
            deleteTerm(e.id).then(res => {
                if (res.status === 200 && res.data === true) {
                    fetchData(content.pagination.current, content.pagination.pageSize);
                    openNotification('success', 'Delete successfully!');
                } else {
                    openNotification('error', 'Delete failed. Code: ' + res.status);
                }
            }).catch(err => console.log(err))
        });
    }

    const deleteBulk = () => {
        console.log(rowsSelected);
        if (rowsSelected.length > 0)
            showModalConfirm(() => {
                deleteTerms(rowsSelected).then(res => {
                    if (res.status === 200 && res.data === true) {
                        fetchData(content.pagination.current, content.pagination.pageSize);
                        setRowsSelected([]);
                        openNotification('success', 'Delete successfully!');
                    }
                    else
                        openNotification('error', 'Delete failed. Code: ' + res.status);
                }).catch(err => console.log(err));
            });
        else
            openNotification('warning', 'Please select Term to delete');
    }

    const showModalConfirm = (func) => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure want to delete these Term?',
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: func
        });
    }

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
        });
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
            { id: obj.id, name: obj.name, slug: obj.slug, description: obj.description }
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
            dataIndex: 'name',
            render: (txt, row) => (<>{txt}
                <div className="itemAction d-flex">
                    <span onClick={() => onEdit(row)}>Edit</span>
                    <span style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }} onClick={() => onDelete(row)}>Delete</span>
                    <span>View</span>
                </div>
            </>),
            key: 'name1',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug1',
            sorter: (a, b) => a.slug.length - b.slug.length,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description1',
            sorter: (a, b) => a.description.length - b.description.length,
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
        setContent({ loading: true });
        getTerms(page-1, size)
            .then(res => {
                const { data } = res;
                console.log(data)
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
        fetchData(content.pagination.current, content.pagination.pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return content.length !== 0 && (
        <>

            <div className="titleMagage">
                <h3 className="title">Terms</h3>
            </div>
            <div className="tagContent">
                <div className="newTag">
                    <Form
                        layout='vertical'
                        labelAlign="left"
                        onFinish={onSubmit}
                        form={form}
                    >
                        <h3 className="title">{typeForm === 'add' ? 'Add New' : 'Edit'} Term</h3>
                        <Form.Item hidden={true} initialValue={null}
                            name='id'>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
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
                            name="slug"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
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
                            bordered
                            rowKey={row => row.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}