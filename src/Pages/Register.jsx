import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/register/", values);
            setMessage(res.data.message);

            if (res.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.error(error.response);
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            {message && <p className="text-red-600">{message}</p>}

            <Form
                name="register"
                onFinish={onFinish}
                className="flex flex-col gap-4 w-[300px] p-6 rounded-lg shadow-lg bg-white"
            >
                <h1 className="text-2xl font-bold text-center">Register</h1>

                <Form.Item
                    label="Username"
                    name="name"
                    rules={[{ required: true, message: "Please enter your username!" }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Enter a valid email!" }
                ]}>
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full py-2">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;