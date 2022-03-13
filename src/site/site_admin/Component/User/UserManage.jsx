import { PageHeader, Input, Button, Select, Table, Modal, notification } from 'antd';
import React,{ useEffect, useState } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteUsers, deleteUser, getUsers } from '../../../../axios/common_api/user_api';
import { useNavigate } from 'react-router';

export default function UserManage() {

    const navigate = new useNavigate();
    const { Search } = Input;
    const { Option } = Select;
    const [rowsSelected, setRowsSelected] = useState([]);
    const [currentBulkAct, setCurrentBulkAct] = useState('');

    const columns = [
        {
            title: 'Username',
            dataIndex: 'userLogin',
            render: (txt, row) => (<>{txt}
                <div className="itemAction d-flex">
                    <span onClick={() => onEdit(row)}>Edit</span>
                    <span style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }} onClick={() => onDelete(row)}>Delete</span>
                    <span>View</span>
                </div>
            </>),
            key: 'userLogin',
            sorter: (a, b) => a.userLogin.length - b.userLogin.length,
        },
        {
            title: 'Name',
            dataIndex: 'displayName',
            key: 'displayName',
            sorter: (a, b) => a.displayName.length - b.displayName.length,
        },
        {
            title: 'Email',
            dataIndex: 'userEmail',
            key: 'userEmail',
            sorter: (a, b) => a.userEmail.length - b.userEmail.length,
        },
        {
            title: 'Role',
            dataIndex: 'userRoles',
            key: 'userRoles',
            sorter: (a, b) => a.userRoles.length - b.userRoles.length,
            render: (txt) => txt !== null && (<>{txt.map(item => item.authorityName).join(', ')}</>)
        },
        {
            title: 'Status',
            dataIndex: 'userStatus',
            key: 'userStatus',
            render: (txt) => (<>{txt === 0 ? 'Active' : 'Block'}</>),
            sorter: (a, b) => a.userStatus - b.userStatus,
        }
        ,
        {
            title: 'Registered Date',
            dataIndex: 'userRegistered',
            key: 'userRegistered',
            sorter: (a, b) => {
                return new Date(a.userRegistered).getTime() - new Date(b.userRegistered).getTime();
            },
        }
    ];
    const onEdit = (row) => {
        navigate("/admin/user_new?type=edit&userId=" + row.id);
    }
    const onDelete = (row) => {
        showModalConfirm(() => {
            deleteUser(row.id).then(res => {
                if (res.status === 200 && res.data === true) {
                    fetchData(content.pagination.current, content.pagination.pageSize);
                    openNotification('success', 'Delete successfully!');
                } else {
                    openNotification('error', 'Delete failed. Code: ' + res.status);
                }
            }).catch(err => console.log(err))
        });
    }
    
    const onSearch = (q) => { }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowsSelected(selectedRowKeys);
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        selectedRowKeys: rowsSelected
    };

    const onchangeBulk = (e) => {
        setCurrentBulkAct(e);
        console.log(e)
    }

    const onClickBulk = (e) => {
        if (currentBulkAct === 'delete')
            deleteBulk();
    }

    const deleteBulk = () => {
        console.log(rowsSelected);
        if (rowsSelected.length > 0)
            showModalConfirm(() => {
                deleteUsers(rowsSelected).then(res => {
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
            openNotification('warning', 'Please select User to delete');
    }

    const showModalConfirm = (func) => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure want to delete these User?',
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
        setContent({ loading: true });
        getUsers(page - 1, size)
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

    return (
        <>
            <div className="userManage">
                <div className="titleManage d-flex">
                    <PageHeader title="User Management" style={{ padding: '16px' }} />
                    <div className="newTag" style={{ padding: '20px' }}>
                        <Button type="primary" onClick={() => navigate('/admin/user_new?type=new')}>New User</Button>
                    </div>
                </div>

                <div className="tagList">
                    <div className="listRoleWeb">
                        <p style={{ borderLeft: 'unset' }}>All <span>(24)</span></p>
                        <p>Admin <span>(4)</span></p>
                        <p>User <span>(5)</span></p>
                    </div>

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
    )
}