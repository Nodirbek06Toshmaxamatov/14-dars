import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
        <BrowserRouter>
                <App />
        </BrowserRouter>

)