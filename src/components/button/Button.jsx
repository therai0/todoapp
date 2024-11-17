

// this is the simple btn component which takes the input title(name of btn)
// event 
// styleBtn(css for btn)
import React from 'react'

export default function Button(
    {
        title,
        event = () => { },
        styleBtn,

    }
) {
    return (
        <button
            className={`${styleBtn}`}
            onClick={(e) => event(e)}>{title}</button>
    )
}
