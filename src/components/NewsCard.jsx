import { motion } from "framer-motion";
import { FaCalendarAlt, FaEye, FaArrowRight, FaClock } from "react-icons/fa";
import { useLanguageStore } from "../store/languageStore";

const NewsCard = ({ news, index = 0 }) => {
    const { language, getTranslation } = useLanguageStore();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(
            language === "uz" ? "uz-UZ" : language === "ru" ? "ru-RU" : "en-US"
        );
    };

    const truncateText = (text, maxLength = 120) => {
        if (!text) return "";
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
        >
            {/* Floating background elements */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>

            <div className="glass-card hover:scale-[1.02] transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                {/* News Image */}
                {news.photo && (
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={news.photo}
                            alt={getTranslation(news, "title")}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1">
                                <div className="flex items-center space-x-2 text-sm">
                                    <FaCalendarAlt className="text-primary-500" />
                                    <span className="font-medium text-gray-700">
                                        {formatDate(news.created_at)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1">
                                <div className="flex items-center space-x-1 text-gray-600">
                                    <FaEye className="text-xs" />
                                    <span className="text-xs font-medium">
                                        {Math.floor(Math.random() * 1000)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="card-content">
                    {/* News Header without image */}
                    {!news.photo && (
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <FaCalendarAlt className="text-primary-500" />
                                <span className="font-medium">
                                    {formatDate(news.created_at)}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400">
                                <FaEye className="text-xs" />
                                <span className="text-xs font-medium">
                                    {Math.floor(Math.random() * 1000)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* News Title */}
                    <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                        {getTranslation(news, "title")}
                    </h3>

                    {/* News Body */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {truncateText(getTranslation(news, "body"))}
                    </p>

                    {/* Read More Button */}
                    <div className="flex items-center justify-between">
                        <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-all duration-300 group-hover:space-x-3">
                            <span>
                                {language === "uz" && "Batafsil o'qish"}
                                {language === "ru" && "Читать далее"}
                                {language === "en" && "Read More"}
                            </span>
                            <FaArrowRight className="text-xs transform group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        <div className="flex items-center space-x-1 text-gray-400">
                            <FaClock className="text-xs" />
                            <span className="text-xs">
                                {Math.floor(Math.random() * 24)}h
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsCard;
