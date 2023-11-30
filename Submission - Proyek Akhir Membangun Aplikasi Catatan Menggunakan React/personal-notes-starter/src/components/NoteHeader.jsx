import React from "react";
import SearchInput from "./SearchInput";

function NoteHeader({addSearch}) {
    return (
        <div className="note-app__header">
            <h1>Notes</h1>
            <SearchInput addSearch = {addSearch} />
        </div>
    )
}

export default NoteHeader;