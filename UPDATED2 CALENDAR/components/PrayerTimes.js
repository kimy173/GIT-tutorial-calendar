function PrayerTimes({ language }) {
    try {
        const [location, setLocation] = React.useState(null);
        const [prayerTimes, setPrayerTimes] = React.useState(null);

        React.useEffect(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            }
        }, []);

        React.useEffect(() => {
            if (location) {
                const times = calculatePrayerTimes(location.latitude, location.longitude, new Date());
                setPrayerTimes(times);
            }
        }, [location]);

        if (!prayerTimes) {
            return (
                <div className="text-center p-4" data-name="prayer-times-loading">
                    <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                </div>
            );
        }

        return (
            <div className="prayer-times bg-white p-4 rounded-lg shadow" data-name="prayer-times">
                <h3 className="text-lg font-semibold mb-3">{TRANSLATIONS[language].prayerTimes}</h3>
                <div className="space-y-2">
                    {Object.entries(prayerTimes).map(([prayer, time]) => (
                        <div 
                            key={prayer}
                            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md"
                            data-name={`prayer-time-${prayer}`}
                        >
                            <span className="capitalize">{prayer}</span>
                            <span className="text-gray-600">{time}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PrayerTimes component error:', error);
        reportError(error);
        return null;
    }
}
