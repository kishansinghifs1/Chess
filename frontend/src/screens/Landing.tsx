import { useNavigate } from "react-router-dom";
import './Landing.css'
export const Landing = () => {
    const navigate = useNavigate();
    return <div>
        <div className="mt-2">
            < div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <div>
                  <img src={"/chessboard.jpeg"} />
                 </div>
                  <div>
                    <h1 className="text-4xl font-bold">Let's Play Online Chess </h1>
                     <div className="mt-4">
                    <button onClick={() => {
                        navigate("/game");
                     }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> let's Play</button>
                    </div>
                 </div>
        </div>
        </div>
    </div>
}