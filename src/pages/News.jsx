import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEye, FaArrowLeft, FaNewspaper } from "react-icons/fa";
import { newsApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";

const News = () => {
    const { id } = useParams();
    const [selectedNews, setSelectedNews] = useState(id || null);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsSize, setNewsSize] = useState(20);
    const { language, getTranslation } = useLanguageStore();

    const { data: allNews } = useQuery({
        queryKey: ["allNews", newsSize],
        queryFn: () => newsApi.getAllNews(newsSize).then((res) => res.data),
    });

    const { data: lastNews } = useQuery({
        queryKey: ["lastNews"],
        queryFn: () => newsApi.getLastNews().then((res) => res.data),
    });

    const { data: newsDetails } = useQuery({
        queryKey: ["newsDetails", selectedNews],
        queryFn: () => newsApi.getNews(selectedNews).then((res) => res.data),
        enabled: !!selectedNews,
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return "";
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    // Single news view
    if (selectedNews && newsDetails) {
        return (
            <div className="tfa-layout">
                <div className="tfa-main-content">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* Back Button */}
                        <div className="tfa-container">
                            <button
                                onClick={() => setSelectedNews(null)}
                                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 mb-4 text-sm"
                            >
                                <FaArrowLeft />
                                <span>
                                    {language === "uz" &&
                                        "Yangiliklarga qaytish"}
                                    {language === "ru" &&
                                        "Вернуться к новостям"}
                                    {language === "en" && "Back to News"}
                                </span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <div className="tfa-container">
                                    {/* News Header */}
                                    <div className="mb-6">
                                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                                            {getTranslation(
                                                newsDetails,
                                                "title"
                                            )}
                                        </h1>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600 pb-4 border-b border-gray-200">
                                            <div className="flex items-center space-x-1">
                                                <FaCalendarAlt />
                                                <span>
                                                    {formatDate(
                                                        newsDetails.created_at
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <FaEye />
                                                <span>
                                                    {Math.floor(
                                                        Math.random() * 5000
                                                    )}{" "}
                                                    просмотров
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* News Image */}
                                    {newsDetails.photo && (
                                        <div className="mb-6">
                                            <img
                                                src={newsDetails.photo}
                                                alt={getTranslation(
                                                    newsDetails,
                                                    "title"
                                                )}
                                                className="w-full h-80 object-cover rounded border"
                                            />
                                        </div>
                                    )}

                                    {/* News Content */}
                                    <div className="prose max-w-none">
                                        {getTranslation(newsDetails, "body")
                                            .split("\n")
                                            .map((paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className="mb-4 text-gray-700 leading-relaxed"
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div>
                                <div className="tfa-sidebar">
                                    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                        {language === "uz" &&
                                            "Boshqa yangiliklar"}
                                        {language === "ru" && "Другие новости"}
                                        {language === "en" && "Other News"}
                                    </h3>
                                    <div className="space-y-3">
                                        {lastNews
                                            ?.filter(
                                                (news) =>
                                                    news.uuid !== selectedNews
                                            )
                                            .slice(0, 5)
                                            .map((news) => (
                                                <div
                                                    key={news.uuid}
                                                    className="tfa-news-item cursor-pointer hover:bg-gray-50 p-2 rounded"
                                                    onClick={() =>
                                                        setSelectedNews(
                                                            news.uuid
                                                        )
                                                    }
                                                >
                                                    <h4 className="text-sm font-medium text-gray-900 mb-1 leading-tight">
                                                        {getTranslation(
                                                            news,
                                                            "title"
                                                        )}
                                                    </h4>
                                                    <p className="text-xs text-gray-600">
                                                        {formatDate(
                                                            news.created_at
                                                        )}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // News list view
    return (
        <div className="tfa-layout">
            <div className="tfa-main-content">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Page Header */}
                    <div className="tfa-container">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            {language === "uz" && "Yangiliklar"}
                            {language === "ru" && "Новости"}
                            {language === "en" && "News"}
                        </h1>

                        {/* News Size Control */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                            <p className="text-gray-600 text-sm">
                                {language === "uz" && "Jami yangiliklar: "}
                                {language === "ru" && "Всего новостей: "}
                                {language === "en" && "Total news: "}
                                <strong>{allNews?.length || 0}</strong>
                            </p>
                            <div className="flex items-center space-x-2">
                                <label className="text-sm text-gray-600">
                                    {language === "uz" && "Ko'rsatish:"}
                                    {language === "ru" && "Показать:"}
                                    {language === "en" && "Show:"}
                                </label>
                                <select
                                    value={newsSize}
                                    onChange={(e) =>
                                        setNewsSize(Number(e.target.value))
                                    }
                                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* News Table */}
                        <div className="lg:col-span-2">
                            <div className="tfa-container">
                                <h2 className="tfa-section-title">
                                    {language === "uz" && "Barcha yangiliklar"}
                                    {language === "ru" && "Все новости"}
                                    {language === "en" && "All News"}
                                </h2>

                                <table className="tfa-table">
                                    <thead>
                                        <tr>
                                            <th className="w-20">
                                                {language === "uz" && "Sana"}
                                                {language === "ru" && "Дата"}
                                                {language === "en" && "Date"}
                                            </th>
                                            <th>
                                                {language === "uz" &&
                                                    "Sarlavha"}
                                                {language === "ru" &&
                                                    "Заголовок"}
                                                {language === "en" && "Title"}
                                            </th>
                                            <th>
                                                {language === "uz" &&
                                                    "Qisqacha"}
                                                {language === "ru" &&
                                                    "Краткое содержание"}
                                                {language === "en" && "Summary"}
                                            </th>
                                            <th className="w-16">
                                                {language === "uz" &&
                                                    "Ko'rishlar"}
                                                {language === "ru" &&
                                                    "Просмотры"}
                                                {language === "en" && "Views"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allNews?.map((news) => (
                                            <tr
                                                key={news.uuid}
                                                className="cursor-pointer hover:bg-gray-50"
                                                onClick={() =>
                                                    setSelectedNews(news.uuid)
                                                }
                                            >
                                                <td className="match-time">
                                                    {formatDate(
                                                        news.created_at
                                                    )}
                                                </td>
                                                <td className="team-name">
                                                    <div className="font-medium text-gray-900">
                                                        {getTranslation(
                                                            news,
                                                            "title"
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="text-sm text-gray-600">
                                                        {truncateText(
                                                            getTranslation(
                                                                news,
                                                                "body"
                                                            ),
                                                            80
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="text-center text-sm text-gray-500">
                                                    {Math.floor(
                                                        Math.random() * 1000
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            {/* Latest News */}
                            <div className="tfa-sidebar mb-6">
                                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                    {language === "uz" && "So'nggi yangiliklar"}
                                    {language === "ru" && "Последние новости"}
                                    {language === "en" && "Latest News"}
                                </h3>
                                <div className="space-y-3">
                                    {lastNews?.slice(0, 5).map((news) => (
                                        <div
                                            key={news.uuid}
                                            className="tfa-news-item cursor-pointer hover:bg-gray-50 p-2 rounded"
                                            onClick={() =>
                                                setSelectedNews(news.uuid)
                                            }
                                        >
                                            <h4 className="text-sm font-medium text-gray-900 mb-1 leading-tight">
                                                {getTranslation(news, "title")}
                                            </h4>
                                            <p className="text-xs text-gray-600">
                                                {formatDate(news.created_at)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* News Categories */}
                            <div className="tfa-sidebar">
                                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                    {language === "uz" && "Kategoriyalar"}
                                    {language === "ru" && "Категории"}
                                    {language === "en" && "Categories"}
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        {
                                            name: {
                                                uz: "Barcha yangiliklar",
                                                ru: "Все новости",
                                                en: "All News",
                                            },
                                            count: allNews?.length || 0,
                                        },
                                        {
                                            name: {
                                                uz: "O'yin natijalari",
                                                ru: "Результаты матчей",
                                                en: "Match Results",
                                            },
                                            count: Math.floor(
                                                (allNews?.length || 0) * 0.4
                                            ),
                                        },
                                        {
                                            name: {
                                                uz: "Transfer yangiliklari",
                                                ru: "Новости трансферов",
                                                en: "Transfer News",
                                            },
                                            count: Math.floor(
                                                (allNews?.length || 0) * 0.3
                                            ),
                                        },
                                        {
                                            name: {
                                                uz: "Jamoa yangiliklari",
                                                ru: "Новости команд",
                                                en: "Team News",
                                            },
                                            count: Math.floor(
                                                (allNews?.length || 0) * 0.3
                                            ),
                                        },
                                    ].map((category, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between text-sm hover:bg-gray-100 p-2 rounded cursor-pointer"
                                        >
                                            <span className="text-gray-700">
                                                {category.name[language]}
                                            </span>
                                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                                                {category.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
