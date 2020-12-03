/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Input, InputNumber, Popconfirm, Table } from 'antd'
import React, { useState } from 'react'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: any
    inputType: 'number' | 'text'
    record: Item
    index: number
    children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

type Props = {
    items: Item[] | undefined
}

export const EditableTable = ({ items }: Props) => {
    const [form] = Form.useForm()
    const [editingKey, setEditingKey] = useState('')

    const isEditing = (record: Item) => record.id === editingKey

    const edit = (record: Item) => {
        form.setFieldsValue({ ...record })
        setEditingKey(record.id)
    }

    const cancel = () => {
        setEditingKey('')
    }

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item
            const { name, price, cost, UPC, stock, description } = row
            console.log(row)

            Firebase.firestore().collection('items').doc(editingKey).set({
                name,
                price,
                cost,
                stock,
                description,
                UPC,
            })

            setEditingKey('')
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo)
        }
    }

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            editable: true,
            inputType: 'string',
        },
        {
            title: 'price',
            dataIndex: 'price',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'cost',
            dataIndex: 'cost',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'stock',
            dataIndex: 'stock',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'total sold',
            dataIndex: 'numSold',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'UPC',
            dataIndex: 'UPC',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'description',
            dataIndex: 'description',
            editable: true,
            inputType: 'string',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record)
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.id)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <a onClick={() => edit(record)}>Edit</a>
                )
            },
        },
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.inputType,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={items}
                columns={mergedColumns}
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    )
}
