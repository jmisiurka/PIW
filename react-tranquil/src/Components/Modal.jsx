const Modal = ({ onAccept, onCancel, children, show = false }) => {
    if (show === false) {
        return null;
    }

    return (
        <dialog className="modal">
            <span>
                <button className="button" onClick={onCancel}>
                    Cancel
                </button>
                <button className="button" onClick={onAccept}>
                    Ok
                </button>
            </span>
            {children}
        </dialog>
    );
};

export default Modal;
