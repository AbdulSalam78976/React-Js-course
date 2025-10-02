import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputBox from './components/InputBox/Inputbox.jsx'
import useCurrencyInfo from './hooks/useCurrencyInfo.js'

function App() {
    
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("usd");
    const [toCurrency, setToCurrency] = useState("pkr");
    const [convertedAmount, setConvertedAmount] = useState(0);
    
    const currencyInfo = useCurrencyInfo(fromCurrency);
    
    // Handle loading and error states
    const currencyOptions = Object.keys(currencyInfo.data || {});
     
    const convertCurrency = () => {
        if (currencyInfo.data && currencyInfo.data[toCurrency] && amount > 0) {
            const result = amount * currencyInfo.data[toCurrency];
            setConvertedAmount(parseFloat(result.toFixed(2))); // Format to 2 decimal places
        }
    }

    // Auto-convert when amount or currencies change
    useEffect(() => {
        if (amount > 0 && currencyInfo.data && currencyInfo.data[toCurrency]) {
            convertCurrency();
        }
    }, [amount, fromCurrency, toCurrency, currencyInfo.data]);

    // Reset converted amount when amount is cleared
    useEffect(() => {
        if (amount === 0) {
            setConvertedAmount(0);
        }
    }, [amount]);
    
    const swapCurrencies = () => {
        // Only swap currencies, keep amounts as they are
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        // The useEffect above will handle the conversion automatically
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        convertCurrency();
    }

    // Format number with commas
    const formatNumber = (num) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 backdrop-blur-sm bg-white/30 shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full mb-1">
                            <InputBox
                                amount={amount}
                                onAmountChange={setAmount}
                                currencyOptions={currencyOptions}
                                selectedCurrency={fromCurrency}
                                onCurrencyChange={setFromCurrency}
                                amountDisabled={false}
                                currencyDisabled={currencyInfo.loading}
                                label="From"
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                onClick={swapCurrencies}
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 transition-colors shadow-md"
                                disabled={currencyInfo.loading}
                            >
                                ↕ swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                amount={convertedAmount}
                                onAmountChange={setConvertedAmount}
                                currencyOptions={currencyOptions}
                                selectedCurrency={toCurrency}
                                onCurrencyChange={setToCurrency}
                                amountDisabled={true}
                                currencyDisabled={currencyInfo.loading}
                                label="To"
                            />
                        </div>
                        
                        {/* Conversion Rate Display */}
                        {currencyInfo.data && currencyInfo.data[toCurrency] && amount > 0 && (
                            <div className="text-center text-sm text-gray-600 mb-4 p-2 bg-white/50 rounded">
                                1 {fromCurrency.toUpperCase()} = {currencyInfo.data[toCurrency].toFixed(4)} {toCurrency.toUpperCase()}
                            </div>
                        )}
                        
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed shadow-md"
                            disabled={currencyInfo.loading || amount <= 0}
                        >
                            {currencyInfo.loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Loading...
                                </div>
                            ) : (
                                `Convert ${fromCurrency.toUpperCase()} to ${toCurrency.toUpperCase()}`
                            )}
                        </button>
                        
                        {currencyInfo.error && (
                            <div className="mt-3 p-2 text-red-700 bg-red-100 rounded text-center border border-red-200">
                                ⚠️ {currencyInfo.error}
                            </div>
                        )}
                        
                        {/* Success Message */}
                        {convertedAmount > 0 && !currencyInfo.error && (
                            <div className="mt-3 p-3 bg-green-100 border border-green-200 rounded text-center">
                                <div className="text-green-800 font-semibold">
                                    {formatNumber(amount)} {fromCurrency.toUpperCase()} = 
                                </div>
                                <div className="text-green-900 text-xl font-bold">
                                    {formatNumber(convertedAmount)} {toCurrency.toUpperCase()}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
                
                {/* Footer */}
                <div className="text-center mt-4 text-white/80 text-sm">
                    Real-time Currency Converter
                </div>
            </div>
        </div>
    );
}

export default App