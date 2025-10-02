import { useId } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    onCurrencyChange,
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
    
}) {
    
    const amountInputId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex border border-gray-200 ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-gray-600 mb-2 inline-block font-medium">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 text-lg font-semibold"
                    type="number"
                    placeholder="0"
                    disabled={amountDisabled}
                    value={amount || ""}
                    onChange={(e) => onAmountChange?.(Number(e.target.value) || 0)}
                    min="0"
                    step="any"
                />
            </div>
            <div className="w-1/2 flex flex-col items-end">
                <p className="text-gray-600 mb-2 font-medium">Currency</p>
                <select
                  
                    className="rounded-lg px-3 py-2 bg-gray-50 cursor-pointer outline-none border border-gray-300 font-medium"
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange?.(e.target.value)}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;