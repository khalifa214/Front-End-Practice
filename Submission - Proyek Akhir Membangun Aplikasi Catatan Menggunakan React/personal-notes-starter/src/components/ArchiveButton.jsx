import React from "react";

function ArchiveButton ({id, onArchived, text}) {
   return (
    <button className="note-item__archive-button" onClick={() => onArchived(id)}>{text}</button>
   ); 
};

export default ArchiveButton;