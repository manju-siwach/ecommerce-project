import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';

const Product = () => {

    const [m, setwife] = useState()

    const onFinish = values => {
        try {
            axios.post("http://127.0.0.1:8000/api/price/", values)
                .then((bakendkarespons) => {
                    console.log("bakendkarespons:", bakendkarespons);
                    setwife(bakendkarespons?.data?.message)
                })
                .catch((error) => {
                    console.error("Error response from backend:", error?.response?.data?.message);
                    setwife(error?.response?.data)


                })
        }
        catch (error) {
            console.log(error)

        };
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-gray-600">
            <p className='text-[20px] text-green-600 '>{m}</p>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="flex flex-col justify-center items-center gap-4  w-[300px] !p-6 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.15)] bg-white"
            >
                <h1 className='text-3xl font-bold text-gray-800 text-center'>Add Items</h1>
                <Form.Item
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Amount"
                    name="amount"
                    placeholder="Amount"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="Category"
                    placeholder="category"

                >
                    <Input />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" className='!w-full !py-2 !text-[16px] !hover:bg-[red]'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

};
export default Product;

