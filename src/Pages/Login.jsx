import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/login/", values);
            console.log("Backend response:", res.data);

            setMessage(res.data.message);

            if (res.status === 200) {

                localStorage.setItem("jwttoken", res.data.jwt);


                navigate("/");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data?.message);
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-white flex flex-col items-center justify-center px-4">
            {/* Display error or success message */}
            {message && <p className="text-red-600 text-center mb-4">{message}</p>}

            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
                    Login
                </h2>

                <Form
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="flex flex-col gap-4"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Enter a valid email!" },
                        ]}
                    >
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full py-2 text-lg"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-4 text-sm text-gray-600">
                    <p>
                        Don’t have an account?{" "}
                        <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => navigate("/register")} // Navigate to Register page
                        >
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;