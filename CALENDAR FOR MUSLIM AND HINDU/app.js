function App() {
    try {
        const [language, setLanguage] = React.useState('en');
        const [calendarType, setCalendarType] = React.useState('hindu');

        return (
            <div className="app-container" data-name="app">
                <Header 
                    language={language}
                    onLanguageChange={setLanguage}
                />
                
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <CalendarType 
                        type={calendarType}
                        onTypeChange={setCalendarType}
                        language={language}
                    />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Calendar 
                                type={calendarType}
                                language={language}
                            />
                            <EventList 
                                type={calendarType}
                                language={language}
                            />
                        </div>
                        
                        <div>
                            {calendarType === 'islamic' ? (
                                <div>
                                    <PrayerTimes language={language} />
                                    <QiblaCompass language={language} />
                                </div>
                            ) : (
                                <Panchang language={language} />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
