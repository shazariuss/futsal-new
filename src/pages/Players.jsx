import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaEye, FaFutbol, FaHandsHelping } from "react-icons/fa";
import { homeApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";
import { useNavigate } from "react-router-dom";

const Players = () => {
    const { id } = useParams();
    const [selectedLeague, setSelectedLeague] = useState(id || "");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("goals");
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const { language, getTranslation } = useLanguageStore();
    const navigate = useNavigate();

    const { data: leagues } = useQuery({
        queryKey: ["leagues"],
        queryFn: () => homeApi.getLeagues().then((res) => res.data),
    });

    const { data: players } = useQuery({
        queryKey: ["players", selectedLeague],
        queryFn: () =>
            homeApi.getPlayersByLeague(selectedLeague).then((res) => res.data),
        enabled: !!selectedLeague,
    });

    const { data: playerDetails } = useQuery({
        queryKey: ["playerDetails", selectedPlayer],
        queryFn: () =>
            homeApi.getPlayer(selectedPlayer).then((res) => res.data),
        enabled: !!selectedPlayer,
    });

    const { data: topPlayers } = useQuery({
        queryKey: ["topPlayers", 2024],
        queryFn: () => homeApi.getTopPlayers(2024).then((res) => res.data),
    });

    const positions = {
        uz: {
            goalkeeper: "Darvozabon",
            defender: "Himoyachi",
            midfielder: "Yarim himoyachi",
            forward: "Hujumchi",
        },
        ru: {
            goalkeeper: "Вратарь",
            defender: "Защитник",
            midfielder: "Полузащитник",
            forward: "Нападающий",
        },
        en: {
            goalkeeper: "Goalkeeper",
            defender: "Defender",
            midfielder: "Midfielder",
            forward: "Forward",
        },
    };

    const sortOptions = {
        uz: {
            goals: "Gollar bo'yicha",
            assists: "Uzatmalar bo'yicha",
            name: "Ism bo'yicha",
            age: "Yosh bo'yicha",
        },
        ru: {
            goals: "По голам",
            assists: "По передачам",
            name: "По имени",
            age: "По возрасту",
        },
        en: {
            goals: "By Goals",
            assists: "By Assists",
            name: "By Name",
            age: "By Age",
        },
    };

    // Filter and sort players
    const filteredPlayers = players?.filter((player) => {
        const matchesSearch = getTranslation(player)
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesPosition =
            !selectedPosition || player.position === selectedPosition;
        return matchesSearch && matchesPosition;
    });

    const sortedPlayers = filteredPlayers?.sort((a, b) => {
        switch (sortBy) {
            case "goals":
                return (b.goals_count || 0) - (a.goals_count || 0);
            case "assists":
                return (b.assists_count || 0) - (a.assists_count || 0);
            case "name":
                return getTranslation(a).localeCompare(getTranslation(b));
            case "age":
                return new Date(b.birthday) - new Date(a.birthday);
            default:
                return 0;
        }
    });

    const calculateAge = (birthday) => {
        if (!birthday) return "-";
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    return (
        <div className="tfa-layout">
            <div className="tfa-main-content">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Page Header */}
                    <div className="tfa-container">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            {language === "uz" && "O'yinchilar"}
                            {language === "ru" && "Игроки"}
                            {language === "en" && "Players"}
                        </h1>

                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-4 border-b border-gray-200">
                            {/* League Selector */}
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                                >
                                    <option value="">
                                        {language === "uz" && "Ligani tanlang"}
                                        {language === "ru" && "Выберите лигу"}
                                        {language === "en" && "Select League"}
                                    </option>
                                    {leagues?.map((league) => (
                                        <option
                                            key={league.uuid}
                                            value={league.uuid}
                                        >
                                            {getTranslation(league)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Position Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {language === "uz" && "Pozitsiya"}
                                    {language === "ru" && "Позиция"}
                                    {language === "en" && "Position"}
                                </label>
                                <select
                                    value={selectedPosition}
                                    onChange={(e) =>
                                        setSelectedPosition(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                                >
                                    <option value="">
                                        {language === "uz" &&
                                            "Barcha pozitsiyalar"}
                                        {language === "ru" && "Все позиции"}
                                        {language === "en" && "All Positions"}
                                    </option>
                                    {Object.entries(positions[language]).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Search */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {language === "uz" && "Qidirish"}
                                    {language === "ru" && "Поиск"}
                                    {language === "en" && "Search"}
                                </label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder={
                                        language === "uz"
                                            ? "O'yinchi nomi..."
                                            : language === "ru"
                                            ? "Имя игрока..."
                                            : "Player name..."
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {language === "uz" && "Saralash"}
                                    {language === "ru" && "Сортировка"}
                                    {language === "en" && "Sort By"}
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                                >
                                    {Object.entries(sortOptions[language]).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Top Players Section */}
                    {/* {!selectedLeague && topPlayers && (
                        <div className="tfa-container mb-6">
                            <h2 className="tfa-section-title">
                                {language === "uz" &&
                                    "Eng yaxshi o'yinchilar 2024"}
                                {language === "ru" && "Лучшие игроки 2024"}
                                {language === "en" && "Top Players 2024"}
                            </h2>

                            <table className="tfa-table">
                                <thead>
                                    <tr>
                                        <th className="w-12">#</th>
                                        <th>
                                            {language === "uz" && "O'yinchi"}
                                            {language === "ru" && "Игрок"}
                                            {language === "en" && "Player"}
                                        </th>
                                        <th>
                                            {language === "uz" && "Jamoa"}
                                            {language === "ru" && "Команда"}
                                            {language === "en" && "Team"}
                                        </th>
                                        <th className="w-16 text-center">
                                            {language === "uz" && "Gollar"}
                                            {language === "ru" && "Голы"}
                                            {language === "en" && "Goals"}
                                        </th>
                                        <th className="w-16 text-center">
                                            {language === "uz" && "Uzatmalar"}
                                            {language === "ru" && "Передачи"}
                                            {language === "en" && "Assists"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topPlayers
                                        .slice(0, 10)
                                        .map((player, index) => (
                                            <tr
                                                key={player.uuid}
                                                className="cursor-pointer hover:bg-gray-50"
                                                onClick={() =>
                                                    navigate(
                                                        `/players/${player.uuid}`
                                                    )
                                                }
                                            >
                                                <td className="text-center">
                                                    <span
                                                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
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
                                                </td>
                                                <td className="team-name">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="w-6 h-6 bg-purple-600 text-white rounded text-xs flex items-center justify-center font-medium">
                                                            {player.number}
                                                        </span>
                                                        <span>
                                                            {getTranslation(
                                                                player
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {getTranslation(
                                                        player.current_team ||
                                                            player.team
                                                    )}
                                                </td>
                                                <td className="text-center text-green-600 font-bold">
                                                    {player.goals_count ||
                                                        (player.events &&
                                                            player.events
                                                                .goals) ||
                                                        0}
                                                </td>
                                                <td className="text-center text-blue-600 font-bold">
                                                    {player.assists_count ||
                                                        (player.events &&
                                                            player.events
                                                                .assists) ||
                                                        0}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )} */}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Players Table */}
                        <div className="lg:col-span-2">
                            {selectedLeague && sortedPlayers ? (
                                <div className="tfa-container">
                                    <h2 className="tfa-section-title">
                                        {language === "uz" &&
                                            "O'yinchilar ro'yxati"}
                                        {language === "ru" && "Список игроков"}
                                        {language === "en" && "Players List"}(
                                        {sortedPlayers.length})
                                    </h2>

                                    <table className="tfa-table">
                                        <thead>
                                            <tr>
                                                <th className="w-12">#</th>
                                                <th>
                                                    {language === "uz" &&
                                                        "O'yinchi"}
                                                    {language === "ru" &&
                                                        "Игрок"}
                                                    {language === "en" &&
                                                        "Player"}
                                                </th>
                                                <th>
                                                    {language === "uz" &&
                                                        "Pozitsiya"}
                                                    {language === "ru" &&
                                                        "Позиция"}
                                                    {language === "en" &&
                                                        "Position"}
                                                </th>
                                                <th>
                                                    {language === "uz" &&
                                                        "Jamoa"}
                                                    {language === "ru" &&
                                                        "Команда"}
                                                    {language === "en" &&
                                                        "Team"}
                                                </th>
                                                <th className="w-12 text-center">
                                                    {language === "uz" &&
                                                        "Yosh"}
                                                    {language === "ru" &&
                                                        "Возраст"}
                                                    {language === "en" && "Age"}
                                                </th>
                                                <th className="w-12 text-center">
                                                    ⚽
                                                </th>
                                                <th className="w-12 text-center">
                                                    🎯
                                                </th>
                                                <th className="w-16"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedPlayers.map((player) => (
                                                <tr
                                                    key={player.uuid}
                                                    className="cursor-pointer hover:bg-gray-50"
                                                    onClick={() =>
                                                        setSelectedPlayer(
                                                            player.uuid
                                                        )
                                                    }
                                                >
                                                    <td className="text-center">
                                                        <span className="w-6 h-6 bg-purple-600 text-white rounded text-xs flex items-center justify-center font-medium">
                                                            {player.number}
                                                        </span>
                                                    </td>
                                                    <td className="team-name">
                                                        {getTranslation(player)}
                                                    </td>
                                                    <td className="text-sm">
                                                        {player.position?.[
                                                            `position_${language}`
                                                        ] ||
                                                            positions[language][
                                                                player.position
                                                            ] ||
                                                            "-"}
                                                    </td>
                                                    <td>
                                                        {getTranslation(
                                                            player.current_team ||
                                                                player.team
                                                        )}
                                                    </td>
                                                    <td className="text-center text-sm">
                                                        {calculateAge(
                                                            player.birthday
                                                        )}
                                                    </td>
                                                    <td className="text-center text-green-600 font-bold">
                                                        {player.goals_count ||
                                                            (player.events &&
                                                                player.events
                                                                    .goals) ||
                                                            0}
                                                    </td>
                                                    <td className="text-center text-blue-600 font-bold">
                                                        {player.assists_count ||
                                                            (player.events &&
                                                                player.events
                                                                    .assists) ||
                                                            0}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(
                                                                    `/players/${player.uuid}`
                                                                );
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="tfa-container">
                                    <div className="text-center py-12">
                                        <FaFutbol className="text-6xl text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                            {language === "uz" &&
                                                "Ligani tanlang"}
                                            {language === "ru" &&
                                                "Выберите лигу"}
                                            {language === "en" &&
                                                "Select a League"}
                                        </h3>
                                        <p className="text-gray-500">
                                            {language === "uz" &&
                                                "O'yinchilar ro'yxatini ko'rish uchun ligani tanlang"}
                                            {language === "ru" &&
                                                "Выберите лигу для просмотра игроков"}
                                            {language === "en" &&
                                                "Choose a league to view players"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Player Details Sidebar */}
                        <div>
                            {selectedPlayer && playerDetails ? (
                                <div className="tfa-sidebar">
                                    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                        {language === "uz" &&
                                            "O'yinchi tafsilotlari"}
                                        {language === "ru" && "Детали игрока"}
                                        {language === "en" && "Player Details"}
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Player Info */}
                                        <div className="bg-gray-50 rounded p-3">
                                            <h4 className="font-bold text-gray-900 mb-2">
                                                {getTranslation(playerDetails)}
                                            </h4>
                                            <div className="space-y-1 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        {language === "uz" &&
                                                            "Raqam:"}
                                                        {language === "ru" &&
                                                            "Номер:"}
                                                        {language === "en" &&
                                                            "Number:"}
                                                    </span>
                                                    <span className="font-medium">
                                                        #{playerDetails.number}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        {language === "uz" &&
                                                            "Yosh:"}
                                                        {language === "ru" &&
                                                            "Возраст:"}
                                                        {language === "en" &&
                                                            "Age:"}
                                                    </span>
                                                    <span className="font-medium">
                                                        {playerDetails.age ||
                                                            calculateAge(
                                                                playerDetails.birthday
                                                            )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        {language === "uz" &&
                                                            "Jamoa:"}
                                                        {language === "ru" &&
                                                            "Команда:"}
                                                        {language === "en" &&
                                                            "Team:"}
                                                    </span>
                                                    <span className="font-medium">
                                                        {getTranslation(
                                                            playerDetails.current_team
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Statistics */}
                                        <div>
                                            <h5 className="font-medium text-gray-800 text-sm mb-2">
                                                {language === "uz" &&
                                                    "Statistika"}
                                                {language === "ru" &&
                                                    "Статистика"}
                                                {language === "en" &&
                                                    "Statistics"}
                                            </h5>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-green-50 rounded p-2 text-center">
                                                    <div className="text-lg font-bold text-green-600">
                                                        {playerDetails.events
                                                            ?.goals || 0}
                                                    </div>
                                                    <div className="text-xs text-gray-600">
                                                        {language === "uz" &&
                                                            "Gollar"}
                                                        {language === "ru" &&
                                                            "Голы"}
                                                        {language === "en" &&
                                                            "Goals"}
                                                    </div>
                                                </div>
                                                <div className="bg-blue-50 rounded p-2 text-center">
                                                    <div className="text-lg font-bold text-blue-600">
                                                        {playerDetails.events
                                                            ?.assists || 0}
                                                    </div>
                                                    <div className="text-xs text-gray-600">
                                                        {language === "uz" &&
                                                            "Uzatmalar"}
                                                        {language === "ru" &&
                                                            "Передачи"}
                                                        {language === "en" &&
                                                            "Assists"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="tfa-sidebar">
                                    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                        {language === "uz" &&
                                            "O'yinchi tafsilotlari"}
                                        {language === "ru" && "Детали игрока"}
                                        {language === "en" && "Player Details"}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {language === "uz" &&
                                            "Tafsilotlarni ko'rish uchun o'yinchini tanlang"}
                                        {language === "ru" &&
                                            "Выберите игрока для просмотра деталей"}
                                        {language === "en" &&
                                            "Select a player to view details"}
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

export default Players;
