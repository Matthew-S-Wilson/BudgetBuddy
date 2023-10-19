import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { HomePage } from "./calculator/Homepage.js";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>

      <Route path="/">
        <Route
          index
          element={
            
            <AuthorizedRoute loggedInUser={loggedInUser}>
              
            </AuthorizedRoute>
          }
        />
        <Route
          path="homepage"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <HomePage />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>

      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
