import { useContext, useEffect } from "react";
import { getCategories } from "../../services/api";
import { GlobalStoreContext } from "../../services/context/GlobalStoreContext";

function useGetCategories() {
  const { categories, setCategories } = useContext(GlobalStoreContext);

  useEffect(() => {
    if(categories.length === 0){
      getCategories().then((data) => {
        setCategories(data);
      });
    }
  }, [categories.length, setCategories]);

  return [categories, setCategories];
}

export default useGetCategories;