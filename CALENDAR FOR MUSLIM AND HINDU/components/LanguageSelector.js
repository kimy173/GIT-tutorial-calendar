function LanguageSelector({ language, onLanguageChange }) {
    try {
        return (
            <div className="relative" data-name="language-selector">
                <select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    data-name="language-select"
                >
                    {Object.entries(LANGUAGES).map(([code, name]) => (
                        <option key={code} value={code} data-name={`language-option-${code}`}>
                            {name}
                        </option>
                    ))}
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400"></i>
            </div>
        );
    } catch (error) {
        console.error('LanguageSelector component error:', error);
        reportError(error);
        return null;
    }
}
