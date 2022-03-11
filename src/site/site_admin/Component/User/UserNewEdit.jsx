import { Form, Input, Button, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, addUser, updateUser } from '../../../../axios/common_api/user_api';
import { getAuthorities } from '../../../../axios/common_api/authority_api';

export default function UserNewEdit() {
    const navigate = new useNavigate();
    const query = new URLSearchParams(window.location.search);

    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const [typeForm, setTypeForm] = useState(query.get('type') === 'edit' ? 'edit' : 'new');
    const [roles, setRoles] = useState([]);

    const clearForm = () => {
        navigate('/admin/user_new');
        setTypeForm('new');
        form.resetFields();
    }


    const onSubmit = (body) => {
        body.userRoles = [roles.find(role => role.id === body.userRoles)]; // will change dto later
        console.log(body);
        if (typeForm === 'new') {
            body.userStatus = 0;

            addUser(body).then(res => {
                console.log(res);
                if (res.status === 200) {
                    setErrorMessage('Add new user successfully!');
                    navigate('/admin/user_new?type=edit&userId=' + res.data.id);
                    setTypeForm('edit');
                } else {
                    setErrorMessage('Server got error: code 500');
                }
            }).catch(err => setErrorMessage('Server got error: code 505'));
        } else {
            console.log('edit');
            updateUser(body).then(res => {
                if (res.status === 200) {
                    setErrorMessage('Update user successfully!');
                } else {
                    setErrorMessage('Server got error: code 500');
                }
            }).catch(err => setErrorMessage('Server got error: code 505'));
        }
    }

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
    }

    useEffect(() => {

        getAuthorities().then(res => {
            const { data } = res;
            setRoles(data.content);
        }).catch(err => console.log(err));

        if (typeForm === 'edit') {
            const userId = query.get('userId');
            getUser(userId).then(res => {
                const { data } = res;
                form.setFieldsValue({
                    id: data.id,
                    userLogin: data.userLogin,
                    displayName: data.displayName,
                    userEmail: data.userEmail,
                    userRoles: data.userRoles[0].id,
                });
            }).catch(err => console.log(err));
            
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="userAddEdit">
                <div className="formUser">
                    <Form
                        {...formItemLayout}
                        layout='horizontal'
                        labelAlign="left"
                        onFinish={onSubmit}
                        form={form}
                    >
                        <h3 className="title">{typeForm === 'new' ? 'Add' : 'Edit'} User</h3>
                        <Form.Item hidden={true} initialValue={null} 
                            name='id'>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Userame"
                            name="userLogin"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="userEmail"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Full Name"
                            name="userNicename"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Website"
                            name="userUrl"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item 
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            label="Password"
                            name="userPass"
                        >
                            <Input type="password" />
                        </Form.Item>

                        <Form.Item name="userRoles" label="Roles:"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Radio.Group value={0}>
                                {roles.map(role =>
                                    <Radio value={role.id} key={role.authorityLevel}>{role.authorityName}</Radio>
                                )}
                            </Radio.Group>
                        </Form.Item>

                        {errorMessage != null && <p style={{ color: 'red' }}>{errorMessage}</p>}

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {typeForm === 'new' ? 'Add' : 'Edit'}
                            </Button>
                            <Button onClick={() => clearForm()} style={{ marginLeft: 2 }} type="primary">
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}