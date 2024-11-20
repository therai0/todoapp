import React, { useState } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { RiEyeCloseFill } from "react-icons/ri";

export default function TextInput({
    title,
    type = "text",
    value,
    setInputValue,
    styleInput,
    placeholder = ""

}) {
    const [isShow, setIsShow] = useState(false);


    // function to toogle the show and hide btn

    function toggleHideAndShowBtn() {
        setIsShow((prev) => !prev);
    }

    // if the type is password then return this input field
    if (type.trim().toLocaleLowerCase() === "password") {
        return (
            <div>
                <p className={`text-[16px] py-[5px] opacity-[75%]`}>{title}</p>
                <div className={`${styleInput}`}>
                    <input
                        type={isShow ? "text" : `${type}`}
                        value={value}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`w-[90%] h-[99%] focus:outline-none px-[5px] rounded-[5px]`}
                        placeholder={placeholder}
                    />
                    <div className={`flex justify-center items-center w-[10%] h-[100%] bg-[white] rounded-[5px]`}>
                        {
                            isShow ? <IoEyeSharp onClick={toggleHideAndShowBtn} /> : <RiEyeCloseFill onClick={toggleHideAndShowBtn} />
                        }
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            <div>
                <p className={`text-[16px] py-[5px] opacity-[75%]`}>{title}</p>
                <input type={type}
                    value={value}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={`${styleInput}`}
                    placeholder={placeholder}
                />
            </div>
        </>
    )
}
