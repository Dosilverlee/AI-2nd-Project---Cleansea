import React from 'react';
import { Button } from 'react-bootstrap';

export default function Button({ handleAdd, handleDelete, buttonText }) {
    return (
        <button
            onClick={}
            style={{
                display:"inline-block",
                float: "right",
                background: "white",
                border: "none",
            }}
            variant="outline-info"
            size="sm"
            className="mr-3"
            >
                {buttonText}
            </button>
    )
}