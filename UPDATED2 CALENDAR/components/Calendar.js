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

        const getFirstDayOfMonth = (date) => {
            return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        };

        const renderWeekDays = () => {
            const weekdays = TRANSLATIONS[language]?.weekdays || WEEKDAYS.en;
            return weekdays.map((day, index) => (
                <div 
                    key={index}
                    className="weekday-header p-2 text-center font-semibold bg-gray-50"
                    data-name={`weekday-${index}`}
                >
                    <span className="hidden md:block">{day}</span>
                    <span className="md:hidden">{day.slice(0, 3)}</span>
                </div>
            ));
        };

        const renderCalendarDays = () => {
            const days = [];
            const totalDays = getDaysInMonth(currentDate);
            const firstDay = getFirstDayOfMonth(currentDate);
            
            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                days.push(
                    <div 
                        key={`empty-${i}`} 
                        className="calendar-day empty"
                        data-name={`empty-day-${i}`}
                    />
                );
            }

            // Add the actual days
            for (let i = 1; i <= totalDays; i++) {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                const isToday = date.toDateString() === new Date().toDateString();
                const festival = events.find(event => new Date(event.date).toDateString() === date.toDateString());
                
                days.push(
                    <div
                        key={i}
                        className={`calendar-day ${isToday ? 'today' : ''}`}
                        style={festival ? { backgroundColor: `${festival.color}20`, color: festival.color } : {}}
                        data-name={`calendar-day-${i}`}
                    >
                        <div className="relative h-full">
                            <span className="absolute top-1 left-1">{i}</span>
                            {festival && (
                                <div 
                                    className="absolute bottom-1 left-1 right-1 text-xs text-center p-1 rounded"
                                    style={{ backgroundColor: `${festival.color}30` }}
                                >
                                    {festival.name}
                                </div>
                            )}
                        </div>
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
                    {renderWeekDays()}
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
