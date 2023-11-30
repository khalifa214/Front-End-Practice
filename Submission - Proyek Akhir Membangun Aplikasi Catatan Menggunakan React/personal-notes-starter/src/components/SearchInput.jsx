import React from "react";


class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "",}; 

        this.onAddValue = this.onAddValue.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    onAddValue(event) {
        const newTitle = event.target.value;
        this.setState({ title: newTitle });
        return newTitle;
    }

    onSearchHandler(event) {
        const newTitle = this.onAddValue(event);
        this.props.addSearch({ title: newTitle });
    }


    render() {
        return (
            <form>
                <input type="text" placeholder="Cari catatan..." value={this.state.title} onChange={this.onSearchHandler} />
            </form> 
            
           );
    }
}

export default SearchInput