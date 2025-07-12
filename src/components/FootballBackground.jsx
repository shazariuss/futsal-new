import { useState } from "react";

const FootballBackground = () => {
    // Вы можете легко изменить эти ссылки на свои изображения
    const [backgroundImage, setBackgroundImage] = useState(
        "https://images.unsplash.com/photo-1546608235-3310a2494cdf?q=80&w=638&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ); // Основной фон
    const [leftPlayerImage, setLeftPlayerImage] = useState(
        "https://images.unsplash.com/photo-1546608235-3310a2494cdf?q=80&w=638&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ); // Левый футболист
    const [rightPlayerImage, setRightPlayerImage] = useState(
        "https://images.unsplash.com/photo-1546608235-3310a2494cdf?q=80&w=638&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ); // Правый футболист

    return (
        <>
            {/* Основной фон */}
            <div
                className="fixed inset-0 z-[-2]"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            {/* Градиентный оверлей для лучшей читаемости */}
            <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-purple-900/70 via-purple-800/50 to-purple-900/70" />

            {/* Левый футболист */}
            <div
                className="fixed left-0 bottom-0 z-[-1] w-96 h-full"
                style={{
                    backgroundImage: `url(${leftPlayerImage})`,
                    backgroundSize: "contain",
                    backgroundPosition: "bottom left",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.3,
                }}
            />

            {/* Правый футболист */}
            <div
                className="fixed right-0 bottom-0 z-[-1] w-96 h-full"
                style={{
                    backgroundImage: `url(${rightPlayerImage})`,
                    backgroundSize: "contain",
                    backgroundPosition: "bottom right",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.3,
                }}
            />

            {/* Дополнительные эффекты освещения как на TFA */}
            <div className="fixed inset-0 z-[-1] pointer-events-none">
                {/* Световые пятна */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl" />

                {/* Центральное свечение */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl" />
            </div>
        </>
    );
};

// Функция для обновления изображений (можете вызвать из любого компонента)
export const updateBackgroundImages = (newImages) => {
    // Эта функция будет использоваться для обновления изображений
    console.log("Updating background images:", newImages);
};

export default FootballBackground;
