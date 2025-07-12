import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaPlay, FaEye } from "react-icons/fa";
import { homeApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";
import { useNavigate } from "react-router-dom";

const Matches = () => {
    const [selectedLeague, setSelectedLeague] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedMatch, setSelectedMatch] = useState(null);
    const { language, getTranslation } = useLanguageStore();
    const navigate = useNavigate();

    const { data: leagues } = useQuery({
        queryKey: ["leagues"],
        queryFn: () => homeApi.getLeagues().then((res) => res.data),
    });

    const { data: lastMatches } = useQuery({
        queryKey: ["lastMatches"],
        queryFn: () => homeApi.getLastMatches().then((res) => res.data),
    });

    const { data: upcomingMatches } = useQuery({
        queryKey: ["upcomingMatches"],
        queryFn: () => homeApi.getUpcomingMatches().then((res) => res.data),
    });

    const { data: matchDetails } = useQuery({
        queryKey: ["matchDetails", selectedMatch],
        queryFn: () => homeApi.getMatch(selectedMatch).then((res) => res.data),
        enabled: !!selectedMatch,
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
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

    const getMatchStatus = (match) => {
        if (match.live_link) return "live";
        if (match.status === "upcoming") return "upcoming";
        return "finished";
    };

    const allMatches = [
        ...(lastMatches || []).map((match) => ({
            ...match,
            status: "completed",
        })),
        ...(upcomingMatches || []).map((match) => ({
            ...match,
            status: "upcoming",
        })),
    ];

    const filteredMatches = allMatches.filter((match) => {
        const matchesLeague =
            !selectedLeague ||
            getTranslation(match.league).includes(selectedLeague);
        const matchesStatus =
            selectedStatus === "all" || match.status === selectedStatus;
        return matchesLeague && matchesStatus;
    });

    return (
        <div className="tfa-layout">
            <div className="tfa-main-content">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Page Header */}
                    <div className="tfa-container">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            {language === "uz" && "O'yinlar jadvali"}
                            {language === "ru" && "Расписание матчей"}
                            {language === "en" && "Match Schedule"}
                        </h1>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {language === "uz" && "Liga"}
                                    {language === "ru" && "Лига"}
                                    {language === "en" && "League"}
                                </label>
                                <select
                                    value={selectedLeague}
                                    onChange={(e) =>
                                        setSelectedLeague(e.target.value)
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                                >
                                    <option value="">
                                        {language === "uz" && "Barcha ligalar"}
                                        {language === "ru" && "Все лиги"}
                                        {language === "en" && "All Leagues"}
                                    </option>
                                    {leagues?.map((league) => (
                                        <option
                                            key={league.uuid}
                                            value={getTranslation(league)}
                                        >
                                            {getTranslation(league)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {language === "uz" && "Holat"}
                                    {language === "ru" && "Статус"}
                                    {language === "en" && "Status"}
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) =>
                                        setSelectedStatus(e.target.value)
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                                >
                                    <option value="all">
                                        {language === "uz" && "Barchasi"}
                                        {language === "ru" && "Все"}
                                        {language === "en" && "All"}
                                    </option>
                                    <option value="completed">
                                        {language === "uz" && "Tugagan"}
                                        {language === "ru" && "Завершенные"}
                                        {language === "en" && "Completed"}
                                    </option>
                                    <option value="upcoming">
                                        {language === "uz" && "Kelayotgan"}
                                        {language === "ru" && "Предстоящие"}
                                        {language === "en" && "Upcoming"}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Matches Table */}
                        <div className="lg:col-span-2">
                            <div className="tfa-container">
                                <h2 className="tfa-section-title">
                                    {language === "uz" && "O'yinlar ro'yxati"}
                                    {language === "ru" && "Список матчей"}
                                    {language === "en" && "Match List"}
                                </h2>

                                <table className="tfa-table">
                                    <thead>
                                        <tr>
                                            <th className="w-16">
                                                {language === "uz" && "Sana"}
                                                {language === "ru" && "Дата"}
                                                {language === "en" && "Date"}
                                            </th>
                                            <th className="w-12">
                                                {language === "uz" && "Vaqt"}
                                                {language === "ru" && "Время"}
                                                {language === "en" && "Time"}
                                            </th>
                                            <th>
                                                {language === "uz" &&
                                                    "Uy egasi"}
                                                {language === "ru" && "Дома"}
                                                {language === "en" && "Home"}
                                            </th>
                                            <th className="w-16 text-center">
                                                {language === "uz" && "Natija"}
                                                {language === "ru" && "Счет"}
                                                {language === "en" && "Score"}
                                            </th>
                                            <th>
                                                {language === "uz" && "Mehmon"}
                                                {language === "ru" &&
                                                    "В гостях"}
                                                {language === "en" && "Away"}
                                            </th>
                                            <th className="w-20">
                                                {language === "uz" && "Amallar"}
                                                {language === "ru" &&
                                                    "Действия"}
                                                {language === "en" && "Actions"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMatches.map((match) => (
                                            <tr
                                                key={match.uuid}
                                                className="cursor-pointer hover:bg-gray-50"
                                                onClick={() =>
                                                    setSelectedMatch(match.uuid)
                                                }
                                            >
                                                <td className="match-time">
                                                    {formatDate(
                                                        match.created_at
                                                    )}
                                                </td>
                                                <td className="match-time">
                                                    {formatTime(match.time)}
                                                </td>
                                                <td className="team-name">
                                                    {getTranslation(
                                                        match.team1
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {match.status ===
                                                    "upcoming" ? (
                                                        <span className="text-blue-600 font-medium">
                                                            VS
                                                        </span>
                                                    ) : (
                                                        <span
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
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="team-name">
                                                    {getTranslation(
                                                        match.team2
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="flex space-x-1">
                                                        {match.live_link && (
                                                            <a
                                                                href={
                                                                    match.live_link
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-red-600 hover:text-red-800 text-xs"
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            >
                                                                <FaPlay />
                                                            </a>
                                                        )}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(
                                                                    `/matches/${match.uuid}`
                                                                );
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800 text-xs"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Match Details Sidebar */}
                        <div>
                            {selectedMatch && matchDetails ? (
                                <div className="tfa-sidebar">
                                    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                        {language === "uz" &&
                                            "O'yin tafsilotlari"}
                                        {language === "ru" && "Детали матча"}
                                        {language === "en" && "Match Details"}
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Teams */}
                                        <div className="text-center bg-gray-50 rounded p-3">
                                            <div className="font-medium text-sm text-gray-900">
                                                {getTranslation(
                                                    matchDetails.team1
                                                )}
                                            </div>
                                            <div className="text-2xl font-bold text-purple-600 my-2">
                                                {matchDetails.score.team1_score}{" "}
                                                -{" "}
                                                {matchDetails.score.team2_score}
                                            </div>
                                            <div className="font-medium text-sm text-gray-900">
                                                {getTranslation(
                                                    matchDetails.team2
                                                )}
                                            </div>
                                        </div>

                                        {/* Match Info */}
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Liga:
                                                </span>
                                                <span className="font-medium">
                                                    {matchDetails.league}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    {language === "uz" &&
                                                        "Sana:"}
                                                    {language === "ru" &&
                                                        "Дата:"}
                                                    {language === "en" &&
                                                        "Date:"}
                                                </span>
                                                <span className="font-medium">
                                                    {formatDate(
                                                        matchDetails.created_at
                                                    )}
                                                </span>
                                            </div>
                                            {matchDetails.time && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        {language === "uz" &&
                                                            "Vaqt:"}
                                                        {language === "ru" &&
                                                            "Время:"}
                                                        {language === "en" &&
                                                            "Time:"}
                                                    </span>
                                                    <span className="font-medium">
                                                        {formatTime(
                                                            matchDetails.time
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Live Link */}
                                        {matchDetails.live_link && (
                                            <a
                                                href={matchDetails.live_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block bg-red-600 text-white text-center py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                                            >
                                                <FaPlay className="inline mr-2" />
                                                {language === "uz" &&
                                                    "Jonli efir"}
                                                {language === "ru" &&
                                                    "Прямой эфир"}
                                                {language === "en" &&
                                                    "Live Stream"}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="tfa-sidebar">
                                    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                        {language === "uz" &&
                                            "O'yin tafsilotlari"}
                                        {language === "ru" && "Детали матча"}
                                        {language === "en" && "Match Details"}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {language === "uz" &&
                                            "Tafsilotlarni ko'rish uchun o'yinni tanlang"}
                                        {language === "ru" &&
                                            "Выберите матч для просмотра деталей"}
                                        {language === "en" &&
                                            "Select a match to view details"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Matches;
