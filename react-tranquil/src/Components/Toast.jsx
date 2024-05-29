// Toast.js
import React, { useEffect, useState } from "react";

const Toast = ({ message, duration = 3000, onClose = () => {} }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout((duration) => {
            setVisible(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose, visible]);

    return visible && <div className="toast">{message}</div>;
};

export default Toast;
