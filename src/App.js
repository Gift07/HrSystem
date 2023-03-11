import React from "react";
import "./App.css";
// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// own imports
import Home from "./pages/user/home";
import Hoc from "./hoc";
import HrDashBoard from "./pages/hr/hrDashboard";
import Contracts from "./pages/hr/contracts";
import Permission from "./pages/hr/permission";
import PermissionRequest from "./pages/hr/permissionRequest";
import UserForm from "./pages/hr/staffForm";
import Digital from "./pages/department/digital";
import NotFound from "./pages/404";
import Marketing from "./pages/department/marketing";
import Music from "./pages/department/music";
import Production from "./pages/department/production";
import Programming from "./pages/department/programming";
import Assets from "./pages/department/assets";
import Login from "./pages/auth/login";
import Technical from "./pages/department/technical";
import WasafiFm from "./pages/department/wasafifm";
import WasafiTv from "./pages/department/wasafitv";
import Reporters from "./pages/department/reporters";
import Sales from "./pages/department/sales";
import News from "./pages/department/news";
import User from "./pages/user/user";
import PermissionRefused from "./pages/hr/permissionRefused";
import Setting from "./pages/user/setting";
import Driver from "./pages/hr/driver";
import SingleDriver from "./pages/user/driver";
import Documents from "./pages/hr/documents";

function App() {
  return (
    <div className="App poppins">
      <Router>
        <Hoc>
          <Routes>
            {/* auth */}
            <Route path="/auth/login" element={<Login />} />
            {/* /auth */}
            {/* hr routes */}
            <Route path="/hr" element={<HrDashBoard />} />
            <Route path="/hr/contract" element={<Contracts />} />
            <Route path="/hr/permission" exact element={<Permission />} />
            <Route
              path="/hr/permission/request"
              element={<PermissionRequest />}
            />
            <Route
              path="/hr/permission/refused"
              element={<PermissionRefused />}
            />
            {/* user */}
            <Route path="/hr/users/single-user:user_id/" element={<User />} />
            <Route path="/settings" exact element={<Setting />} />
            <Route path="/" element={<Home />} />
            {/* /user */}
            <Route path="/hr/new-user" exact element={<UserForm />} />
            <Route path="/hr/driver" exact element={<Driver />} />
            <Route path="/driver-report" exact element={<SingleDriver />} />
            <Route path="/hr/docs" exact element={<Documents />} />
            {/* /hr */}
            {/* departments router */}
            <Route path="/department/digital" exact element={<Digital />} />
            <Route path="/department/marketing" exact element={<Marketing />} />
            <Route path="/department/assets" exact element={<Assets />} />
            <Route path="/department/music" exact element={<Music />} />
            <Route
              path="/department/production"
              exact
              element={<Production />}
            />
            <Route path="/department/news" exact element={<News />} />
            <Route
              path="/department/Programming"
              exact
              element={<Programming />}
            />
            <Route path="/department/technical" exact element={<Technical />} />
            {/* department routes */}
            {/* category routes */}
            <Route path="/hr/wasafi-fm" exact element={<WasafiFm />} />
            <Route path="/hr/wasafi-tv" exact element={<WasafiTv />} />
            <Route path="/hr/reporters" exact element={<Reporters />} />
            <Route path="/hr/sales" exact element={<Sales />} />
            <Route path="*" exact element={<NotFound />} />
            {/* /category routes */}
          </Routes>
        </Hoc>
      </Router>
    </div>
  );
}

export default App;
