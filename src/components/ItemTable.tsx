import { Table } from 'antd'
import React from 'react'
import { Item } from '../models/Item'
import Column from 'antd/lib/table/Column'

type Props = {
    items: Item[] | undefined
    loading: boolean
}

export const ItemTable = ({ items, loading }: Props) => {
    return (
        <Table
            tableLayout="auto"
            rowKey={(item) => `${item.id}`}
            dataSource={items}
            loading={loading}
            bordered={true}
            pagination={{ pageSize: 20, hideOnSinglePage: true }}
            scroll={{ x: 'calc(700px + 50%)', y: '800px' }}
        >
            <Column title="Name" dataIndex="name" />
            <Column title="Price" dataIndex="price" />
            <Column title="Cost" dataIndex="cost" />
            <Column title="Stock" dataIndex="stock" />
            <Column title="UPC" dataIndex="UPC" />
            <Column title="Description" dataIndex="description" />
        </Table>
    )
}
