function Calendar({ type, language }) {
    try {
        const [currentDate, setCurrentDate] = React.useState(new Date());
        const [events, setEvents] = React.useState([]);

        React.useEffect(() => {
            const festivals = FESTIVALS[type] || [];
            setEvents(festivals);
        }, [type]);

        const getDaysInMonth = (date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            return new Date(year, month + 1, 0).getDate();
        };

        const renderCalendarDays = () => {
            const days = [];
            const totalDays = getDaysInMonth(currentDate);
            
            for (let i = 1; i <= totalDays; i++) {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                const isToday = date.toDateString() === new Date().toDateString();
                const isFestival = events.some(event => new Date(event.date).toDateString() === date.toDateString());
                
                days.push(
                    <div
                        key={i}
                        className={`calendar-day ${isToday ? 'today' : ''} ${isFestival ? 'festival' : ''}`}
                        data-name={`calendar-day-${i}`}
                    >
                        <span>{i}</span>
                        {isFestival && (
                            <div className="text-xs mt-1">
                                {events.find(event => new Date(event.date).toDateString() === date.toDateString())?.name}
                            </div>
                        )}
                    </div>
                );
            }
            return days;
        };

        return (
            <div className="calendar-container p-4" data-name="calendar">
                <div className="flex justify-between items-center mb-4">
                    <button 
                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        data-name="prev-month-button"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <h2 className="text-xl font-semibold">
                        {currentDate.toLocaleDateString(language, { month: 'long', year: 'numeric' })}
                    </h2>
                    <button 
                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        data-name="next-month-button"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="calendar-grid">
                    {renderCalendarDays()}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Calendar component error:', error);
        reportError(error);
        return null;
    }
}
