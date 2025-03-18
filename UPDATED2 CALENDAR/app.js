function App() {
    try {
        const [language, setLanguage] = React.useState('en');
        const [calendarType, setCalendarType] = React.useState('hindu');
        const [showPaymentModal, setShowPaymentModal] = React.useState(false);
        const [hasPaid, setHasPaid] = React.useState(false);
        const [isOffline, setIsOffline] = React.useState(!navigator.onLine);
        const [showInstallPrompt, setShowInstallPrompt] = React.useState(false);

        React.useEffect(() => {
            // Check if user has already paid
            const paid = localStorage.getItem('calendarPaid');
            if (paid) {
                setHasPaid(true);
            } else {
                setShowPaymentModal(true);
            }

            // Handle offline/online status
            const handleOnline = () => setIsOffline(false);
            const handleOffline = () => setIsOffline(true);

            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);

            // Handle PWA install prompt
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                window.deferredPrompt = e;
                setShowInstallPrompt(true);
            });

            // Make showPaymentModal globally accessible
            window.showPaymentModal = () => setShowPaymentModal(true);

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            };
        }, []);

        const handlePaymentSuccess = () => {
            setHasPaid(true);
            setShowPaymentModal(false);
        };

        // Function to wrap premium features
        const wrapPremiumFeature = (component, feature) => {
            if (hasPaid) return component;
            return <PremiumFeature feature={feature}>{component}</PremiumFeature>;
        };

        return (
            <div className="app-container" data-name="app">
                {isOffline && !hasPaid && (
                    <div className="bg-yellow-100 p-4" data-name="offline-warning">
                        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <i className="fas fa-wifi-slash text-yellow-600 mr-2"></i>
                                <p className="text-yellow-800">
                                    You're offline. Purchase premium for full offline access.
                                </p>
                            </div>
                            <button 
                                onClick={() => setShowPaymentModal(true)}
                                className="text-yellow-600 hover:text-yellow-800"
                                data-name="offline-upgrade-button"
                            >
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                )}

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
                            {wrapPremiumFeature(
                                <EventList 
                                    type={calendarType}
                                    language={language}
                                />,
                                "Get detailed festival information and custom reminders"
                            )}
                        </div>
                        
                        <div>
                            {calendarType === 'islamic' ? (
                                <div>
                                    {wrapPremiumFeature(
                                        <PrayerTimes language={language} />,
                                        "Get accurate prayer times and custom notifications"
                                    )}
                                    {wrapPremiumFeature(
                                        <QiblaCompass language={language} />,
                                        "Access precise Qibla direction from anywhere"
                                    )}
                                </div>
                            ) : (
                                wrapPremiumFeature(
                                    <Panchang language={language} />,
                                    "Access detailed Panchang information"
                                )
                            )}
                        </div>
                    </div>
                </main>

                <PaymentModal 
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    onPaymentSuccess={handlePaymentSuccess}
                />

                <InstallPrompt 
                    isVisible={showInstallPrompt}
                    onClose={() => setShowInstallPrompt(false)}
                />
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
