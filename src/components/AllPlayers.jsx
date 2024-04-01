import { useGetPlayersQuery } from "../API/index";
import { useDeletePlayerMutation } from "../API/index";
import "../../src/index.css";
import store from "../APP/store";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Players = () => {
  const { data, error, isLoading } = useGetPlayersQuery();
  const [deletePlayer] = useDeletePlayerMutation();
  const [players, setPlayers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // handle details
  const handleDetails = (playerId) => {
    navigate(`/player/${playerId}`);
  };

  //handle delete
  const handleDelete = async (playerId) => {
    try {
      await deletePlayer(playerId);
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  //displayin players
  useEffect(() => {
    if (data && data.data) {
      setPlayers(data.data.players);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error fetching players</p>;
  }
  console.log(players);

  //search bar funtionality
  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    const updatePlayers = data.data.players.filter((player) => {
      return player.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setPlayers(updatePlayers);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <form
          className="d-flex p-2 justify-content-center align-items-center"
          role="search"
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleChange}
            value={searchInput}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="row">
        {players.map((player) => (
          <div key={player.id} className="col-lg-4 col-md-6 col-sm-6 mb-4 sm-4">
            <div className="card h-100">
              <img
                src={player.imageUrl}
                className="card-img-top object-fit-cover border rounded h-50"
                alt={player.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{player.name}</h5>
                <p className="card-text">Breed: {player.breed}</p>
                <div className="d-flex flex-row mt-auto gap-2">
                  <button
                    onClick={() => handleDetails(player.id)}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => handleDelete(player.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
