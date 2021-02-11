import React from "react";
import Joi from "joi-browser";
import Form from "../components/forms/Form";
import { saveNote, getNote } from "../services/note";

class NoteForm extends Form {
  state = {
    data: { title: "", content: "" },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(2).label("Title"),
    content: Joi.string().required().label("Content"),
  };

  async populateNotes() {
    try {
      const noteId = this.props.match.params.id;
      if (noteId === "new") return;
      const { data: note } = await getNote(noteId);
      this.setState({ data: this.mapToViewModel(note) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateNotes();
  }

  mapToViewModel(note) {
    return {
      _id: note._id,
      title: note.title,
      content: note.content,
    };
  }

  doSubmit = async () => {
    await saveNote(this.state.data);
    this.props.history.push("/notes");
  };

  render() {
    return (
      <div className="noteForm">
        <h1>Note Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("content", "Content")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NoteForm;
