import { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../../services/context/GlobalStoreContext";
import { getLanguages } from "../../services/api";

function useGetLanguages() {
    const { languages, setLanguages } = useContext(GlobalStoreContext);

    useEffect(() => {
        if (languages.length === 0) {
            getLanguages().then((data) => {
                setLanguages(data);
            });
        }
    }, [languages.length, setLanguages]);

    return [languages, setLanguages];
}

export default useGetLanguages;