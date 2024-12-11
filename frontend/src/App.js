import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Products from "./Contacts.js";
import AddContact from "./AddContacts.js";
import Sidebar from "./Sidebar.js";
import DeleteContact from "./DeleteContacts.js";
import SearchContact from "./SearchContacts.js";

import NewMessage from "./NewMessages.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Checkout from "./Checkout.js";

function App() {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSidebarOpen,setSidebar] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const toggleSidebar = () => {
    setSidebar(!isSidebarOpen);
  }
  return (
    <div className="App" >
      {/* {userRole ? ( */}
        <Router>
          <div className="d-flex">
            <button style={{height:"20px"}} onClick={toggleSidebar}>=</button>
             <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setSelectedType={setSelectedType}/>
            <img src="http://localhost:8081/images/setupVault.webp"
            style={{
              width: "50px",
              height: "50px",
              marginRight: "15px",
              objectFit: "cover",
            }}/>
            
            <div className="flex-grow-1 p-3">
            
              <h1 className="text-center">SetupVault</h1>
              
              <Routes>
                <Route
                  path="/"
                  element={<div style={{
                    display: "flex",
                    justifyContent: "center", 
                    alignItems: "center",}}>
                    <img src="http://localhost:8081/images/setupVault.webp"
                    style={{
                      height:"400px",
                      width: "400px",
          
                    }}/>
                    </div>
                  }
                />
                <Route
                  path="/cart"
                  element={<Checkout products={products} setProducts={setProducts} />}
                />
                <Route
                  path="/product"
                  element={
                    <Products products={products} setProducts={setProducts} />
                  }
                />
                <Route path="/add-product" element={<AddContact products={products} setProducts={setProducts}/> }/>
                <Route path="/deletecontact" element={<DeleteContact products={products} setProducts={setProducts}/>}/>

              </Routes>
            </div>
          </div>
        </Router>
      {/* ) : (
        <Authentication
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUserRole={setUserRole}
        />
      )} */}
    </div>
  );
}

export default App;
