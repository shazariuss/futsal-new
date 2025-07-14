import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaBars,
    FaTimes,
    FaGlobe,
    FaInstagram,
    FaYoutube,
    FaTelegram,
} from "react-icons/fa";
import { useLanguageStore } from "../store/languageStore";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const location = useLocation();
    const { language, setLanguage } = useLanguageStore();

    const languages = [
        { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
        { code: "ru", name: "Русский", flag: "🇷🇺" },
        { code: "en", name: "English", flag: "🇺🇸" },
    ];

    const navItems = [
        { path: "/", name: { uz: "BOSH", ru: "ГЛАВНАЯ", en: "HOME" } },
        {
            path: "/tournaments",
            name: { uz: "TURNIRLAR", ru: "ТУРНИРЫ", en: "TOURNAMENTS" },
        },
        {
            path: "/teams",
            name: { uz: "JAMOALAR", ru: "КОМАНДЫ", en: "TEAMS" },
        },
        {
            path: "/matches",
            name: { uz: "O'YINLAR", ru: "МАТЧИ", en: "MATCHES" },
        },
        {
            path: "/news",
            name: { uz: "YANGILIKLAR", ru: "НОВОСТИ", en: "NEWS" },
        },
        { path: "/gallery", name: { uz: "MEDIA", ru: "МЕДИА", en: "MEDIA" } },
        {
            path: "/players",
            name: { uz: "O'YINCHILAR", ru: "ИГРОКИ", en: "PLAYERS" },
        },
    ];

    const handleLanguageChange = (langCode) => {
        setLanguage(langCode);
        setIsLangOpen(false);
    };

    return (
        <header className="tfa-header">
            {/* Top Header */}
            <div className="border-b border-purple-700">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo and Title */}
                        <Link to="/">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center">
                                    <img
                                        src="/logo.png"
                                        alt="UZLLF Logo"
                                        className="w-18"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">
                                        LLF Uzbekistan
                                    </h1>
                                    <p className="text-sm text-purple-200">
                                        UZLLF
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Social Links and Language */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <a
                                    href="#"
                                    className="text-white hover:text-purple-200 transition-colors"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-white hover:text-purple-200 transition-colors"
                                >
                                    <FaYoutube className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-white hover:text-purple-200 transition-colors"
                                >
                                    <FaTelegram className="w-5 h-5" />
                                </a>
                            </div>

                            {/* Language Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="flex items-center space-x-2 px-3 py-1 bg-purple-700 hover:bg-purple-600 rounded text-white text-sm transition-colors"
                                >
                                    <FaGlobe className="w-4 h-4" />
                                    <span>
                                        {
                                            languages.find(
                                                (lang) => lang.code === language
                                            )?.flag
                                        }
                                    </span>
                                </button>

                                {isLangOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg border z-50">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() =>
                                                    handleLanguageChange(
                                                        lang.code
                                                    )
                                                }
                                                className={`w-full px-3 py-2 text-left hover:bg-gray-100 text-sm ${
                                                    language === lang.code
                                                        ? "bg-gray-100 font-medium"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                <span className="mr-2">
                                                    {lang.flag}
                                                </span>
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="tfa-nav">
                <div className="max-w-7xl mx-auto">
                    <div className="flex">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`tfa-nav-item ${
                                        isActive ? "active" : ""
                                    }`}
                                >
                                    <span className="text-sm font-medium">
                                        {item.name[language]}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
