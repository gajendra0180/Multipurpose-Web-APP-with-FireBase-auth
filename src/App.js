import { AuthProvider } from "./Contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard"
import Login from "./Login";
import Navbar from "./Navbar";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from './PrivateRoutes'
import { Alert } from 'react-bootstrap'
import UpdateProfile from "./UpdateProfile";
function App() {
  return (
    <>
      {/* <Navbar/> */}
      <Alert>Welcome To Tenki Corporations</Alert>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/updateProfile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgotPassword" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
