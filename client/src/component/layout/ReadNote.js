import React, { useState, useEffect } from "react";
import axios from "axios";

const ReadNote = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/v1/task").then((response) => {
      setNotes(response.data);
    });
  }, []);

  console.log(notes);
  return (
    <div>
      <h2 className=" text-center text-2xl mt-8"  >Fatching all the task Note</h2>
      {notes.map((note) => (
        <div key={note.id}>
            <ul>

                <li>
                    <p>{note.note}</p>
                </li>
            </ul>
        </div>
      ))}
    </div>
  );
};

export default ReadNote;