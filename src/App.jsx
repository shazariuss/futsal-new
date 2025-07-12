import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import Leagues from "./pages/Leagues";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import PlayerDetails from "./pages/PlayerDetails";
import Matches from "./pages/Matches-new";
import MatchDetails from "./pages/MatchDetails";
import News from "./pages/News";
import Gallery from "./pages/Gallery";

function App() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tournaments" element={<Tournaments />} />
                    <Route path="/leagues/:id" element={<Leagues />} />
                    <Route path="/teams/:id" element={<Teams />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/players/:uuid" element={<PlayerDetails />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/matches/:uuid" element={<MatchDetails />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/gallery" element={<Gallery />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
