import { motion } from "framer-motion";

const Loading = ({ size = "medium" }) => {
    const sizeClasses = {
        small: "w-4 h-4",
        medium: "w-8 h-8",
        large: "w-12 h-12",
    };

    return (
        <div className="flex items-center justify-center p-8">
            <motion.div
                className={`${sizeClasses[size]} border-4 border-purple-200 border-t-purple-600 rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export const LoadingPage = () => {
    return (
        <div className="tfa-layout">
            <div className="tfa-main-content">
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <Loading size="large" />
                        <p className="mt-4 text-gray-600">Загрузка...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
