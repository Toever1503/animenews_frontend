import { Form, Input, Button } from 'antd';
import React from 'react';
import './css/account.css';
import { register } from '../../axios/common_api/account_api';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [form] = Form.useForm();
    const [result, setResult] = React.useState({
        result: null,
        message: null
    });
    const onFinish = (body) => {
        console.log('Register Success:', body);
        register(body)
            .then(res => {
                console.log('result: ', res);
                if (res.data === 'success') {
                    setResult({
                        result: true,
                        message: 'Register Successfully! An email has sent to your email address.'
                    });
                    form.resetFields();
                }
                else {
                    setResult({
                        result: false,
                        message: 'Register Failed! User has beent existed.'
                    });
                }
            }).catch(err => console.log(err));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="container account">
                <h3 className='text-center'>Signup</h3>
                <Form
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Full name"
                        name="userNicename"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="userLogin"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
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
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input type='email' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="userPass"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {
                        result.result !== null ? (<> <p className='p-1 bg-warning rounded text-white'>{result.message}</p></>) : null
                    }
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <div className='formbtn'>
                            <Button htmlType="submit">
                                Regisger
                            </Button>
                            <Link to={'/' + 'signin'}>
                                <Button className='ml-2'>
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}