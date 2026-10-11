import React from "react";
import { Checkbox, Col, Row } from "antd";
import "./Bars.css"; // import custom animation css

const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
};

const Ant = () => {
    return (
        <div className="p-6 space-y-10">

            {/* Checkbox Group */}
            <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                <Row>
                    <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                    <Col span={8}><Checkbox value="B">B</Checkbox></Col>
                    <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                    <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                    <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                </Row>
            </Checkbox.Group>

            {/* Form (Styled with Tailwind instead of Bootstrap) */}
            <form className="max-w-md space-y-4">
                <div>
                    <label className="block mb-1 font-medium">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        We'll never share your email with anyone else.
                    </p>
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <label>Check me out</label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {/* Dancing Bars Animation */}
            <div className="flex justify-center items-center h-40">
                <ul className="flex gap-1">
                    <li className="bar"></li>
                    <li className="bar"></li>
                    <li className="bar"></li>
                    <li className="bar"></li>
                    <li className="bar"></li>
                    <li className="bar"></li>
                </ul>
            </div>

        </div>
    );
};

export default Ant;