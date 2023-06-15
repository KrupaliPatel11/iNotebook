import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/notesContext'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState([{ title: "", description: "", tag: "default" }])

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Your Note Added Successfully", "success")
    }

    const onChange = (e) => {
        setNote({
            ...note, [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add A Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input onChange={onChange} type="text" name='title' className="form-control" id="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input onChange={onChange} type="text" className="form-control" id="description" name='description' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input onChange={onChange} type="text" className="form-control" id="tag" name='tag' />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
