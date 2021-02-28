// [REF] https://www.digitalocean.com/community/tutorials/creating-a-custom-usefetch-react-hook

import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return { response, error, isLoading };
};


export default useFetch;