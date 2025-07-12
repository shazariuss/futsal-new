import { motion } from "framer-motion";
import {
    FaFutbol,
    FaHandsHelping,
    FaIdCard,
    FaStar,
    FaMedal,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../store/languageStore";

const PlayerCard = ({ player, index = 0 }) => {
    const { language, getTranslation } = useLanguageStore();
    const navigate = useNavigate();

    const handlePlayerClick = () => {
        navigate(`/players/${player.uuid}`);
    };

    const getPerformanceColor = () => {
        const goals =
            player.goals_count || (player.events && player.events.goals) || 0;
        if (goals >= 10) return "from-yellow-400 to-yellow-600";
        if (goals >= 5) return "from-green-400 to-green-600";
        return "from-blue-400 to-blue-600";
    };

    const getPerformanceIcon = () => {
        const goals =
            player.goals_count || (player.events && player.events.goals) || 0;
        if (goals >= 10) return FaStar;
        if (goals >= 5) return FaMedal;
        return FaFutbol;
    };

    const PerformanceIcon = getPerformanceIcon();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={handlePlayerClick}
        >
            {/* Floating background elements */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-float"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-float-delayed"></div>

            <div className="glass-card hover:scale-[1.02] transition-all duration-300 group-hover:shadow-2xl">
                <div className="card-content">
                    {/* Player Header */}
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                {player.image ? (
                                    <img
                                        src={player.image}
                                        alt={getTranslation(player)}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-2xl">
                                            {getTranslation(player).slice(0, 2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div
                                className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r ${getPerformanceColor()} rounded-2xl flex items-center justify-center shadow-lg`}
                            >
                                <span className="text-white font-bold text-lg">
                                    {player.number}
                                </span>
                            </div>
                            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                <PerformanceIcon className="text-white text-sm" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                                {getTranslation(player)}
                            </h3>
                            <p className="text-sm text-gray-600 font-medium mb-1">
                                {player.position?.[`position_${language}`]}
                            </p>
                            {player.birthday && (
                                <p className="text-xs text-gray-500 flex items-center space-x-1">
                                    <span>
                                        {language === "uz" && "Yosh: "}
                                        {language === "ru" && "Возраст: "}
                                        {language === "en" && "Age: "}
                                    </span>
                                    <span className="font-semibold">
                                        {player.age ||
                                            new Date().getFullYear() -
                                                new Date(
                                                    player.birthday
                                                ).getFullYear()}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Player Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="relative">
                            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 text-center group-hover:from-green-100 group-hover:to-green-200 transition-colors duration-300">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl mx-auto mb-3 shadow-lg">
                                    <FaFutbol className="text-white text-xl" />
                                </div>
                                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
                                    {player.goals_count ||
                                        (player.events &&
                                            player.events.goals) ||
                                        0}
                                </div>
                                <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                                    {language === "uz" && "Gollar"}
                                    {language === "ru" && "Голы"}
                                    {language === "en" && "Goals"}
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 text-center group-hover:from-blue-100 group-hover:to-blue-200 transition-colors duration-300">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl mx-auto mb-3 shadow-lg">
                                    <FaHandsHelping className="text-white text-xl" />
                                </div>
                                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                                    {player.assists_count ||
                                        (player.events &&
                                            player.events.assists) ||
                                        0}
                                </div>
                                <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                                    {language === "uz" && "Uzatmalar"}
                                    {language === "ru" && "Передачи"}
                                    {language === "en" && "Assists"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Info */}
                    {player.team && (
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
                                    <FaIdCard className="text-primary-500" />
                                    <span className="font-medium">
                                        {language === "uz" && "Jamoa: "}
                                        {language === "ru" && "Команда: "}
                                        {language === "en" && "Team: "}
                                    </span>
                                    <span className="font-bold text-gray-900">
                                        {getTranslation(
                                            player.current_team || player.team
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PlayerCard;
