import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css";
import AddTransaction from "./pages/AddTransaction";
import GroupsPage from "./pages/GroupsPage";
import ViewGroup from "./pages/ViewGroup";

const SideBar = (props) => {
  const history = useHistory();
  return (
    <div>
      <button onClick={(e) => history.push("/")}>Home Page</button>
      <button onClick={(e) => history.push("/addtransaction")}>
        Add Transaction
      </button>
      <button onClick={(e) => history.push("/groups")}>View Groups</button>
    </div>
  );
};

function App(props) {
  return (
    <div className="App">
      <div>Expense Management App</div>
      <Router>
        <SideBar />
        <Switch>
          <Route path="/" exact children={<MainPage />} />
          <Route path="/addtransaction" exact children={<AddTransaction />} />
          <Route path="/groups" exact children={<GroupsPage />} />
          <Route path="/group/:id" exact children={<ViewGroup />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
