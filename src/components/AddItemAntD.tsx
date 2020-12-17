/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Form,
    Input,
    InputNumber,
    Button,
    Row,
    Typography,
    Col,
    Space,
} from 'antd'
import React from 'react'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
}

export const AddItemForm = () => {
    const [form] = Form.useForm()
    const onFinish = (values: Item) => {
        values.numSold = 0
        Firebase.firestore().collection('items').add(values)
        form.resetFields()
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <>
            <Row>
                <Typography.Title>Add Item</Typography.Title>
            </Row>
            <Row>
                <Form
                    style={{ paddingLeft: '3%' }}
                    form={form}
                    layout="vertical"
                    name="nest-messages"
                    onFinish={onFinish}
                    onReset={onReset}
                >
                    <Form.Item
                        name={['name']}
                        label="Name"
                        rules={[{ required: true }]}
                    >
                        <Input autoComplete="newpassword" />
                    </Form.Item>
                    <Form.Item
                        name={['price']}
                        label="Price"
                        rules={[{ required: true, type: 'number' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['cost']}
                        label="Cost"
                        rules={[{ required: true, type: 'number', min: 0 }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['UPC']}
                        label="UPC"
                        rules={[{ required: true, type: 'number', min: 0 }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name={['description']}
                        label="Description"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea
                            allowClear={true}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name={['stock']}
                        label="Stock"
                        rules={[{ required: true, type: 'number', min: 0 }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Add Item
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Row>
        </>
    )
}
