import { Routes, Route } from "react-router-dom";
import Layout from "./components/Sidebar"; // or "./components/Layout" if you rename it

import Inbox from "./pages/Inbox";
import AllMail from "./pages/AllMail";
import Draft from "./pages/Draft";
import Sent from "./pages/Sent";
import Starred from "./pages/Starred";
import Trash from "./pages/Trash";
import { useState } from "react";

const App = () => {
  const [open,setOpen]=useState(false)
  return (
    <Layout setOpen={setOpen} open={open}>
      <Routes>
        <Route path="/" element={<Inbox  open={open}/>} />
          <Route path="/all-mail" element={<AllMail open={open} />} />
          <Route path="/drafts" element={<Draft open={open} />} />
          <Route path="/sent" element={<Sent open={open} />} />
        <Route path="/starred" element={<Starred open={open} />} />
        <Route path="/trash" element={<Trash open={open} />} />
      </Routes>
    </Layout>
  );
};

export default App;