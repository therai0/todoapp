// this is the simple pop up bar which helps to show the message like error message 
import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai";

export default function PopupBox({ type = "message", message,setMessage }) {
    return (
        <div
            className={`min-h-[50px] max-h-[auto] w-[100%] flex justify-center items-center bg-[white] px-[15px] font-bold
                ${type.trim().toLocaleLowerCase() === "error" ? "border-[2px] text-[red] " : " border-[2px] text-[#21de1b]"}
                `}>
            <p className={`max-h-[auto] overflow-hidden w-[90%]`}>{message}</p>
            <div className='w-[10%] h-[100%] flex justify-center items-center '>
                <AiFillCloseCircle onClick={()=>setMessage(null)} className='h-[100%] w-[100%]'/>
            </div>
        </div>
    )
}
