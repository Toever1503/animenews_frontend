import { PageHeader, Input, Button, Select, Table, Modal, notification, Badge, Avatar, Tag } from 'antd';
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deletePosts, deletePost, getPosts } from '../../../../axios/common_api/post_api';
import { useNavigate } from 'react-router';
import { getTerms } from '../../../../axios/common_api/term_api';

export default function PostManage() {
    const query = new URLSearchParams(window.location.search);
    const navigate = new useNavigate();

    const { Search } = Input;
    const { Option } = Select;
    const [rowsSelected, setRowsSelected] = useState([]);
    const [currentBulkAct, setCurrentBulkAct] = useState('');
    const [termList, setTermList] = useState([]);
    console.log(termList);


    const termFilter = query.get('category');

    const columns = [
        {
            title: 'Title',
            dataIndex: 'postTitle',
            render: (txt, row) => (<>{txt}
                <div className="itemAction d-flex">
                    <span onClick={() => onEdit(row)}>Edit</span>
                    <span style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }} onClick={() => onDelete(row)}>Delete</span>
                    <span>View</span>
                </div>
            </>),
            key: 'postTitle',
            width: '600px',
            sorter: (a, b) => a.postTitle.length - b.postTitle.length,
        },
        {
            title: 'Categories',
            dataIndex: 'postTerms',
            key: 'postTerms',
            render: (txt) => txt != null && (<>
                {txt.map((item) => (<Tag style={{ margin: '4px' }} key={item.id}>{item.name}</Tag>))}
            </>),
            sorter: (a, b) => a.postTerms.length - b.postTerms.length,
        },
        {
            title: 'Tags',
            dataIndex: 'postTags',
            key: 'postTags',
            render: (txt) => txt != null && (<>
                {txt.map((item) => (<Tag style={{ margin: '4px' }} key={item.id}>{item.name}</Tag>))}
            </>),
            sorter: (a, b) => a.postTags.length - b.postTags.length,
        },
        {
            title: 'Comments',
            dataIndex: 'commentCount',
            key: 'commentCount',
            render: (txt) => txt !== 0 ? (<><Badge size="small" count={txt} overflowCount={5}>
                <Avatar shape="square" size="small" />
            </Badge></>) : '-',
            sorter: (a, b) => a.commentCount - b.commentCount,
        },
        {
            title: 'Author',
            dataIndex: 'postAuthor',
            key: 'postAuthor',
            sorter: (a, b) => a.postAuthor.length - b.postAuthor.length,
        }
        ,
        {
            title: 'Date',
            dataIndex: 'postDate',
            key: 'postDate',
            sorter: (a, b) => {
                return new Date(a.postDate).getTime() - new Date(b.postDate).getTime();
            },
        }
    ];
    const onEdit = (row) => {
        navigate("/admin/post_new?type=edit&postId=" + row.id);
    }
    const onDelete = (row) => {
        showModalConfirm(() => {
            deletePost(row.id).then(res => {
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

    const onChangeDate = (e) => { }
    const onChangeCategory = (e) => {
        navigate('/admin/posts?category=' + e);
        console.log('catergory')
        console.log(e)
    }


    const deleteBulk = () => {
        console.log(rowsSelected);
        if (rowsSelected.length > 0)
            showModalConfirm(() => {
                deletePosts(rowsSelected).then(res => {
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

    const fetchData = ( termId, page, size) => {
        setContent({ loading: true });
        getPosts(termId, page - 1, size)
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
        const termId = termFilter === '' ? 0 : termList.length > 0 ? termList.find(term => term.name === termFilter).id : 0;
        getTerms( 0, 1001).then(res => {
            console.log(res)
            if (res.status === 200) {
                setTermList(res.data.content);
            }
            else
                openNotification('error', 'Get Terms failed. Code: ' + res.status);
        }).catch(err => console.log(err));
        fetchData(termId, 1, content.pagination.pageSize);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [termFilter]);

    return (
        <>
            <div className="userManage">
                <div className="titleManage d-flex">
                    <PageHeader title="Posts" style={{ padding: '16px' }} />
                    <div className="newTag" style={{ padding: '20px' }}>
                        <Button type="primary" onClick={() => navigate('/admin/post_new?type=new')}>New</Button>
                    </div>
                </div>

                <div className="tagList">
                    <div className="listRoleWeb">
                        <p style={{ borderLeft: 'unset' }}>All <span>(24)</span></p>
                        <p>Mine <span>(4)</span></p>
                        <p>Pubnished <span>(5)</span></p>
                        <p>Sticky <span>(5)</span></p>
                        <p>Draft <span>(5)</span></p>
                        <p>Trashed <span>(5)</span></p>
                    </div>

                    <div className="tagAction">
                        <div className="bulkAndSearch mb-3" style={{ minHeight: '30px' }}>
                            <div className="bulkAction" style={{ float: 'left' }}>
                                <Select onChange={onchangeBulk} defaultValue={currentBulkAct} className="select-after">
                                    <Option value=''>Bulk Action</Option>
                                    <Option value='delete'>Delete</Option>
                                </Select>
                                <Button onClick={onClickBulk} type='primary'>Apply</Button>

                                <Select onChange={onChangeDate} defaultValue={''} className="select-after">
                                    <Option value=''>All Dates</Option>
                                    <Option value='delete'>Delete</Option>
                                </Select>

                                <Select onChange={onChangeCategory} defaultValue={''} className="select-after">
                                    <Option value=''>All Categories</Option>
                                    {termList.length !== 0 && termList.map((item) => (
                                        <Option value={item.name} key={item.id}>{item.name}</Option>))}
                                </Select>
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