import React from "react";

class NoteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            maxLength: 50,
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }


    onTitleChangeEventHandler(event) {
        const value = event.target.value;
        this.setState({title: value,})
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {body: event.target.value,};
        })
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
        this.setState({title: "", body: ""})
    }

    render() {
        const remainingCharacters = this.state.maxLength - this.state.title.length;

        return (
            <div className="note-input" onSubmit={this.onSubmitEventHandler}>
                <h2>Buat Catatan</h2>
                <p className="note-input__title__char-limit">Sisa karakter: {remainingCharacters} </p>
                <form  className="note-input__body">
                    <input className="note-input__title" type="text" placeholder="Ini adalah judul..." value={this.state.title} onChange={this.onTitleChangeEventHandler} maxLength={this.state.maxLength} />
                    <textarea placeholder="Tuliskan catatanmu disini..." rows= "10" value={this.state.body} onChange={this.onBodyChangeEventHandler} ></textarea>
                    <button type="submit">Buat</button>
                </form>
            </div>
            
        )
    }
}

export default NoteInput;