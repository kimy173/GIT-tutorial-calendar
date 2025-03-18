function Header({ language, onLanguageChange }) {
    try {
        return (
            <header className="bg-white shadow-sm" data-name="header">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900" data-name="app-title">
                            {TRANSLATIONS[language].calendar}
                        </h1>
                        <LanguageSelector 
                            language={language} 
                            onLanguageChange={onLanguageChange}
                        />
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
