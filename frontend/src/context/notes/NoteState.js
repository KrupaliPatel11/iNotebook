import React, { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Add Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/user/addnotes`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        setNotes(notes.concat(json))
    }

    // Get All Note
    const getNotes = async () => {
        const response = await fetch(`${host}/user/allnotes`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        const json = await response.json()
        // console.log(json);
        setNotes(json.notes);
    }

    // Edit Note
    const editNote = async (id, title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/user/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        setNotes(json);
        let newNotes = await JSON.parse(JSON.stringify(notes))
        // Logic for delete note
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete Note
    const deleteNote = async (id) => {
        // Api call
        const response = await fetch(`${host}/user/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        const json = response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;