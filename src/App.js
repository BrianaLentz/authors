import { BrowserRouter, Switch, Route } from "react-router-dom"
import CreateAuthor from "./views/CreateAuthor";
import Dashboard from "./views/Dashboard";
import EditAuthor from "./views/EditAuthor";

function App() {
  return (
    <>
      <h1>Favorite Authors</h1>
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/new">
          <CreateAuthor />
        </Route>
        <Route exact path="/:id/edit">
          <EditAuthor />
        </Route>
      </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
