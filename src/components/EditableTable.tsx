/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    Button,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Space,
    Table,
} from 'antd'
import React, { useState } from 'react'
import { Item } from '../models/Item'
import { Firebase } from '../services/Firebase'
import { SearchOutlined } from '@ant-design/icons'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: any
    inputType: 'number' | 'text'
    record: Item
    index: number
    children: React.ReactNode
}

const state = {
    searchText: '',
    searchedColumn: '',
}

let searchInput: Input | null

const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
        //@ts-ignore
        setSelectedKeys,
        //@ts-ignore
        selectedKeys,
        //@ts-ignore
        confirm,
        //@ts-ignore
        clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={(node) => {
                    searchInput = node
                }}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) =>
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() =>
                    handleSearch(selectedKeys, confirm, dataIndex)
                }
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
        record[dataIndex]
            ? record[dataIndex]
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
            : '',
    render: (text: any) => text,
})

const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm()
    state.searchText = selectedKeys[0]
    state.searchedColumn = dataIndex
}

const handleReset = (clearFilters: any) => {
    clearFilters()
    state.searchText = ''
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

    const isEditing = (record: Item) => record.key === editingKey

    const edit = (record: Item) => {
        form.setFieldsValue({ ...record })
        setEditingKey(record.key)
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
            key: 'name',
            editable: true,
            inputType: 'string',
            ...getColumnSearchProps('name'),
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
            title: 'UPC',
            dataIndex: 'UPC',
            key: 'UPC',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
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
                            onClick={() => save(record.key)}
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
