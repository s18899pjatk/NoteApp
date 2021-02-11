import "./App.css";

import Notes from "./views/Notes";
import NotFound from "./views/Not-found";
import NoteForm from "./views/NoteForm";
import NoteDetails from "./views/NoteDetails";

import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route
          path="/notes/:id"
          render={(props) => {
            return <NoteForm {...props} />;
          }}
        />
        <Route
          path="/note/:id"
          render={(props) => {
            return <NoteDetails {...props} />;
          }}
        />
        <Route path="/notes" component={Notes} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/notes" />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
