import { useQuery } from "@tanstack/react-query";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { newsApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";

const Footer = () => {
    const { language } = useLanguageStore();

    const { data: socials } = useQuery({
        queryKey: ["socials"],
        queryFn: () => newsApi.getSocials().then((res) => res.data),
    });

    const { data: partners } = useQuery({
        queryKey: ["partners"],
        queryFn: () => newsApi.getPartners().then((res) => res.data),
    });

    const footerContent = {
        uz: {
            about: "Haqida",
            contact: "Aloqa",
            partners: "Hamkorlar",
            social: "Ijtimoiy tarmoqlar",
            rights: "Barcha huquqlar himoyalangan",
            made: "Sevgi bilan yaratilgan",
        },
        ru: {
            about: "О нас",
            contact: "Контакты",
            partners: "Партнеры",
            social: "Социальные сети",
            rights: "Все права защищены",
            made: "Сделано с любовью",
        },
        en: {
            about: "About",
            contact: "Contact",
            partners: "Partners",
            social: "Social Networks",
            rights: "All rights reserved",
            made: "Made with love",
        },
    };

    const content = footerContent[language];

    return (
        <footer className="bg-purple-900 text-white border-t border-purple-800">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/4/47/Uzbekistan_Football_Federation.svg"
                                    alt="UZLLF Logo"
                                    className="w-8 h-8"
                                />
                            </div>
                            <h3 className="text-lg font-bold">UZLLF</h3>
                        </div>
                        <p className="text-purple-200 mb-4 text-sm leading-relaxed">
                            {language === "uz" &&
                                "O'zbekiston Liga Liga Futbol - professional futbol ligi. Eng yaxshi jamoalar va o'yinchilar."}
                            {language === "ru" &&
                                "Узбекская Лига Лига Футбол - профессиональная футбольная лига. Лучшие команды и игроки."}
                            {language === "en" &&
                                "Uzbekistan League League Football - professional football league. Best teams and players."}
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {content.contact}
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-purple-300" />
                                <span className="text-purple-200 text-sm">
                                    +998 95 258-95-95
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-purple-300" />
                                <span className="text-purple-200 text-sm">
                                    info@uzllf.uz
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-purple-300" />
                                <span className="text-purple-200 text-sm">
                                    Toshkent, O'zbekiston
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social Networks */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {content.social}
                        </h3>
                        <div className="space-y-3">
                            {socials?.map((social) => (
                                <a
                                    key={social.uuid}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 text-purple-200 hover:text-white transition-colors text-sm"
                                >
                                    <img
                                        src={social.icon}
                                        alt={social.name}
                                        className="w-4 h-4"
                                    />
                                    <span>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Partners */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {content.partners}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {partners?.slice(0, 4).map((partner) => (
                                <div
                                    key={partner.uuid}
                                    className="bg-white bg-opacity-10 rounded p-2"
                                >
                                    <img
                                        src={partner.image}
                                        alt={partner.name}
                                        className="w-full h-8 object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
