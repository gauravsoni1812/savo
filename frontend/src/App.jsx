import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./components/List";
import Post from "./components/Post";


function App() {
  return (
    <>
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </BrowserRouter>
    
    </>
  );
}

export default App;