import { Link } from "react-router-dom";
import "./Home.css"; // ✅ Import CSS here

function Home() {
    return (
        <div className="home-container">
            <h1>D.V Shinde</h1>
            <h1 className="home-title">🌾 Agriculture - Plot - Rcc Valuation Report Generator</h1>
            <p className="home-text">
                Fill out the form and generate your report in PDF format.
            </p>

            <Link to="/agriculture">
                <button className="home-button">Agriculture</button>
            </Link>

                    <Link to="/rcc">
                <button className="home-button">Rcc</button>
            </Link>
        </div >
    );
}

export default Home;
