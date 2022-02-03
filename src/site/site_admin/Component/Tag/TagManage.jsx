import '../../css/tag.css';
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Table } from 'antd';

const url = 'http://localhost:8080/api/tag';

export default function TagManage() {
    const { Search } = Input;
    const { Option } = Select;
    const [currentBulkAct, setCurrentBulkAct] = useState('');
    const [rowsSelected, setRowsSelected] = useState([]);

    const [errorMessage, setErrorMesaage] = useState(null);
    const onSubmit = (data) => {
        console.log(data);
        setErrorMesaage('fsfak')
    }
    const onSearch = (e) => {
        console.log(e.length)
    }

    const onDelete = (e) => {
        alert('delete ===')
    }

    const deleteBulk = () => {
        alert('delete ===')
        console.log(rowsSelected)
    }

    const onchangeBulk = (e) => {
        setCurrentBulkAct(e);
        console.log(e)
    }

    const onClickBulk = (e) => {
        if(currentBulkAct === 'delete')
            deleteBulk();
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'tagName',
            render: (txt) => (<>{txt}
                <div className="itemAction d-flex">
                    <span>Edit</span>
                    <span style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }} onClick={() => onDelete(this)}>Delete</span>
                    <span>View</span>
                </div>
            </>),
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Slug',
            dataIndex: 'tagSlug',
            sorter: (a, b) => a.name.length - b.name.length,
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowsSelected(selectedRowKeys);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        selectedRowKeys: rowsSelected
    };

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
                    >
                        <h3 className="title">Add New Tag</h3>
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
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
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
                                Add New
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