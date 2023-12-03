import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { ViewMovies, AddMovies } from "./components";
import "./css/customStyle.css";
import store from "./redux/store";
import { Navbar } from "./components/utils/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<ViewMovies />} />
            <Route path="/addmovies" element={<AddMovies />} />{" "}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
