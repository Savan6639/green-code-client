import { Route, Routes } from "react-router-dom";

import { AdminRoute } from "./services/routes";

import {HomePage} from "./pages/Home";
import { QuestionPage } from "./pages/Question";
import {RegisterUser,LogInUser} from "./pages/Auth";
import {Dashboard} from "./pages/Admin/Dashboard";
import {Question,AddEditQuestion} from "./pages/Admin/Question";

import {HomeLayout} from "./components/Home";
import { AdminLayout } from "./components/Admin";
import { Category } from "./pages/Admin/Category";
import { Language } from "./pages/Admin/Language";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="/question/:id" element={<QuestionPage />} />
      </Route>
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login/:prevstate?" element={<LogInUser />} />
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="" element={<Dashboard />} />
        <Route path="question" element={<Question />} />
        <Route path="category" element={<Category />} />
        <Route path="language" element={<Language />} />
        <Route path="question/add" element={<AddEditQuestion />} />
        <Route path="question/:id/edit" element={<AddEditQuestion />} />

      </Route>
      <Route path="/test" element={<></>} />
    </Routes>
  );
}

export default App;
