import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data)
            } catch(err) {
                setError(err);
            }
            setLoading(false);
        }

        fetchData();
    }, [url]); // in Hotels page, when we change the min/max price in the searchbox, the url is affected and the request is made rightaway!

    const reFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setData(response.data)
        } catch(err) {
            setError(err);
        }
        setLoading(false);
    }

    return {data, loading, error, reFetch}
}

export default useFetch;