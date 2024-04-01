import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { useNavigate } from "react-router-dom";

const API =
  "https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/players";

//const navigate = useNavigate();

const NewPlayerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      navigate("/players");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="player-form">
      <h2>New Player Form</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group className=" mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Puppy Name"
          />
        </Form.Group>
        <Form.Group className=" mb-3">
          <Form.Label>Breed</Form.Label>
          <Form.Control
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Enter Puppy Breed"
          />
        </Form.Group>
        <Form.Group className=" mb-3">
          <Form.Label>ImageUrl</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter Image URL"
          />
        </Form.Group>

        <button type="submit" className="btn btn-secondary ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPlayerForm;
