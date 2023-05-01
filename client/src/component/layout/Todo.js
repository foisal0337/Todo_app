import React, { useState } from "react";
import axios from "axios";
import "./Note.css";
import ReadNote from "./ReadNote";

const Todo = (props) => {
  const [note, setNote] = useState("");

  const handleChange = (e) => {
    setNote(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/v1/task", { note })
      .then(res => {
        console.log(res.data);
        setNote("");
        props.fetchNotes();
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
    <div className="create-note-container">
      <h2>Create Todo Task </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Note:</label>
          <textarea className="form-control" rows="5" value={note} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
    <ReadNote />
    </>
  );
}

export default Todo;
