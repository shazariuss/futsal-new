import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { homeApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";
import Loading from "../components/Loading";

const PlayerDetails = () => {
    const { uuid } = useParams();
    const { language, getTranslation } = useLanguageStore();
    const [player, setPlayer] = useState(null);
    const [playerSeasons, setPlayerSeasons] = useState([]);
    const [playerTeams, setPlayerTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const translations = {
        uz: {
            backToHome: "Bosh sahifaga qaytish",
            playerDetails: "O'yinchi tafsilotlari",
            basicInfo: "Asosiy ma'lumot",
            age: "Yosh:",
            birthday: "Tug'ilgan sana:",
            position: "Pozitsiya:",
            number: "Raqam:",
            currentTeam: "Hozirgi jamoa:",
            seria: "Seria:",
            status: "Holat:",
            startDate: "Boshlanish sanasi:",
            endDate: "Tugash sanasi:",
            active: "Faol",
            inactive: "Faol emas",
            statistics: "Statistika",
            goals: "Gollar",
            assists: "Uzatmalar",
            yellowCards: "Sariq kartalar",
            redCards: "Qizil kartalar",
            seasons: "Mavsumlar",
            teams: "Jamoalar",
            matches: "O'yinlar",
            noData: "Ma'lumot topilmadi",
            errorLoading: "O'yinchini yuklashda xatolik",
            playerNotFound: "O'yinchi topilmadi",
            defender: "Himoyachi",
            midfielder: "O'rta maydon",
            forward: "Hujumchi",
            goalkeeper: "Darvozabon",
        },
        ru: {
            backToHome: "Вернуться на главную",
            playerDetails: "Детали игрока",
            basicInfo: "Основная информация",
            age: "Возраст:",
            birthday: "Дата рождения:",
            position: "Позиция:",
            number: "Номер:",
            currentTeam: "Текущая команда:",
            seria: "Серия:",
            status: "Статус:",
            startDate: "Дата начала:",
            endDate: "Дата окончания:",
            active: "Активный",
            inactive: "Неактивный",
            statistics: "Статистика",
            goals: "Голы",
            assists: "Передачи",
            yellowCards: "Желтые карточки",
            redCards: "Красные карточки",
            seasons: "Сезоны",
            teams: "Команды",
            matches: "Матчи",
            noData: "Данные не найдены",
            errorLoading: "Ошибка при загрузке игрока",
            playerNotFound: "Игрок не найден",
            defender: "Защитник",
            midfielder: "Полузащитник",
            forward: "Нападающий",
            goalkeeper: "Вратарь",
        },
        en: {
            backToHome: "Back to Home",
            playerDetails: "Player Details",
            basicInfo: "Basic Information",
            age: "Age:",
            birthday: "Birthday:",
            position: "Position:",
            number: "Number:",
            currentTeam: "Current Team:",
            seria: "Series:",
            status: "Status:",
            startDate: "Start Date:",
            endDate: "End Date:",
            active: "Active",
            inactive: "Inactive",
            statistics: "Statistics",
            goals: "Goals",
            assists: "Assists",
            yellowCards: "Yellow Cards",
            redCards: "Red Cards",
            seasons: "Seasons",
            teams: "Teams",
            matches: "Matches",
            noData: "No data found",
            errorLoading: "Error loading player",
            playerNotFound: "Player not found",
            defender: "Defender",
            midfielder: "Midfielder",
            forward: "Forward",
            goalkeeper: "Goalkeeper",
        },
    };

    const t = translations[language] || translations.en;

    const getPositionName = (position) => {
        const positions = {
            defender: t.defender,
            midfielder: t.midfielder,
            forward: t.forward,
            goalkeeper: t.goalkeeper,
        };
        return positions[position] || position;
    };

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                setLoading(true);
                const [playerResponse, seasonsResponse, teamsResponse] =
                    await Promise.all([
                        homeApi.getPlayer(uuid),
                        homeApi.getPlayerSeasons(uuid),
                        homeApi.getPlayerTeams(uuid),
                    ]);

                setPlayer(playerResponse.data);
                setPlayerSeasons(seasonsResponse.data);
                setPlayerTeams(teamsResponse.data);
            } catch (err) {
                setError("Error loading player");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (uuid) {
            fetchPlayerData();
        }
    }, [uuid]);

    if (loading) return <Loading />;

    if (error)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <div className="text-red-600 text-xl font-semibold">
                        {t.errorLoading}
                    </div>
                    <Link
                        to="/"
                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {t.backToHome}
                    </Link>
                </div>
            </div>
        );

    if (!player)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-gray-600 text-xl">
                        {t.playerNotFound}
                    </div>
                    <Link
                        to="/"
                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {t.backToHome}
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
            <div className="container mx-auto px-4">
                {/* Navigation */}
                <Link
                    to="/"
                    className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 font-medium transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    {t.backToHome}
                </Link>

                {/* Main Player Card */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden">
                                {player.image ? (
                                    <img
                                        src={player.image}
                                        alt={getTranslation(player)}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                                        <span className="text-white font-bold text-2xl">
                                            {getTranslation(player)?.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {getTranslation(player)}
                                </h1>
                                <p className="text-green-100 text-lg">
                                    {getPositionName(player.position)}
                                </p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <span className="bg-white text-green-600 px-3 py-1 rounded-full font-bold">
                                        #{player.number}
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            player.is_active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {player.is_active
                                            ? t.active
                                            : t.inactive}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Basic Info */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-2 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            {t.basicInfo}
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t.age}</span>
                                <span className="font-semibold">
                                    {player.age}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    {t.birthday}
                                </span>
                                <span className="font-semibold">
                                    {player.birthday}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    {t.position}
                                </span>
                                <span className="font-semibold">
                                    {getPositionName(player.position)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    {t.number}
                                </span>
                                <span className="font-semibold">
                                    #{player.number}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t.seria}</span>
                                <span className="font-semibold">
                                    {player.seria}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    {t.startDate}
                                </span>
                                <span className="font-semibold">
                                    {player.start_date}
                                </span>
                            </div>
                            {player.end_date && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.endDate}
                                    </span>
                                    <span className="font-semibold">
                                        {player.end_date}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Current Team */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-2 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {t.currentTeam}
                        </h3>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 mb-2">
                                {getTranslation(player.current_team)}
                            </div>
                            <div className="text-sm text-gray-600 mb-4">
                                {player.current_team?.matches} {t.matches}
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-2 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            {t.statistics}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {player.events?.goals || 0}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {t.goals}
                                </div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {player.events?.assists || 0}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {t.assists}
                                </div>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {player.events?.yellows || 0}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {t.yellowCards}
                                </div>
                            </div>
                            <div className="bg-red-50 rounded-lg p-3 text-center">
                                <div className="text-2xl font-bold text-red-600">
                                    {player.events?.reds || 0}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {t.redCards}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Player Seasons */}
                {playerSeasons && playerSeasons.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-2 text-indigo-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            {t.seasons}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {playerSeasons.map((season, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="font-semibold text-gray-800 mb-2">
                                        {season.name}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        {getTranslation(season.league_name)}
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>{season.start_date}</span>
                                        <span>-</span>
                                        <span>{season.end_date}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                season.is_active
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {season.is_active
                                                ? t.active
                                                : t.inactive}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Player Teams History */}
                {playerTeams && playerTeams.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-2 text-orange-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                />
                            </svg>
                            {t.teams}
                        </h3>
                        <div className="space-y-4">
                            {playerTeams.map((teamHistory, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="font-semibold text-gray-800">
                                                {getTranslation(
                                                    teamHistory.current_team
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {getPositionName(
                                                    teamHistory.position
                                                )}{" "}
                                                • #{teamHistory.number}
                                            </div>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                teamHistory.status === "now"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {teamHistory.status === "now"
                                                ? t.active
                                                : t.inactive}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                                        <span>{teamHistory.start_date}</span>
                                        <span>-</span>
                                        <span>
                                            {teamHistory.end_date || "Present"}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 text-center">
                                        <div className="bg-green-50 rounded p-2">
                                            <div className="font-bold text-green-600">
                                                {teamHistory.events?.goals || 0}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {t.goals}
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 rounded p-2">
                                            <div className="font-bold text-blue-600">
                                                {teamHistory.events?.assists ||
                                                    0}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {t.assists}
                                            </div>
                                        </div>
                                        <div className="bg-yellow-50 rounded p-2">
                                            <div className="font-bold text-yellow-600">
                                                {teamHistory.events?.yellows ||
                                                    0}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {t.yellowCards}
                                            </div>
                                        </div>
                                        <div className="bg-red-50 rounded p-2">
                                            <div className="font-bold text-red-600">
                                                {teamHistory.events?.reds || 0}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {t.redCards}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerDetails;
