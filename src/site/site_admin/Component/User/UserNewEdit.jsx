import { Form, Input, Button } from 'antd';
import { useState } from 'react';

export default function UserNewEdit() {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const [typeForm, setTypeForm] = useState('new');
    const clearForm = () => {
        setTypeForm('new');
        form.resetFields();
    }
    const onSubmit = () => {}

    return (
        <>
            <div className="userAddEdit">
            <Form
                        layout='vertical'
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
                                {typeForm === 'new' ? 'Add' : 'Edit'}
                            </Button>
                            <Button onClick={() => clearForm()} style={{ marginLeft: 2 }} type="primary">
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
            </div>
        </>
    )
}