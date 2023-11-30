import React from "react";
import NoteItem from "./NoteItem";
import NotelistEmpty from "./NoteLIstEmpty";


function NoteArchivedList ({notes, onDelete, onArchived}) {
    const isEmpty = notes.some((note) => note.archived === true);

    return (
        <>
        <h2>Arsip</h2>
        <NotelistEmpty condition={!isEmpty} />
        <div className="notes-list">
            {
            notes.map((note) => { 
                if (note.archived === true) {
                    return (
                        <NoteItem key={note.id} id={note.id} onArchived={onArchived} onDelete={onDelete} text="Pindahkan" {...note} />
                    )
                }
                return null;
            })
            }
        </div>
        </>
    )
};

export default NoteArchivedList;
