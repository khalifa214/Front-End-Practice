import React from "react";

function NotelistEmpty ({condition}) {
    if (condition) {
        return (<h3 className="notes-list__empty-message">Tidak ada catatan</h3> );
    } else {
        return (null);
    }
}

export default NotelistEmpty;