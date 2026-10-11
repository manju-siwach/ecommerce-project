import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "FR", name: "Français" },
    { code: "DE", name: "Deutsch" },
    { code: "HI", name: "हिंदी" },
    { code: "ZH", name: "中文" },
];

const Footerlanguage = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(languages[0]);

    const handleSelect = (lang) => {
        setSelected(lang);
        setOpen(false);
        console.log("Selected language:", lang);
    };

    return (
        <div className="relative">
            {/* Button with India flag */}
            <div
                className="cursor-pointer flex items-center gap-2 border px-3 py-1 rounded hover:bg-gray-100"
                onClick={() => setOpen(!open)}
            >
                <img src="/flag.png" alt="IN" className="w-5 h-4" />
                <span className="text-sm">{selected.code}</span>
                <DownOutlined className="text-xs" />
            </div>

            {/* Dropdown with language names only */}
            {open && (
                <div className="absolute mt-1 bg-black border rounded shadow-lg w-36 z-10">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            className="px-3 py-1 hover:bg-gray-100-text-black cursor-pointer "
                            onClick={() => handleSelect(lang)}
                        >
                            {lang.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Footerlanguage;
