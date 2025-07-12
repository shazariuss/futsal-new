import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { homeApi } from "../services/api";
import Loading from "../components/Loading";

const MatchDetails = () => {
    const { uuid } = useParams();
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                setLoading(true);
                const response = await homeApi.getMatchById(uuid);
                setMatch(response.data);
            } catch (err) {
                setError("Ошибка при загрузке матча");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (uuid) {
            fetchMatch();
        }
    }, [uuid]);

    if (loading) return <Loading />;
    if (error)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <div className="text-red-600 text-xl font-semibold">
                        {error}
                    </div>
                    <Link
                        to="/"
                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Вернуться на главную
                    </Link>
                </div>
            </div>
        );
    if (!match)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-gray-600 text-xl">Матч не найден</div>
                    <Link
                        to="/"
                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Вернуться на главную
                    </Link>
                </div>
            </div>
        );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="container mx-auto px-4">
                {/* Navigation */}
                <Link
                    to="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
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
                    Назад к главной
                </Link>

                {/* Main Match Card */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                        <h1 className="text-3xl font-bold text-center mb-2">
                            {match.name}
                        </h1>
                        <p className="text-center text-blue-100 text-lg">
                            {match.league}
                        </p>
                    </div>

                    {/* Main Score Section */}
                    <div className="p-8">
                        <div className="flex justify-center items-center mb-8">
                            {/* Team 1 */}
                            <div className="text-center flex-1">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                                    {match.team1?.icon_url ? (
                                        <img
                                            src={match.team1.icon_url}
                                            alt={match.team1.name_ru}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">
                                                {match.team1?.name_ru?.charAt(
                                                    0
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-xl text-gray-800 mb-2">
                                    {match.team1?.name_ru}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {match.team1?.name_en}
                                </p>
                            </div>

                            {/* Score */}
                            <div className="text-center mx-8">
                                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl p-6 shadow-lg">
                                    <div className="text-5xl font-black mb-2">
                                        {match.score?.team1_score} -{" "}
                                        {match.score?.team2_score}
                                    </div>
                                    <div className="text-sm opacity-90">
                                        ФИНАЛЬНЫЙ СЧЕТ
                                    </div>
                                </div>
                            </div>

                            {/* Team 2 */}
                            <div className="text-center flex-1">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                                    {match.team2?.icon_url ? (
                                        <img
                                            src={match.team2.icon_url}
                                            alt={match.team2.name_ru}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">
                                                {match.team2?.name_ru?.charAt(
                                                    0
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-xl text-gray-800 mb-2">
                                    {match.team2?.name_ru}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {match.team2?.name_en}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Match Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Match Info */}
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Информация о матче
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Время:</span>
                                <span className="font-semibold">
                                    {match.time}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Дата создания:
                                </span>
                                <span className="font-semibold">
                                    {formatDate(match.created_at)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Обновлено:
                                </span>
                                <span className="font-semibold">
                                    {formatDate(match.updated_at)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Статус:</span>
                                <span
                                    className={`px-2 py-1 rounded-full text-sm ${
                                        match.is_active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {match.is_active
                                        ? "Активный"
                                        : "Неактивный"}
                                </span>
                            </div>
                            {match.live_link && (
                                <div className="mt-4">
                                    <a
                                        href={match.live_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                        </svg>
                                        Смотреть в прямом эфире
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Season Statistics */}
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
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            Статистика сезона
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {match.total_goals_in_season
                                            ?.team1_goals || 0}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {match.team1?.name_ru}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-gray-500 font-semibold">
                                Голы в сезоне
                            </div>
                            <div className="bg-red-50 rounded-lg p-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        {match.total_goals_in_season
                                            ?.team2_goals || 0}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {match.team2?.name_ru}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Head to Head */}
                    {match.matches && (
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
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                                Личные встречи
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Побед {match.team1?.name_ru}:
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                                        {match.matches.team_1_wins}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Ничьи:
                                    </span>
                                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-bold">
                                        {match.matches.draws}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Побед {match.team2?.name_ru}:
                                    </span>
                                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">
                                        {match.matches.team_2_wins}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Match History */}
                {match.matches?.data && match.matches.data.length > 0 && (
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
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            История встреч
                        </h3>
                        <div className="space-y-4">
                            {match.matches.data.map((pastMatch, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-gray-800">
                                            {pastMatch.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {formatDate(pastMatch.created_at)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm">
                                                {pastMatch.team1.name_ru}
                                            </span>
                                            <span className="font-bold text-lg">
                                                {pastMatch.score.team1_score}
                                            </span>
                                        </div>
                                        <span className="text-gray-500">-</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-lg">
                                                {pastMatch.score.team2_score}
                                            </span>
                                            <span className="text-sm">
                                                {pastMatch.team2.name_ru}
                                            </span>
                                        </div>
                                    </div>
                                    {pastMatch.league && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            Лига: {pastMatch.league.name_ru}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Referees Section */}
                {match.referee && match.referee.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-2 text-yellow-600"
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
                            Судьи
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {match.referee.map((ref, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-lg p-4 text-center"
                                >
                                    <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="font-semibold">
                                        {ref.name || "Судья"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Events Section */}
                {match.events && match.events.length > 0 && (
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            События матча
                        </h3>
                        <div className="space-y-3">
                            {match.events.map((event, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                            {event.minute || "?"}'
                                        </div>
                                        <div>
                                            <div className="font-semibold">
                                                {event.type || "Событие"}
                                            </div>
                                            <div className="text-gray-600 text-sm">
                                                {event.description || ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {event.team || ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty Events Message */}
                {(!match.events || match.events.length === 0) && (
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            События матча
                        </h3>
                        <div className="text-center text-gray-500 py-8">
                            <svg
                                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-lg">
                                События матча пока не добавлены
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchDetails;
