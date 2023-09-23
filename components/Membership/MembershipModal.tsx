import Mint from "./Mint";
import Apply from "./Apply";
import Applied from "./Applied";

interface ModalProps {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    isWhitelisted: boolean | null;
    didApply: boolean | null;
}

const Modal = ({ isOpen, setShowModal, isWhitelisted, didApply }: ModalProps) => {
    if (isWhitelisted === null || didApply === null || !isOpen) return <></>;

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-2">
                <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-gray-500 bg-opacity-50"></div>
                <div className="bg-brand-app-black z-10 mx-auto max-w-md rounded-xl pb-6">
                    <div className="flex min-h-[500px] min-w-[360px] flex-col space-y-4 px-6">
                        {isWhitelisted ? <Mint /> : didApply ? <Applied /> : <Apply />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
