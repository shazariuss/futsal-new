import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaImages,
    FaVideo,
    FaSearch,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaDownload,
    FaShare,
    FaCalendarAlt,
    FaPlay,
    FaExpand,
} from "react-icons/fa";
import { newsApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";
import Loading from "../components/Loading";

const Gallery = () => {
    const [activeTab, setActiveTab] = useState("photos"); // photos, videos
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [photosSize, setPhotosSize] = useState(24);
    const [videosSize, setVideosSize] = useState(12);
    const { language, getTranslation } = useLanguageStore();

    const { data: photos, isLoading: photosLoading } = useQuery({
        queryKey: ["galleryPhotos", photosSize],
        queryFn: () => newsApi.getPhotos(photosSize).then((res) => res.data),
    });

    const { data: videos, isLoading: videosLoading } = useQuery({
        queryKey: ["galleryVideos", videosSize],
        queryFn: () => newsApi.getVideos(videosSize).then((res) => res.data),
    });

    const { data: lastMedia } = useQuery({
        queryKey: ["lastMedia"],
        queryFn: () => newsApi.getLastMedia().then((res) => res.data),
    });

    const pageContent = {
        uz: {
            title: "Galereya",
            subtitle: "Foto va videolar to'plami",
            photos: "Rasmlar",
            videos: "Videolar",
            allPhotos: "Barcha rasmlar",
            allVideos: "Barcha videolar",
            searchGallery: "Galereyada qidirish...",
            noPhotos: "Rasmlar topilmadi",
            noVideos: "Videolar topilmadi",
            viewPhoto: "Rasmni ko'rish",
            watchVideo: "Videoni tomosha qilish",
            downloadPhoto: "Rasmni yuklab olish",
            sharePhoto: "Rasmni ulashish",
            closeGallery: "Galereyani yopish",
            nextPhoto: "Keyingi rasm",
            prevPhoto: "Oldingi rasm",
            photoDetails: "Rasm tafsilotlari",
            videoDetails: "Video tafsilotlari",
            publishedOn: "Nashr qilingan",
            relatedMatch: "Tegishli o'yin",
            loadMore: "Ko'proq yuklash",
            showLess: "Kamroq ko'rsatish",
            featured: "Tanlangan",
            latest: "So'nggi",
            popular: "Mashhur",
        },
        ru: {
            title: "Галерея",
            subtitle: "Коллекция фото и видео",
            photos: "Фотографии",
            videos: "Видео",
            allPhotos: "Все фотографии",
            allVideos: "Все видео",
            searchGallery: "Поиск в галерее...",
            noPhotos: "Фотографии не найдены",
            noVideos: "Видео не найдены",
            viewPhoto: "Просмотр фото",
            watchVideo: "Смотреть видео",
            downloadPhoto: "Скачать фото",
            sharePhoto: "Поделиться фото",
            closeGallery: "Закрыть галерею",
            nextPhoto: "Следующее фото",
            prevPhoto: "Предыдущее фото",
            photoDetails: "Детали фото",
            videoDetails: "Детали видео",
            publishedOn: "Опубликовано",
            relatedMatch: "Связанный матч",
            loadMore: "Загрузить еще",
            showLess: "Показать меньше",
            featured: "Рекомендуемые",
            latest: "Последние",
            popular: "Популярные",
        },
        en: {
            title: "Gallery",
            subtitle: "Collection of photos and videos",
            photos: "Photos",
            videos: "Videos",
            allPhotos: "All Photos",
            allVideos: "All Videos",
            searchGallery: "Search gallery...",
            noPhotos: "No photos found",
            noVideos: "No videos found",
            viewPhoto: "View Photo",
            watchVideo: "Watch Video",
            downloadPhoto: "Download Photo",
            sharePhoto: "Share Photo",
            closeGallery: "Close Gallery",
            nextPhoto: "Next Photo",
            prevPhoto: "Previous Photo",
            photoDetails: "Photo Details",
            videoDetails: "Video Details",
            publishedOn: "Published on",
            relatedMatch: "Related Match",
            loadMore: "Load More",
            showLess: "Show Less",
            featured: "Featured",
            latest: "Latest",
            popular: "Popular",
        },
    };

    const content = pageContent[language];

    // Filter photos/videos based on search term
    const filteredPhotos = photos?.filter((photo) =>
        getTranslation(photo, "description")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const filteredVideos = videos?.filter((video) =>
        getTranslation(video, "description")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(
            language === "uz" ? "uz-UZ" : language === "ru" ? "ru-RU" : "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );
    };

    const handleItemClick = (item, index, type) => {
        setSelectedItem({ ...item, type });
        setCurrentIndex(index);
    };

    const handleNext = () => {
        const items =
            selectedItem.type === "photo" ? filteredPhotos : filteredVideos;
        const nextIndex = (currentIndex + 1) % items.length;
        setCurrentIndex(nextIndex);
        setSelectedItem({ ...items[nextIndex], type: selectedItem.type });
    };

    const handlePrev = () => {
        const items =
            selectedItem.type === "photo" ? filteredPhotos : filteredVideos;
        const prevIndex =
            currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        setSelectedItem({ ...items[prevIndex], type: selectedItem.type });
    };

    const handleDownload = (url, filename) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-gray-900 mb-4"
                    >
                        {content.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600"
                    >
                        {content.subtitle}
                    </motion.p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="tfa-card text-center"
                    >
                        <div className="card-content">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaImages className="text-primary-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {photos?.length || 0}
                            </h3>
                            <p className="text-gray-600">{content.photos}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="tfa-card text-center"
                    >
                        <div className="card-content">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaVideo className="text-red-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {videos?.length || 0}
                            </h3>
                            <p className="text-gray-600">{content.videos}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="tfa-card text-center"
                    >
                        <div className="card-content">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaCalendarAlt className="text-green-600 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {new Date().getFullYear()}
                            </h3>
                            <p className="text-gray-600">
                                {language === "uz" && "Yil"}
                                {language === "ru" && "Год"}
                                {language === "en" && "Year"}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                    {/* Tabs */}
                    <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-lg border border-blue-200">
                        <button
                            onClick={() => setActiveTab("photos")}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                                activeTab === "photos"
                                    ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-md"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <FaImages className="inline mr-2" />
                            {content.photos}
                        </button>
                        <button
                            onClick={() => setActiveTab("videos")}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                                activeTab === "videos"
                                    ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-md"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <FaVideo className="inline mr-2" />
                            {content.videos}
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-auto">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={content.searchGallery}
                            className="tfa-form-input w-full md:w-64 pl-10"
                        />
                    </div>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "photos" ? (
                        <motion.div
                            key="photos"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Photos Size Control */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {content.allPhotos} (
                                    {filteredPhotos?.length || 0})
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={photosSize}
                                        onChange={(e) =>
                                            setPhotosSize(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="tfa-form-input text-sm"
                                    >
                                        <option value={12}>12</option>
                                        <option value={24}>24</option>
                                        <option value={48}>48</option>
                                    </select>
                                    <span className="text-sm text-gray-500">
                                        {language === "uz" && "ta rasm"}
                                        {language === "ru" && "фото"}
                                        {language === "en" && "photos"}
                                    </span>
                                </div>
                            </div>

                            {photosLoading ? (
                                <Loading />
                            ) : !filteredPhotos?.length ? (
                                <div className="text-center py-12">
                                    <FaImages className="text-6xl text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600">
                                        {content.noPhotos}
                                    </h3>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {filteredPhotos.map((photo, index) => (
                                        <motion.div
                                            key={photo.uuid}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.02 }}
                                            onClick={() =>
                                                handleItemClick(
                                                    photo,
                                                    index,
                                                    "photo"
                                                )
                                            }
                                            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group border-2 border-transparent hover:border-primary-300 transition-all duration-300"
                                        >
                                            <img
                                                src={photo.photo}
                                                alt={getTranslation(
                                                    photo,
                                                    "description"
                                                )}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <p className="text-white text-sm font-medium line-clamp-2">
                                                        {getTranslation(
                                                            photo,
                                                            "description"
                                                        )}
                                                    </p>
                                                    <p className="text-white/80 text-xs">
                                                        {formatDate(
                                                            photo.created_at
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                                    <FaExpand className="text-sm" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="videos"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Videos Size Control */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {content.allVideos} (
                                    {filteredVideos?.length || 0})
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={videosSize}
                                        onChange={(e) =>
                                            setVideosSize(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="tfa-form-input text-sm"
                                    >
                                        <option value={6}>6</option>
                                        <option value={12}>12</option>
                                        <option value={24}>24</option>
                                    </select>
                                    <span className="text-sm text-gray-500">
                                        {language === "uz" && "ta video"}
                                        {language === "ru" && "видео"}
                                        {language === "en" && "videos"}
                                    </span>
                                </div>
                            </div>

                            {videosLoading ? (
                                <Loading />
                            ) : !filteredVideos?.length ? (
                                <div className="text-center py-12">
                                    <FaVideo className="text-6xl text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600">
                                        {content.noVideos}
                                    </h3>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredVideos.map((video, index) => (
                                        <motion.div
                                            key={video.uuid}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() =>
                                                handleItemClick(
                                                    video,
                                                    index,
                                                    "video"
                                                )
                                            }
                                            className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group border-2 border-transparent hover:border-primary-300 transition-all duration-300"
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
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                    <FaPlay className="text-white text-4xl" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                                                <FaPlay className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                <p className="text-white font-medium line-clamp-2">
                                                    {getTranslation(
                                                        video,
                                                        "description"
                                                    )}
                                                </p>
                                                <p className="text-white/80 text-sm">
                                                    {formatDate(
                                                        video.created_at
                                                    )}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
                            onClick={() => setSelectedItem(null)}
                        >
                            <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                >
                                    <FaTimes />
                                </button>

                                {/* Navigation */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrev();
                                    }}
                                    className="absolute left-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className="absolute right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                >
                                    <FaChevronRight />
                                </button>

                                {/* Content */}
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                    className="relative w-full h-full flex items-center justify-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {selectedItem.type === "photo" ? (
                                        <img
                                            src={selectedItem.photo}
                                            alt={getTranslation(
                                                selectedItem,
                                                "description"
                                            )}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full max-w-4xl aspect-video">
                                            {selectedItem.link ? (
                                                <iframe
                                                    src={selectedItem.link}
                                                    title={getTranslation(
                                                        selectedItem,
                                                        "description"
                                                    )}
                                                    className="w-full h-full rounded-lg"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                                                    <FaPlay className="text-white text-6xl" />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Info Panel */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold mb-2">
                                                    {getTranslation(
                                                        selectedItem,
                                                        "description"
                                                    )}
                                                </h3>
                                                <p className="text-white/80 text-sm mb-2">
                                                    {content.publishedOn}:{" "}
                                                    {formatDate(
                                                        selectedItem.created_at
                                                    )}
                                                </p>
                                                {selectedItem.match && (
                                                    <p className="text-white/80 text-sm">
                                                        {content.relatedMatch}:{" "}
                                                        {selectedItem.match}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex space-x-2 ml-4">
                                                {selectedItem.type ===
                                                    "photo" && (
                                                    <button
                                                        onClick={() =>
                                                            handleDownload(
                                                                selectedItem.photo,
                                                                `photo-${selectedItem.uuid}.jpg`
                                                            )
                                                        }
                                                        className="px-3 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center space-x-2"
                                                    >
                                                        <FaDownload />
                                                        <span className="hidden sm:inline">
                                                            {
                                                                content.downloadPhoto
                                                            }
                                                        </span>
                                                    </button>
                                                )}
                                                <button className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2">
                                                    <FaShare />
                                                    <span className="hidden sm:inline">
                                                        {content.sharePhoto}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Gallery;