import React from "react";
import NoteList from "./NoteList";
import NoteHeader from "./NoteHeader";
import NoteInput from "./NoteInput";
import { getInitialData, showFormattedDate } from "../utils/index";
import NoteArchivedList from "./NoteArchivedList";

class NoteApp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {notes: getInitialData(), originalNotes: getInitialData(),}; 

            this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
            this.onDeleteHandler = this.onDeleteHandler.bind(this);
            this.onArchivedHandler = this.onArchivedHandler.bind(this);
            this.onAddSearchHandler = this.onAddSearchHandler.bind(this);
        } 
        
        onAddNoteHandler({title, body}) {
            const date = Date();
            this.setState((prevState) => {
                return {
                    notes: [
                        ...prevState.notes,
                        {
                            id: +new Date(),
                            title,
                            body,
                            archived: false,
                            createdAt: showFormattedDate(date),
                        }
                    ], 
                    originalNotes: [
                        ...prevState.originalNotes,
                        {
                            id: +new Date(),
                            title,
                            body,
                            archived: false,
                            createdAt: showFormattedDate(date),
                        }
                    ],
                }
            })

        }

        onDeleteHandler(id) {
            const notes = this.state.notes.filter((note => note.id !== id));
            const originalNotes = this.state.originalNotes.filter((note => note.id !== id));
            this.setState({notes, originalNotes});
        }

        onArchivedHandler(id) {
            const updatedNotes = [...this.state.notes];
            const updatedOriginalNotes = [...this.state.originalNotes];

            const index = updatedNotes.findIndex((note) => note.id === id);
            if (index !== -1) {
                updatedNotes[index] = {
                ...updatedNotes[index],
                archived: !updatedNotes[index].archived,
                };

                const originalIndex = updatedOriginalNotes.findIndex((note) => note.id === id);
                if (originalIndex !== -1) {
                updatedOriginalNotes[originalIndex] = {
                    ...updatedOriginalNotes[originalIndex],
                    archived: !updatedOriginalNotes[originalIndex].archived,
                };
                }

                this.setState({ notes: updatedNotes, originalNotes: updatedOriginalNotes });
            } 
        }

        onAddSearchHandler({title}) {
            const noteTitle = title.toLowerCase();

            if (!noteTitle) {
                this.setState({ notes: this.state.originalNotes });
                  return;
              }

            let filterNotes = this.state.originalNotes.filter((note) => note.title.toLowerCase().includes(noteTitle));
            this.setState({ notes: filterNotes });
        }

      
        render() {

            return (
                <>
                    <NoteHeader addSearch={this.onAddSearchHandler}  />
                    <div className="note-app__body">
                        <NoteInput addNote={this.onAddNoteHandler} />
                        <NoteList notes={this.state.notes} onDelete={this.onDeleteHandler}  onArchived={this.onArchivedHandler}/> 
                        <NoteArchivedList notes={this.state.notes} onDelete={this.onDeleteHandler} onArchived={this.onArchivedHandler}/>
                    </div>
                </>
            )
        }
}

export default NoteApp;