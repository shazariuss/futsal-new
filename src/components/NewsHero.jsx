import { useQuery } from "@tanstack/react-query";
import { useLanguageStore } from "../store/languageStore";

const NewsHero = () => {
    const { getTranslation } = useLanguageStore();
    const { data: news } = useQuery({
        queryKey: ["newsHero"],
        queryFn: () => fetch("/api/news?limit=1").then((res) => res.json()),
    });
    const mainNews = news?.[0];

    if (!mainNews) return null;

    return (
        <div
            className="w-full h-[400px] relative flex items-center justify-center bg-gray-900/40 mb-8"
            style={{
                backgroundImage: `url(${mainNews.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "400px",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>
            <div className="relative z-10 max-w-4xl px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {getTranslation(mainNews, "title")}
                </h1>
                <p className="text-lg text-white/80">
                    {getTranslation(mainNews, "description")}
                </p>
            </div>
        </div>
    );
};

export default NewsHero;
