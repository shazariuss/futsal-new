import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../store/languageStore";

const MatchCard = ({ match, index = 0 }) => {
    const { language, getTranslation } = useLanguageStore();
    const navigate = useNavigate();

    const handleMatchClick = () => {
        navigate(`/matches/${match.uuid}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(
            language === "uz" ? "uz-UZ" : language === "ru" ? "ru-RU" : "en-US"
        );
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";
        return timeString.slice(0, 5);
    };

    const getMatchStatus = () => {
        if (match.live_link) return "live";
        if (match.status === "upcoming") return "upcoming";
        return "finished";
    };

    const getStatusColor = () => {
        const status = getMatchStatus();
        if (status === "live") return "bg-red-500";
        if (status === "upcoming") return "bg-blue-500";
        return "bg-green-500";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={handleMatchClick}
        >
            {/* Floating background elements */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
            <div
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"
                style={{ animationDelay: "1s" }}
            ></div>

            <div className="glass-card hover:scale-[1.02] transition-all duration-300 group-hover:shadow-2xl">
                <div className="card-content">
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <FaCalendarAlt className="text-primary-500" />
                                <span className="font-medium">
                                    {formatDate(match.created_at)}
                                </span>
                            </div>
                            {match.time && (
                                <div className="flex items-center space-x-1">
                                    <FaClock className="text-primary-500" />
                                    <span className="font-medium">
                                        {formatTime(match.time)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <div
                                className={`${getStatusColor()} w-3 h-3 rounded-full ${
                                    getMatchStatus() === "live"
                                        ? "animate-pulse"
                                        : ""
                                }`}
                            ></div>
                            <div className="text-xs px-3 py-1 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-full font-medium">
                                {getTranslation(match.league)}
                            </div>
                        </div>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-between mb-6">
                        {/* Team 1 */}
                        <div className="flex items-center space-x-4 flex-1">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                    {match.team1.icon_url ? (
                                        <img
                                            src={match.team1.icon_url}
                                            alt={getTranslation(match.team1)}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                {getTranslation(
                                                    match.team1
                                                ).slice(0, 2)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">
                                    {getTranslation(match.team1)}
                                </h3>
                                <div className="text-sm text-gray-500 font-medium">
                                    HOME
                                </div>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="px-6">
                            <div className="text-center">
                                <div className="relative">
                                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 mb-2">
                                        {match.score.team1_score} -{" "}
                                        {match.score.team2_score}
                                    </div>
                                    {match.live_link && (
                                        <div className="flex items-center justify-center space-x-1 text-red-500 text-sm animate-pulse">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="font-semibold">
                                                {language === "uz" &&
                                                    "Jonli efir"}
                                                {language === "ru" &&
                                                    "Прямой эфир"}
                                                {language === "en" && "Live"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                    {language === "uz" && "Natija"}
                                    {language === "ru" && "Счет"}
                                    {language === "en" && "Score"}
                                </div>
                            </div>
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center space-x-4 flex-1 flex-row-reverse">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                    {match.team2.icon_url ? (
                                        <img
                                            src={match.team2.icon_url}
                                            alt={getTranslation(match.team2)}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                {getTranslation(
                                                    match.team2
                                                ).slice(0, 2)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                            </div>
                            <div className="flex-1 text-right">
                                <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">
                                    {getTranslation(match.team2)}
                                </h3>
                                <div className="text-sm text-gray-500 font-medium">
                                    AWAY
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Match Info */}
                    <div className="text-center">
                        <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                            {match.name}
                        </h4>
                        {match.live_link && (
                            <a
                                href={match.live_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaPlay className="text-sm" />
                                <span>
                                    {language === "uz" && "Jonli efir"}
                                    {language === "ru" && "Прямой эфир"}
                                    {language === "en" && "Live"}
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MatchCard;
