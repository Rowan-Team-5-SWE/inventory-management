/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Select, Space } from 'antd'
import React from 'react'

const { Option } = Select

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

type Props = {
    finalizeButton: (inputAddress: string) => void
}

export const FinalizeOrderForm = ({ finalizeButton }: Props) => {
    const [form] = Form.useForm()

    const onFinish = (values: string[]) => {
        const totalAddress: string =
            form.getFieldValue('address') +
            ',  ' +
            form.getFieldValue('city') +
            ' ' +
            form.getFieldValue('state') +
            ' ' +
            form.getFieldValue('zipcode')

        finalizeButton(totalAddress)
        form.resetFields()
    }

    const onReset = () => {
        form.resetFields()
    }

    const onFocus = (event: any) => {
        if (event.target.autocomplete) {
            event.target.autocomplete = 'whatever'
        }
    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="city" label="City" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="state" label="State" rules={[{ required: true }]}>
                <Select
                    allowClear
                    showSearch
                    onFocus={onFocus}
                    filterOption={(input, option: any) =>
                        option.children
                            .toUpperCase()
                            .indexOf(input.toUpperCase()) >= 0
                    }
                >
                    <Option value="AL">AL</Option>
                    <Option value="AK">AK</Option>
                    <Option value="AZ">AZ</Option>
                    <Option value="AR">AR</Option>
                    <Option value="CA">CA</Option>
                    <Option value="CO">CO</Option>
                    <Option value="CT">CT</Option>
                    <Option value="DE">DE</Option>
                    <Option value="FL">FL</Option>
                    <Option value="GA">GA</Option>
                    <Option value="HI">HI</Option>
                    <Option value="ID">ID</Option>
                    <Option value="IL">IL</Option>
                    <Option value="IN">IN</Option>
                    <Option value="IA">IA</Option>
                    <Option value="KS">KS</Option>
                    <Option value="KY">KY</Option>
                    <Option value="LA">LA</Option>
                    <Option value="ME">ME</Option>
                    <Option value="MD">MD</Option>
                    <Option value="MA">MA</Option>
                    <Option value="MI">MI</Option>
                    <Option value="MN">MN</Option>
                    <Option value="MS">MS</Option>
                    <Option value="MO">MO</Option>
                    <Option value="MT">MT</Option>
                    <Option value="NE">NE</Option>
                    <Option value="NV">NV</Option>
                    <Option value="NH">NH</Option>
                    <Option value="NJ">NJ</Option>
                    <Option value="NM">NM</Option>
                    <Option value="NY">NY</Option>
                    <Option value="NC">NC</Option>
                    <Option value="ND">ND</Option>
                    <Option value="OH">OH</Option>
                    <Option value="OK">OK</Option>
                    <Option value="OR">OR</Option>
                    <Option value="PA">PA</Option>
                    <Option value="RI">RI</Option>
                    <Option value="SC">SC</Option>
                    <Option value="SD">SD</Option>
                    <Option value="TN">TN</Option>
                    <Option value="TX">TX</Option>
                    <Option value="UT">UT</Option>
                    <Option value="VT">VT</Option>
                    <Option value="VA">VA</Option>
                    <Option value="WA">WA</Option>
                    <Option value="WV">WV</Option>
                    <Option value="WI">WI</Option>
                    <Option value="WY">WY</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="zipcode"
                label="Zip Code"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit Order
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Clear
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}
