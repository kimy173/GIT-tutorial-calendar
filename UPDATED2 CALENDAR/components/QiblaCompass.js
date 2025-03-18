function QiblaCompass({ language }) {
    try {
        const [qiblaAngle, setQiblaAngle] = React.useState(null);
        const [location, setLocation] = React.useState(null);

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
                const angle = calculateQiblaDirection(location.latitude, location.longitude);
                setQiblaAngle(angle);
            }
        }, [location]);

        if (!qiblaAngle) {
            return (
                <div className="text-center p-4" data-name="qibla-loading">
                    <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                </div>
            );
        }

        return (
            <div className="bg-white p-4 rounded-lg shadow mt-4" data-name="qibla-compass">
                <h3 className="text-lg font-semibold mb-3">{TRANSLATIONS[language].qibla}</h3>
                <div className="compass-container mx-auto" data-name="compass">
                    <div 
                        className="w-full h-full relative"
                        style={{
                            transform: `rotate(${qiblaAngle}deg)`,
                            transition: 'transform 0.5s ease'
                        }}
                    >
                        <i className="fas fa-compass text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm">
                            Qibla
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('QiblaCompass component error:', error);
        reportError(error);
        return null;
    }
}
