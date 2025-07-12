import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FootballBackground from "./FootballBackground";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <FootballBackground />
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
