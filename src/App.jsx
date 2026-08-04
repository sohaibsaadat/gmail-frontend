import { Routes, Route } from "react-router-dom";
import Layout from "./components/Sidebar"; // or "./components/Layout" if you rename it

import Inbox from "./pages/Inbox";
import AllMail from "./pages/AllMail";
import Draft from "./pages/Draft";
import Sent from "./pages/Sent";
import Starred from "./pages/Starred";
import Trash from "./pages/Trash";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import Compose from "./components/Compose";

const App = () => {
  const [open,setOpen]=useState(false)
  return (
    <div className="relative">
<Layout  setOpen={setOpen} open={open}>
      <Routes>
        <Route path="/" element={<Inbox  open={open}/>} />
          <Route path="/all-mail" element={<AllMail open={open} />} />
          <Route path="/drafts" element={<Draft open={open} />} />
          <Route path="/sent" element={<Sent open={open} />} />
        <Route path="/starred" element={<Starred open={open} />} />
        <Route path="/trash" element={<Trash open={open} />} />
      </Routes>
     
    </Layout>


<button 
  className="fixed right-5 bottom-10 flex w-fit items-center cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105  hover:border-gray-500  rounded-full bg-blue-300 px-8 py-2 z-20"
>
 
    <Compose btnText="Compose">

    </Compose>
</button>  


  </div>
    
  );
};

export default App;