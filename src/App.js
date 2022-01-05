import { AuthProvider } from "./Contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoutes";
import { Alert } from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";
import { Drive } from "./Drive";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/drive" component={Drive} />
            <PrivateRoute exact path="/folder/:folderId" component={Drive} />
            <PrivateRoute path="/updateProfile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="*" component={Dashboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}
export default App;
