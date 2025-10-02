import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Free tier - no API key required for basic usage
                let url = `https://api.exchangerate-api.com/v4/latest/${currency.toUpperCase()}`;
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                console.log("ExchangeRate-API Response:", result);
                
                setData(result.rates || {});
                
            } catch (err) {
                console.error("Error fetching currency data:", err);
                setError(err.message);
                setData({});
            } finally {
                setLoading(false);
            }
        };

        if (currency) {
            fetchCurrencyData();
        }
        
    }, [currency]);

    return { data, loading, error };
}

export default useCurrencyInfo;