import React from 'react';
import { Form, Input, Button } from 'antd';

export default function NewTag(props) {
    const error = props.body.error;

    const onSubmit = (data) => {
        props.body.add(data);
    }

    return (<Form
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

        {/* {error != null && <p style={{ color: 'red' }}>{error}</p>} */}

        <p style={{ color: 'red' }}>{error}</p>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Add New
            </Button>
        </Form.Item>
    </Form>
    );
}