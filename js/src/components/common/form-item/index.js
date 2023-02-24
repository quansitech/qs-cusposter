import React from "react"

import "./index.scss"

export const FormItem = ({label, children}) => {
    return <div className="qs-poster-form-item">
            <div className="qs-poster-form-item-label">{label}</div>
            <div className="qs-poster-form-item-content">{children}</div>
        </div>
}