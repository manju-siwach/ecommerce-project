import React from "react";
import { Carousel, Card, Col, Row } from "antd";
import HolidaySpecial from "../Components/HolidaySpecial";
import Effect from "../Pages/Effect";
import Products from "../Pages/Products";
import { useEffect, useState } from 'react'
import Essentials from "../Pages/Essentials";



function Home() {

    return (
        <div className="bg-gray-100 min-h-screen">


            <div className="relative w-full h-[520px]">
                <Carousel autoplay dots={false}>
                    {["/amazon.jpg", "/hero-electronics.jpg", "/clo.webp", "/hero-festive.jpg"].map((img, idx) => (
                        <div key={idx}>
                            <div
                                className="h-[520px] bg-cover bg-center w-full"
                                style={{ backgroundImage: `url(${img})` }}
                            ></div>
                        </div>
                    ))}
                </Carousel>
                <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-b from-transparent to-gray-100"></div>
            </div>

            <Effect />

            <Products />
            <Essentials />

            <div className="w-full px-6 -mt-24 relative z-10 mt-10!">
                <Row gutter={[16, 16]}>
                    {[
                        { title: "Health & Personal Care", img: "/tape.jpg" },
                        { title: "Furniture", img: "/sofa.jpg" },
                        { title: "Toys", img: "/toys.jpg" },
                        { title: "Vehicle", img: "/cars.jpg" },
                    ].map((cat, idx) => (
                        <Col span={6} key={idx}>
                            <Card
                                hoverable
                                className="w-full h-[300px] flex flex-col justify-between"
                                cover={
                                    <div className="h-[200px] overflow-hidden">
                                        <img
                                            src={cat.img}
                                            alt={cat.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                }
                            >
                                <p className="text-[#007185] mt-2 text-center cursor-pointer hover:underline">
                                    {cat.title} - See more
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Card
                title="Top Deals"
                className="w-full shadow-md mt-8!"
                headStyle={{ fontSize: 20, fontWeight: "bold" }}
            >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {["/shampoo.jpg", "/kids.jpg", "/kids wear.jpg", "/furnio.jpg", "/plants.jpg"].map((img, i) => (
                        <img src={img} key={i} className="rounded w-full" />
                    ))}
                </div>
            </Card>

            <div className="w-full px-6 mt-10! grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Most Loved Travel Accessories", imgs: ["/beg.jpg", "/purse.jpg", "/begs.jpg", "/begss.jpg"] },
                    { title: "Technical Area", imgs: ["/headset.jpg", "/keyboard.jpg", "/mouse.jpg", "/chair.jpg"] },
                    { title: "Courting Area", imgs: ["/clothes.jpg", "/pillow.jpg", "/mitti.jpg", "/storage.jpg"] },
                ].map((section, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md border-t-4 border-orange-500 p-5 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="font-bold text-xl mb-4 text-gray-900">{section.title}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {section.imgs.map((img, idx) => (
                                <img src={img} key={idx} className="rounded w-full" />
                            ))}
                        </div>
                        <p className="text-blue-600 text-sm mt-3 cursor-pointer hover:underline">See more</p>
                    </div>
                ))}
            </div>


            <div className="w-full mt-8!">
                <Carousel autoplay arrows autoplaySpeed={2000}>
                    <div className="min-h-[300px]">
                        <HolidaySpecial />
                    </div>
                    <div className="min-h-[300px]">
                        <Card title="Top Deals" className="shadow-md" headStyle={{ fontSize: 20, fontWeight: "bold" }}>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {["/mitti.jpg", "/sut.jpg", "/suit.jpg", "/lehnga.jpg", "/lehnga1.jpg"].map((img, i) => (
                                    <img src={img} key={i} className="rounded w-full" />
                                ))}
                            </div>
                        </Card>
                    </div>
                </Carousel>
            </div>

        </div >


    );
}

export default Home;

