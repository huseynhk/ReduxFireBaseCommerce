import { createContext, useState, useEffect } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FireBaseConfig";

const ContextData = createContext();

const ContextDataProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#333";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    stock: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // ADD
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null ||
      products.stock == null
    ) {
      return toast.error("all fields are required");
    }
    setLoading(true);

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Add product successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 750);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // GET
  const [product, setProduct] = useState([]);
  const getProductData = async () => {
    setLoading(true);
    try {
      const myQuery = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(myQuery, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        console.log(productArray);
        setProduct(productArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // UPDATE

  const edithandle = (item) => {
    setProducts(item);
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 750);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // DELETE
  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", productId.id));
      toast.success("Product Deleted successfully");
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //USER
  const [user, setUser] = useState([]);
  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const userArray = [];
      result.forEach((user) => {
        userArray.push(user.data());
        setLoading(false);
      });
      setUser(userArray);
      console.log(userArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //FILTER
  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  //SORT
  const [sortTitle, setSortTitle] = useState("");

  useEffect(() => {
    getProductData();
    getUserData();
  }, []);

  const contextValue = {
    mode,
    toggleMode,
    loading,
    setLoading,
    products,
    setProducts,
    addProduct,
    product,
    edithandle,
    updateProduct,
    deleteProduct,
    user,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    sortTitle,
    setSortTitle,
  };

  return (
    <ContextData.Provider value={contextValue}>{children}</ContextData.Provider>
  );
};

export { ContextData, ContextDataProvider };
