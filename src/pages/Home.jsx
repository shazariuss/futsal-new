import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
    FaArrowRight,
    FaCalendarAlt,
    FaClock,
    FaPlay,
    FaEye,
    FaNewspaper,
    FaImages,
    FaVideo,
    FaUsers,
    FaTrophy,
    FaFutbol,
} from "react-icons/fa";
import { homeApi, newsApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";
import { useNavigate } from "react-router-dom";
import FootballBackground from "../components/FootballBackground";
import { useState } from "react";

const Home = () => {
    const { language, getTranslation } = useLanguageStore();
    const navigate = useNavigate();

    const [tableTab, setTableTab] = useState("table"); // "table", "form"

    const { data: lastMatches } = useQuery({
        queryKey: ["lastMatches"],
        queryFn: () => homeApi.getLastMatches().then((res) => res.data),
    });

    const { data: upcomingMatches } = useQuery({
        queryKey: ["upcomingMatches"],
        queryFn: () => homeApi.getUpcomingMatches().then((res) => res.data),
    });

    const { data: topPlayers } = useQuery({
        queryKey: ["topPlayers"],
        queryFn: () => homeApi.getTopPlayers().then((res) => res.data),
    });

    const { data: lastNews } = useQuery({
        queryKey: ["lastNews"],
        queryFn: () => newsApi.getLastNews().then((res) => res.data),
    });

    const { data: allNews } = useQuery({
        queryKey: ["allNews", 20],
        queryFn: () => newsApi.getAllNews(20).then((res) => res.data),
    });

    const { data: lastMedia } = useQuery({
        queryKey: ["lastMedia"],
        queryFn: () => newsApi.getLastMedia().then((res) => res.data),
    });

    const { data: photos } = useQuery({
        queryKey: ["photos", 12],
        queryFn: () => newsApi.getPhotos(12).then((res) => res.data),
    });

    const { data: videos } = useQuery({
        queryKey: ["videos", 6],
        queryFn: () => newsApi.getVideos(6).then((res) => res.data),
    });

    const { data: leagues } = useQuery({
        queryKey: ["leagues"],
        queryFn: () => homeApi.getLeagues().then((res) => res.data),
    });

    const { data: teams } = useQuery({
        queryKey: ["teams"],
        queryFn: () =>
            leagues?.length > 0
                ? homeApi
                      .getTeamsByLeague(leagues[0].uuid)
                      .then((res) => res.data)
                : null,
        enabled: !!leagues?.length,
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";
        return timeString.slice(0, 5);
    };

    const getScoreClass = (team1Score, team2Score) => {
        if (team1Score > team2Score) return "score-home-win";
        if (team2Score > team1Score) return "score-away-win";
        return "score-draw";
    };

    // Функция для цвета формы
    const getFormColor = (result) => {
        if (result === "В") return "bg-green-500";
        if (result === "Н") return "bg-blue-400";
        if (result === "П") return "bg-red-500";
        return "bg-gray-400";
    };

    // Получить массив формы из данных (примерная заглушка, можно заменить на реальные данные)
    const getTeamForm = (team) => {
        // team.data.form должен быть массивом ["В", "П", "В", "Н", ...]
        // Если такого нет, просто генерируем случайно для примера:
        if (team.data?.form) return team.data.form;
        const results = ["В", "П", "Н"];
        return Array(5)
            .fill(0)
            .map(() => results[Math.floor(Math.random() * results.length)]);
    };

    return (
        <div className="tfa-layout">
            <div className="tfa-main-content">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Hero Section with Main News */}
                    {lastNews?.[0] && (
                        <div
                            className="w-full h-[340px] md:h-[420px] relative flex items-end justify-start mb-8 rounded-lg overflow-hidden"
                            style={{
                                backgroundImage: `url(${
                                    lastNews[0].photo ||
                                    "/api/placeholder/1200/420"
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                minHeight: "340px",
                            }}
                            onClick={() => navigate("/news")}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
                            <div className="relative z-10 px-10 py-8">
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 max-w-2xl">
                                    {getTranslation(lastNews[0], "title")}
                                </h1>
                                <p className="text-lg text-white/80 mb-2">
                                    {getTranslation(lastNews[0], "description")}
                                </p>
                                <span className="text-white/60 text-sm">
                                    {formatDate(lastNews[0].created_at)}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* League Table */}
                            {teams && (
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                                        <h2 className="text-xl font-bold">
                                            {getTranslation(
                                                teams,
                                                "league_name"
                                            )}{" "}
                                            - {new Date().getFullYear()}
                                        </h2>
                                    </div>

                                    <div className="flex bg-gray-100 border-b">
                                        <button
                                            className={`px-6 py-3 text-sm font-semibold transition-all ${
                                                tableTab === "table"
                                                    ? "bg-blue-600 text-white border-b-2 border-blue-600"
                                                    : "text-gray-600 hover:text-blue-600"
                                            }`}
                                            onClick={() => setTableTab("table")}
                                        >
                                            ТАБЛИЦА
                                        </button>
                                        <button
                                            className={`px-6 py-3 text-sm font-semibold transition-all ${
                                                tableTab === "form"
                                                    ? "bg-blue-600 text-white border-b-2 border-blue-600"
                                                    : "text-gray-600 hover:text-blue-600"
                                            }`}
                                            onClick={() => setTableTab("form")}
                                        >
                                            ФОРМА
                                        </button>
                                    </div>

                                    {tableTab === "table" && (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                                    <tr>
                                                        <th className="w-8 px-2 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            #
                                                        </th>
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                            КОМАНДА
                                                        </th>
                                                        <th className="w-12 px-2 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            И
                                                        </th>
                                                        <th className="w-12 px-2 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            В
                                                        </th>
                                                        <th className="w-12 px-2 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            Н
                                                        </th>
                                                        <th className="w-12 px-2 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            П
                                                        </th>
                                                        <th className="w-20 px-2 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            МЗ-МП
                                                        </th>
                                                        <th className="w-12 px-2 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            О
                                                        </th>
                                                        <th className="w-40 px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            ФОРМА
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {teams.data
                                                        ?.slice(0, 15)
                                                        .map((team, idx) => (
                                                            <tr
                                                                key={team.uuid}
                                                                className="hover:bg-gray-50 transition-colors"
                                                            >
                                                                <td className="px-2 py-4 text-center font-bold text-gray-900">
                                                                    {idx + 1}
                                                                </td>
                                                                <td className="px-4 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        {team.logo && (
                                                                            <img
                                                                                src={
                                                                                    team.logo
                                                                                }
                                                                                alt=""
                                                                                className="w-8 h-8 rounded-full object-cover"
                                                                            />
                                                                        )}
                                                                        <span className="font-medium text-gray-900">
                                                                            {getTranslation(
                                                                                team
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-2 py-4 text-center text-gray-700 font-medium">
                                                                    {team.data
                                                                        ?.matches ||
                                                                        0}
                                                                </td>
                                                                <td className="px-2 py-4 text-center text-green-600 font-bold">
                                                                    {team.data
                                                                        ?.wins ||
                                                                        0}
                                                                </td>
                                                                <td className="px-2 py-4 text-center text-blue-600 font-bold">
                                                                    {team.data
                                                                        ?.draws ||
                                                                        0}
                                                                </td>
                                                                <td className="px-2 py-4 text-center text-red-600 font-bold">
                                                                    {team.data
                                                                        ?.loses ||
                                                                        0}
                                                                </td>
                                                                <td className="px-2 py-4 text-center text-gray-700 font-medium">
                                                                    {team.data
                                                                        ?.my_goals ||
                                                                        0}{" "}
                                                                    -{" "}
                                                                    {team.data
                                                                        ?.your_goals ||
                                                                        0}
                                                                </td>
                                                                <td className="px-2 py-4 text-center font-bold text-gray-900">
                                                                    {team.data
                                                                        ?.points ||
                                                                        0}
                                                                </td>
                                                                <td className="px-4 py-4">
                                                                    <div className="flex gap-1 justify-center">
                                                                        {getTeamForm(
                                                                            team
                                                                        ).map(
                                                                            (
                                                                                res,
                                                                                i
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className={`w-7 h-7 rounded flex items-center justify-center text-xs text-white font-bold ${getFormColor(
                                                                                        res
                                                                                    )}`}
                                                                                >
                                                                                    {
                                                                                        res
                                                                                    }
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {tableTab === "form" && (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                                    <tr>
                                                        <th className="w-8 px-2 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            #
                                                        </th>
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                            КОМАНДА
                                                        </th>
                                                        <th className="w-40 px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                                            ФОРМА
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {teams.data
                                                        ?.slice(0, 15)
                                                        .map((team, idx) => (
                                                            <tr
                                                                key={team.uuid}
                                                                className="hover:bg-gray-50 transition-colors"
                                                            >
                                                                <td className="px-2 py-4 text-center font-bold text-gray-900">
                                                                    {idx + 1}
                                                                </td>
                                                                <td className="px-4 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        {team.logo && (
                                                                            <img
                                                                                src={
                                                                                    team.logo
                                                                                }
                                                                                alt=""
                                                                                className="w-8 h-8 rounded-full object-cover"
                                                                            />
                                                                        )}
                                                                        <span className="font-medium text-gray-900">
                                                                            {getTranslation(
                                                                                team
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-4">
                                                                    <div className="flex gap-1 justify-center">
                                                                        {getTeamForm(
                                                                            team
                                                                        ).map(
                                                                            (
                                                                                res,
                                                                                i
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className={`w-7 h-7 rounded flex items-center justify-center text-xs text-white font-bold ${getFormColor(
                                                                                        res
                                                                                    )}`}
                                                                                >
                                                                                    {
                                                                                        res
                                                                                    }
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Recent Matches */}
                            <div className="tfa-container">
                                <h2 className="tfa-section-title flex items-center justify-between">
                                    <span>
                                        {language === "uz" && "Oxirgi o'yinlar"}
                                        {language === "ru" && "Последние матчи"}
                                        {language === "en" && "Recent Matches"}
                                    </span>
                                    <button
                                        onClick={() => navigate("/matches")}
                                        className="text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
                                    >
                                        <span>
                                            {language === "uz" && "Barchasi"}
                                            {language === "ru" && "Все"}
                                            {language === "en" && "All"}
                                        </span>
                                        <FaArrowRight />
                                    </button>
                                </h2>
                                <table className="tfa-table">
                                    <thead>
                                        <tr>
                                            <th className="w-16">Дата</th>
                                            <th>Дома</th>
                                            <th className="w-12 text-center">
                                                Счет
                                            </th>
                                            <th>В гостях</th>
                                            <th className="w-16">Время</th>
                                            <th className="w-16"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lastMatches
                                            ?.slice(0, 8)
                                            .map((match) => (
                                                <tr
                                                    key={match.uuid}
                                                    className="cursor-pointer hover:bg-gray-50"
                                                    onClick={() =>
                                                        navigate(
                                                            `/matches/${match.uuid}`
                                                        )
                                                    }
                                                >
                                                    <td className="match-time">
                                                        {formatDate(
                                                            match.created_at
                                                        )}
                                                    </td>
                                                    <td className="team-name">
                                                        {getTranslation(
                                                            match.team1
                                                        )}
                                                    </td>
                                                    <td
                                                        className={`match-score ${getScoreClass(
                                                            match.score
                                                                .team1_score,
                                                            match.score
                                                                .team2_score
                                                        )}`}
                                                    >
                                                        {
                                                            match.score
                                                                .team1_score
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            match.score
                                                                .team2_score
                                                        }
                                                    </td>
                                                    <td className="team-name">
                                                        {getTranslation(
                                                            match.team2
                                                        )}
                                                    </td>
                                                    <td className="match-time">
                                                        {formatTime(match.time)}
                                                    </td>
                                                    <td>
                                                        {match.live_link && (
                                                            <a
                                                                href={
                                                                    match.live_link
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-red-600 hover:text-red-800 text-sm"
                                                            >
                                                                <FaPlay />
                                                            </a>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* News Section */}
                            <div className="tfa-container">
                                <h2 className="tfa-section-title flex items-center justify-between">
                                    <span>
                                        {language === "uz" && "Yangiliklar"}
                                        {language === "ru" && "Новости"}
                                        {language === "en" && "News"}
                                    </span>
                                    <button
                                        onClick={() => navigate("/news")}
                                        className="text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
                                    >
                                        <span>
                                            {language === "uz" && "Barchasi"}
                                            {language === "ru" && "Все"}
                                            {language === "en" && "All"}
                                        </span>
                                        <FaArrowRight />
                                    </button>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {allNews?.slice(0, 6).map((news) => (
                                        <div
                                            key={news.uuid}
                                            className="flex space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => navigate("/news")}
                                        >
                                            {news.photo && (
                                                <img
                                                    src={news.photo}
                                                    alt={getTranslation(
                                                        news,
                                                        "title"
                                                    )}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                                                    {getTranslation(
                                                        news,
                                                        "title"
                                                    )}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(
                                                        news.created_at
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Photo Gallery */}
                            <div className="tfa-container">
                                <h2 className="tfa-section-title flex items-center justify-between">
                                    <span>
                                        {language === "uz" && "Foto galereya"}
                                        {language === "ru" && "Фото галерея"}
                                        {language === "en" && "Photo Gallery"}
                                    </span>
                                    <button
                                        onClick={() => navigate("/gallery")}
                                        className="text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
                                    >
                                        <span>
                                            {language === "uz" && "Barchasi"}
                                            {language === "ru" && "Все"}
                                            {language === "en" && "All"}
                                        </span>
                                        <FaArrowRight />
                                    </button>
                                </h2>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                    {photos?.slice(0, 12).map((photo) => (
                                        <div
                                            key={photo.uuid}
                                            className="aspect-square overflow-hidden rounded cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => navigate("/gallery")}
                                        >
                                            <img
                                                src={photo.photo}
                                                alt={getTranslation(
                                                    photo,
                                                    "description"
                                                )}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Video Section */}
                            <div className="tfa-container">
                                <h2 className="tfa-section-title flex items-center justify-between">
                                    <span>
                                        {language === "uz" && "Video"}
                                        {language === "ru" && "Видео"}
                                        {language === "en" && "Videos"}
                                    </span>
                                    <button
                                        onClick={() => navigate("/gallery")}
                                        className="text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
                                    >
                                        <span>
                                            {language === "uz" && "Barchasi"}
                                            {language === "ru" && "Все"}
                                            {language === "en" && "All"}
                                        </span>
                                        <FaArrowRight />
                                    </button>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {videos?.slice(0, 3).map((video) => (
                                        <div
                                            key={video.uuid}
                                            className="aspect-video bg-gray-800 rounded overflow-hidden cursor-pointer group"
                                            onClick={() => navigate("/gallery")}
                                        >
                                            {video.link ? (
                                                <iframe
                                                    src={video.link}
                                                    title={getTranslation(
                                                        video,
                                                        "description"
                                                    )}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FaPlay className="text-white text-4xl group-hover:scale-110 transition-transform" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Rich Sidebar */}
                        <div className="space-y-6">
                            {/* Upcoming Matches */}
                            <div className="tfa-sidebar">
                                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase flex items-center">
                                    <FaCalendarAlt className="mr-2" />
                                    {language === "uz" && "Kelayotgan o'yinlar"}
                                    {language === "ru" && "Предстоящие матчи"}
                                    {language === "en" && "Upcoming Matches"}
                                </h3>
                                <div className="space-y-3">
                                    {upcomingMatches
                                        ?.slice(0, 5)
                                        .map((match) => (
                                            <div
                                                key={match.uuid}
                                                className="border-b border-gray-200 pb-2 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                                onClick={() =>
                                                    navigate(
                                                        `/matches/${match.uuid}`
                                                    )
                                                }
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(
                                                            match.created_at
                                                        )}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatTime(match.time)}
                                                    </span>
                                                </div>
                                                <div className="text-sm">
                                                    <div className="font-medium text-gray-900">
                                                        {getTranslation(
                                                            match.team1
                                                        )}
                                                    </div>
                                                    <div className="text-gray-600 text-center my-1">
                                                        VS
                                                    </div>
                                                    <div className="font-medium text-gray-900">
                                                        {getTranslation(
                                                            match.team2
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Top Scorers */}
                            <div className="tfa-sidebar">
                                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase flex items-center">
                                    <FaTrophy className="mr-2" />
                                    {language === "uz" &&
                                        "Eng yaxshi o'yinchilar"}
                                    {language === "ru" && "Лучшие игроки"}
                                    {language === "en" && "Top Scorers"}
                                </h3>
                                <div className="space-y-2">
                                    {topPlayers
                                        ?.slice(0, 8)
                                        .map((player, index) => (
                                            <div
                                                key={player.uuid}
                                                className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
                                                onClick={() =>
                                                    navigate(
                                                        `/players/${player.uuid}`
                                                    )
                                                }
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <span
                                                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                                            index === 0
                                                                ? "bg-yellow-500 text-white"
                                                                : index === 1
                                                                ? "bg-gray-400 text-white"
                                                                : index === 2
                                                                ? "bg-orange-500 text-white"
                                                                : "bg-gray-200 text-gray-700"
                                                        }`}
                                                    >
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-gray-900 font-medium">
                                                        {getTranslation(player)}
                                                    </span>
                                                </div>
                                                <span className="text-green-600 font-bold">
                                                    {player.goals_count || 0}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Latest News Sidebar */}
                            <div className="tfa-sidebar">
                                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase flex items-center">
                                    <FaNewspaper className="mr-2" />
                                    {language === "uz" && "So'nggi yangiliklar"}
                                    {language === "ru" && "Последние новости"}
                                    {language === "en" && "Latest News"}
                                </h3>
                                <div className="space-y-3">
                                    {lastNews?.slice(0, 6).map((news) => (
                                        <div
                                            key={news.uuid}
                                            className="tfa-news-item cursor-pointer hover:bg-gray-50 p-2 rounded"
                                            onClick={() => navigate("/news")}
                                        >
                                            <h4 className="text-sm font-medium text-gray-900 mb-1 leading-tight line-clamp-2">
                                                {getTranslation(news, "title")}
                                            </h4>
                                            <p className="text-xs text-gray-600">
                                                {formatDate(news.created_at)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Statistics Widget */}
                            <div className="tfa-sidebar">
                                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                    {language === "uz" && "Statistika"}
                                    {language === "ru" && "Статистика"}
                                    {language === "en" && "Statistics"}
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">
                                            {language === "uz" && "Jamoalar:"}
                                            {language === "ru" && "Команды:"}
                                            {language === "en" && "Teams:"}
                                        </span>
                                        <span className="font-bold text-purple-600">
                                            {teams?.data?.length || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">
                                            {language === "uz" && "O'yinlar:"}
                                            {language === "ru" && "Матчи:"}
                                            {language === "en" && "Matches:"}
                                        </span>
                                        <span className="font-bold text-purple-600">
                                            {(lastMatches?.length || 0) +
                                                (upcomingMatches?.length || 0)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">
                                            {language === "uz" &&
                                                "O'yinchilar:"}
                                            {language === "ru" && "Игроки:"}
                                            {language === "en" && "Players:"}
                                        </span>
                                        <span className="font-bold text-purple-600">
                                            {topPlayers?.length || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">
                                            {language === "uz" &&
                                                "Yangiliklar:"}
                                            {language === "ru" && "Новости:"}
                                            {language === "en" && "News:"}
                                        </span>
                                        <span className="font-bold text-purple-600">
                                            {allNews?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="tfa-sidebar">
                                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                    {language === "uz" && "Tez havolalar"}
                                    {language === "ru" && "Быстрые ссылки"}
                                    {language === "en" && "Quick Links"}
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => navigate("/tournaments")}
                                        className="w-full text-left tfa-sidebar-item"
                                    >
                                        {language === "uz" && "Turnirlar"}
                                        {language === "ru" && "Турниры"}
                                        {language === "en" && "Tournaments"}
                                    </button>
                                    <button
                                        onClick={() => navigate("/teams")}
                                        className="w-full text-left tfa-sidebar-item"
                                    >
                                        {language === "uz" && "Jamoalar"}
                                        {language === "ru" && "Команды"}
                                        {language === "en" && "Teams"}
                                    </button>
                                    <button
                                        onClick={() => navigate("/players")}
                                        className="w-full text-left tfa-sidebar-item"
                                    >
                                        {language === "uz" && "O'yinchilar"}
                                        {language === "ru" && "Игроки"}
                                        {language === "en" && "Players"}
                                    </button>
                                    <button
                                        onClick={() => navigate("/gallery")}
                                        className="w-full text-left tfa-sidebar-item"
                                    >
                                        {language === "uz" && "Galereya"}
                                        {language === "ru" && "Галерея"}
                                        {language === "en" && "Gallery"}
                                    </button>
                                </div>
                            </div>

                            {/* Birthday Widget */}
                            <div className="tfa-sidebar">
                                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase flex items-center">
                                    🎉 {language === "uz" && "Tug'ilgan kunlar"}
                                    {language === "ru" && "Дни рождения"}
                                    {language === "en" && "Birthdays"}
                                </h3>
                                <div className="space-y-2">
                                    {topPlayers?.slice(0, 6).map((player) => (
                                        <div
                                            key={player.uuid}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span className="text-gray-900">
                                                {getTranslation(player)}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {Math.floor(
                                                    Math.random() * 30
                                                ) + 1}{" "}
                                                {language === "uz"
                                                    ? "yanvar"
                                                    : language === "ru"
                                                    ? "января"
                                                    : "Jan"}
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

export default Home;
