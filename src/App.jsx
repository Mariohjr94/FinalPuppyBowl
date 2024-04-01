import "./index.css";
import Header from "./components/NavBar";
import AllPlayers from "./components/AllPlayers";
import NewPlayerForm from "./components/NewPlayerForm";
import { Routes, Route } from "react-router-dom";
import SinglePlayer from "./components/SinglePlayer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={AllPlayers} />
        <Route path="/players" Component={AllPlayers} />
        <Route path="/add-players" Component={NewPlayerForm} />
        <Route path="/player/:id" Component={SinglePlayer} />
      </Routes>
    </>
  );
}

export default App;
