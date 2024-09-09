import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProfileWelcome } from "./pages/ProfileWelcome";
import { AllFlatsPage } from "./pages/AllFlatsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AllUsersPage } from "./pages/AllUsersPage";
import { MessagesPage } from "./pages/MessagesPage";
import { MyFlatsPage } from "./pages/MyFlatsPage";
import { NewFlatPage } from "./pages/NewFlatPage";
import { EditFlatPage } from "./pages/EditFlatPage";
import FavoritesPage from "./pages/FavoritesPage";
import FlatViewPage from "./pages/FlatViewPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile-welcome" element={<ProfileWelcome />} />
        <Route path="/all-flats" element={<AllFlatsPage />} />
        <Route path="/profile/:userID?" element={<ProfilePage />} />
        <Route path="/all-users" element={<AllUsersPage />} />
        <Route path="/messages/:userId?" element={<MessagesPage />} />
        <Route path="/my-flats" element={<MyFlatsPage />} />
        <Route path="/new-flats" element={<NewFlatPage />} />
        <Route path="/edit-flat/:id" element={<EditFlatPage />} />
        <Route path="/favorites-flats" element={<FavoritesPage />} />
        <Route path="/flat-view/:id" element={<FlatViewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
