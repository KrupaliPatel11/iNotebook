import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/notesContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();

    // useEffect(() => {
    //     if((`${(!localStorage.getItem("token"))}`)) {
    //       navigate("/login");
    //     } else if((`${(localStorage.getItem("token"))}`)) {
    //         getNotes()
    //     }
    //   }, []);

    useEffect(() => {
        if(localStorage.getItem("token") == false) {
            console.log(localStorage.getItem("token"));
          navigate("/login");
        } else if((`${(localStorage.getItem("token"))}`)) {
            getNotes()
        }
      }, []);


    // let token = `Bearer ${(localStorage.getItem("token"))}`
    // console.log(token)
    // useEffect(() => {
    //     if(token === false) {
    //       navigate("/login");
    //     } else  {
    //         getNotes()
    //     }
    //   }, [navigate]);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState([{ id: "", etitle: "", edescription: "", etag: "default" }])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Your Note Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({
            ...note, [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">title</label>
                                        <input onChange={onChange} type="etext" name='etitle' value={note.etitle} className="form-control" id="etitle" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label" >description</label>
                                        <input onChange={onChange} type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label htmlFor="etag" className="form-label" value={note.etag}>tag</label>
                                        <input onChange={onChange} type="text" value={note.edescription} className="form-control" id="etag" name='etag' />
                                    </div> */}
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2 className='mx-3'>Your Notes</h2>
                {
                    (notes && notes.length > 0) ?
                        notes.map((note) => {
                            return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                        }) : <div className='container mx-3'>No Notes To Display</div>
                }
            </div>
        </>
    )
}

export default Notes;
