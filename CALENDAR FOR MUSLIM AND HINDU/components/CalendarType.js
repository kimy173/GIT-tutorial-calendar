function CalendarType({ type, onTypeChange, language }) {
    try {
        return (
            <div className="flex space-x-4 mb-4" data-name="calendar-type-selector">
                <button
                    onClick={() => onTypeChange('hindu')}
                    className={`px-4 py-2 rounded-md ${
                        type === 'hindu' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    data-name="hindu-calendar-button"
                >
                    Hindu Calendar
                </button>
                <button
                    onClick={() => onTypeChange('islamic')}
                    className={`px-4 py-2 rounded-md ${
                        type === 'islamic' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    data-name="islamic-calendar-button"
                >
                    Islamic Calendar
                </button>
            </div>
        );
    } catch (error) {
        console.error('CalendarType component error:', error);
        reportError(error);
        return null;
    }
}
