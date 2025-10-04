// import { grayscale } from "pdf-lib";
// import { Link } from "react-router-dom";


// function Home() {
//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h1 className="home-title">📄 Welcome D.V Shinde to  Report Generator</h1>
//             <p>Click below to generate a Valuation PDF report.</p>
//             <Link to="/Agriculture">
//                 <button className="myhome" style={{ padding: "10px 20px", fontSize: "16px", }}>
//                     Agri Valuation
//                 </button>
//             </Link>
//         </div>
//     );
// }

// export default Home;


import { Link } from "react-router-dom";
import "./Home.css"; // ✅ Import CSS here

function Home() {
    return (
        <div className="home-container">
            <h1 color:red>D.V Shinde</h1>
            <h1 className="home-title">🌾 Agriculture - Plot - Rcc Valuation Report Generator</h1>
            <p className="home-text">
                Fill out the form and generate your report in PDF format.
            </p>

            <Link to="/agriculture">
                <button className="home-button">Agriculture</button>
            </Link>
        </div >
    );
}

export default Home;
