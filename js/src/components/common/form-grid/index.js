import React from "react"
import "./index.scss"

export const FormGrid = ({label, children}) => {
    return <div className="qs-poster-form-grid" alt={label}>
        {children}
    </div>
}