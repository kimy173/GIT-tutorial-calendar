function EventList({ type, language }) {
    try {
        const events = FESTIVALS[type] || [];

        return (
            <div className="event-list mt-4 bg-white rounded-lg shadow p-4" data-name="event-list">
                <h3 className="text-lg font-semibold mb-3">{TRANSLATIONS[language].festivals}</h3>
                <div className="space-y-2">
                    {events.map((event, index) => (
                        <div 
                            key={index}
                            className="p-2 hover:bg-gray-50 rounded-md transition-colors"
                            data-name={`event-item-${index}`}
                        >
                            <div className="font-medium">{event.name}</div>
                            <div className="text-sm text-gray-500">
                                {new Date(event.date).toLocaleDateString(language)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('EventList component error:', error);
        reportError(error);
        return null;
    }
}
