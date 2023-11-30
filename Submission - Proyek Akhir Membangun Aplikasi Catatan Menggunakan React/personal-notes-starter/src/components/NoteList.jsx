import React from "react";
import NotelistEmpty from "./NoteLIstEmpty";
import NoteItem from "./NoteItem";

function NoteList ({notes, onDelete, onArchived}) {
    const isEmpty = notes.some((note) => note.archived === false);

    return (
        <>
        <h2>Catatan Aktif</h2>
        <NotelistEmpty condition={!isEmpty} />
        <div className="notes-list">
            {
            notes.map((note) => { 
                
                if (note.archived === false) {
                    return (
                        <NoteItem key={note.id} id={note.id} onArchived={onArchived} onDelete={onDelete} text="Arsipkan" {...note} />
                    ) 
                }
                return null;
            })
            }
        </div>
        </>
    )
};

export default NoteList;
