import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import AllProducts from "./pages/allProducts/AllProducts";
import NoPage from "./pages/noPage/NoPage";
import { ContextDataProvider } from "./context/data/ContextData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// import { useState, useEffect } from "react";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { storage, auth, db } from "./firebase/FireBaseConfig";
// import { onValue, ref as Refff,set,push } from "firebase/database";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";

function App() {
  //   const [imgUrl, setImgUrl] = useState(null);
  //   const [progresspercent, setProgresspercent] = useState(0);
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [projects, setProjects] = useState([]);

  //   useEffect(() => {
  //     const query = Refff(db, "/");
  //     return onValue(query, (snapshot) => {
  //       const data = snapshot.val();
  //       console.log(data.users);
  //       if (snapshot.exists()) {
  //         setProjects([...data.users])
  //       }
  //     });
  //   }, []);
  //   const handleImage = (e) => {
  //     const file = e.target.files[0];
  //     const storageRef = ref(storage, `images/${file.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setProgresspercent(progress);
  //         console.log(progress);
  //       },
  //       (error) => {
  //         alert(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setImgUrl(downloadURL);
  //           console.log(downloadURL);
  //         });
  //       }
  //     );
  //   };

  // const handleNewPush = () => {
  //    const newObj = {
  //      id: projects.length + 1,
  //      name: "Fuad"
  //    }
  //    const dbRef = Refff(db, 'users');
  //    const newDataRef = push(dbRef);
  //    set(newDataRef, newObj)
  //    .then(() => {
  //      setMessage('Data added successfully!');
  //    })
  //    .catch((error) => {
  //      setMessage(`Error adding data: ${error.message}`);
  //    });
  // }
  //   const onSubmit = async (e) => {
  //     e.preventDefault();

  //     await signInWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         const user = userCredential;
  //         console.log(user);
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         console.log(errorCode, errorMessage);
  //       });
  //   };

  //   const handleGoogleSignIn = async () => {
  //     const provider = new GoogleAuthProvider();

  //     try {
  //       const result = await signInWithPopup(auth, provider);
  //       const user = result.user;
  //       console.log("Successfully signed in with Google:", user);
  //     } catch (error) {
  //       console.error("Google Sign-In Error:", error);
  //     }
  //   };

  return (
    <>
      <ContextDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allproducts" element={<AllProducts />} />

            <Route
              path="/order"
              element={
                <RouteForUser>
                  <Order />
                </RouteForUser>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/dashboard"
              element={
                <RouteForAdmin>
                  <Dashboard />
                </RouteForAdmin>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route
              path="/addproduct"
              element={
                <RouteForAdmin>
                  <AddProduct />
                </RouteForAdmin>
              }
            />
            <Route
              path="/updateproduct"
              element={
                <RouteForAdmin>
                  <UpdateProduct />
                </RouteForAdmin>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ContextDataProvider>

      {/* <div className="App">
        <input type="file" onChange={handleImage} />
        <button type="submit">Upload</button>
      </div>

      <main>
        <section>
          <div>
            <div>
              <h1> FocusApp </h1>
              <form>
                <div>
                  <label htmlFor="email-address">Email address</label>
                  <input
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    label="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                </div>

                <button type="submit" onClick={onSubmit}>
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <button onClick={handleGoogleSignIn}>Google sign in</button>
      <button onClick={handleNewPush}>Push new data</button>
      {JSON.stringify(projects, null, 2)} */}
    </>
  );
}

export default App;

export const RouteForUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export const RouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === "khuseyn693@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
