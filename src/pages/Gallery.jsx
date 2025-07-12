import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaImages,
    FaVideo,
    FaPlay,
    FaTimes,
    FaDownload,
    FaEye,
} from "react-icons/fa";
import { newsApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";

const Gallery = () => {
    const [activeTab, setActiveTab] = useState("photos");
    const [selectedItem, setSelectedItem] = useState(null);
    const [photosSize, setPhotosSize] = useState(24);
    const [videosSize, setVideosSize] = useState(12);
    const { language, getTranslation } = useLanguageStore();

    const { data: photos } = useQuery({
        queryKey: ["galleryPhotos", photosSize],
        queryFn: () => newsApi.getPhotos(photosSize).then((res) => res.data),
    });

    const { data: videos } = useQuery({
        queryKey: ["galleryVideos", videosSize],
        queryFn: () => newsApi.getVideos(videosSize).then((res) => res.data),
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="tfa-layout">
            <div className="tfa-main-content">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Page Header */}
                    <div className="tfa-container">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            {language === "uz" && "Media galereya"}
                            {language === "ru" && "Медиа галерея"}
                            {language === "en" && "Media Gallery"}
                        </h1>

                        {/* Tabs */}
                        <div className="flex space-x-1 mb-6 border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab("photos")}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "photos"
                                        ? "border-purple-500 text-purple-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <FaImages className="inline mr-2" />
                                {language === "uz" && "Rasmlar"}
                                {language === "ru" && "Фотографии"}
                                {language === "en" && "Photos"}
                                <span className="ml-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                    {photos?.length || 0}
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab("videos")}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "videos"
                                        ? "border-purple-500 text-purple-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <FaVideo className="inline mr-2" />
                                {language === "uz" && "Videolar"}
                                {language === "ru" && "Видео"}
                                {language === "en" && "Videos"}
                                <span className="ml-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                    {videos?.length || 0}
                                </span>
                            </button>
                        </div>

                        {/* Size Control */}
                        <div className="flex justify-end mb-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-sm text-gray-600">
                                    {language === "uz" && "Ko'rsatish:"}
                                    {language === "ru" && "Показать:"}
                                    {language === "en" && "Show:"}
                                </label>
                                <select
                                    value={
                                        activeTab === "photos"
                                            ? photosSize
                                            : videosSize
                                    }
                                    onChange={(e) => {
                                        if (activeTab === "photos") {
                                            setPhotosSize(
                                                Number(e.target.value)
                                            );
                                        } else {
                                            setVideosSize(
                                                Number(e.target.value)
                                            );
                                        }
                                    }}
                                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                                >
                                    <option value={6}>6</option>
                                    <option value={12}>12</option>
                                    <option value={24}>24</option>
                                    <option value={48}>48</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === "photos" ? (
                            <motion.div
                                key="photos"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="tfa-container"
                            >
                                <h2 className="tfa-section-title">
                                    {language === "uz" && "Foto galereya"}
                                    {language === "ru" && "Фото галерея"}
                                    {language === "en" && "Photo Gallery"}
                                </h2>

                                {/* Photos Table */}
                                <table className="tfa-table mb-6">
                                    <thead>
                                        <tr>
                                            <th className="w-20">
                                                {language === "uz" && "Sana"}
                                                {language === "ru" && "Дата"}
                                                {language === "en" && "Date"}
                                            </th>
                                            <th className="w-32">
                                                {language === "uz" && "Rasm"}
                                                {language === "ru" &&
                                                    "Изображение"}
                                                {language === "en" && "Image"}
                                            </th>
                                            <th>
                                                {language === "uz" && "Tavsif"}
                                                {language === "ru" &&
                                                    "Описание"}
                                                {language === "en" &&
                                                    "Description"}
                                            </th>
                                            <th className="w-16">
                                                {language === "uz" &&
                                                    "Ko'rishlar"}
                                                {language === "ru" &&
                                                    "Просмотры"}
                                                {language === "en" && "Views"}
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
                                        {photos?.map((photo) => (
                                            <tr
                                                key={photo.uuid}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="match-time">
                                                    {formatDate(
                                                        photo.created_at
                                                    )}
                                                </td>
                                                <td>
                                                    <img
                                                        src={photo.photo}
                                                        alt={getTranslation(
                                                            photo,
                                                            "description"
                                                        )}
                                                        className="w-20 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                                                        onClick={() =>
                                                            setSelectedItem({
                                                                ...photo,
                                                                type: "photo",
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-sm">
                                                    {getTranslation(
                                                        photo,
                                                        "description"
                                                    )}
                                                </td>
                                                <td className="text-center text-sm text-gray-500">
                                                    {Math.floor(
                                                        Math.random() * 1000
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                setSelectedItem(
                                                                    {
                                                                        ...photo,
                                                                        type: "photo",
                                                                    }
                                                                )
                                                            }
                                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        <a
                                                            href={photo.photo}
                                                            download
                                                            className="text-green-600 hover:text-green-800 text-sm"
                                                        >
                                                            <FaDownload />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="videos"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="tfa-container"
                            >
                                <h2 className="tfa-section-title">
                                    {language === "uz" && "Video galereya"}
                                    {language === "ru" && "Видео галерея"}
                                    {language === "en" && "Video Gallery"}
                                </h2>

                                {/* Videos Table */}
                                <table className="tfa-table mb-6">
                                    <thead>
                                        <tr>
                                            <th className="w-20">
                                                {language === "uz" && "Sana"}
                                                {language === "ru" && "Дата"}
                                                {language === "en" && "Date"}
                                            </th>
                                            <th className="w-32">
                                                {language === "uz" && "Video"}
                                                {language === "ru" && "Видео"}
                                                {language === "en" && "Video"}
                                            </th>
                                            <th>
                                                {language === "uz" && "Tavsif"}
                                                {language === "ru" &&
                                                    "Описание"}
                                                {language === "en" &&
                                                    "Description"}
                                            </th>
                                            <th className="w-16">
                                                {language === "uz" &&
                                                    "Ko'rishlar"}
                                                {language === "ru" &&
                                                    "Просмотры"}
                                                {language === "en" && "Views"}
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
                                        {videos?.map((video) => (
                                            <tr
                                                key={video.uuid}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="match-time">
                                                    {formatDate(
                                                        video.created_at
                                                    )}
                                                </td>
                                                <td>
                                                    <div
                                                        className="w-20 h-16 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
                                                        onClick={() =>
                                                            setSelectedItem({
                                                                ...video,
                                                                type: "video",
                                                            })
                                                        }
                                                    >
                                                        <FaPlay className="text-white text-lg" />
                                                    </div>
                                                </td>
                                                <td className="text-sm">
                                                    {getTranslation(
                                                        video,
                                                        "description"
                                                    )}
                                                </td>
                                                <td className="text-center text-sm text-gray-500">
                                                    {Math.floor(
                                                        Math.random() * 2000
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            setSelectedItem({
                                                                ...video,
                                                                type: "video",
                                                            })
                                                        }
                                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        <FaPlay />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal */}
                    <AnimatePresence>
                        {selectedItem && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
                                onClick={() => setSelectedItem(null)}
                            >
                                <div className="relative max-w-4xl max-h-full w-full">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
                                    >
                                        <FaTimes />
                                    </button>

                                    {/* Content */}
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0.8 }}
                                        className="bg-white rounded-lg overflow-hidden"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {selectedItem.type === "photo" ? (
                                            <div>
                                                <img
                                                    src={selectedItem.photo}
                                                    alt={getTranslation(
                                                        selectedItem,
                                                        "description"
                                                    )}
                                                    className="w-full max-h-96 object-contain"
                                                />
                                                <div className="p-4">
                                                    <h3 className="font-bold text-lg mb-2">
                                                        {getTranslation(
                                                            selectedItem,
                                                            "description"
                                                        )}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        {formatDate(
                                                            selectedItem.created_at
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="aspect-video">
                                                    {selectedItem.link ? (
                                                        <iframe
                                                            src={
                                                                selectedItem.link
                                                            }
                                                            title={getTranslation(
                                                                selectedItem,
                                                                "description"
                                                            )}
                                                            className="w-full h-full"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                            <FaPlay className="text-white text-6xl" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-lg mb-2">
                                                        {getTranslation(
                                                            selectedItem,
                                                            "description"
                                                        )}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        {formatDate(
                                                            selectedItem.created_at
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
