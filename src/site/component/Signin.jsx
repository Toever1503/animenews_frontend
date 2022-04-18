import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import './css/account.css';
import { login } from '../../axios/common_api/account_api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function Signin() {
    const navigate = new useNavigate();
    const [result, setResult] = React.useState({
        result: null,
        message: null
    });
    const onFinish = (body) => {
        console.log('Success:', body);
        login(body)
            .then(res => {
                console.log(res);
                if (res.data === '') {
                    setResult({
                        result: false,
                        message: 'Username or password is incorrect'
                    })
                }
                else {
                    setCookie('userLogged', 'bearer ' + res.data, body.remember === true ? (7 * 86400) : 1800)
                    setResult({
                        result: true,
                        message: 'Login Successfully!'
                    })
                }
            }).catch(err => console.log(err));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Set a Cookie
    function setCookie(cName, cValue, miliseconds) {
        let date = new Date();
        date.setTime(date.getTime() + (miliseconds * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }
    return (
        <>
            <div className="container account">
                <h3 className='text-center'>Login</h3>
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
                >
                    <Form.Item
                        label="Username"
                        name="username"
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
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember" valuePropName="checked"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    {
                        result.result !== null ? (<>
                            <p className='p-1 bg-warning rounded text-white'>{result.message}{result.result === true ? '. You will be redirect to home after 3s..' : ''}</p>
                            {result.result === true ? (setTimeout(()=>{
                                navigate('/');
                            }, 3000 )): ''}
                        </>) : null
                    }
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <div className='formbtn'>
                            <Button htmlType="submit">
                                Login
                            </Button>
                            <Link to={'/' + 'signup'}>
                                <Button className='ml-2'>
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}