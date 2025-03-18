function Panchang({ language }) {
    try {
        const [panchangData, setPanchangData] = React.useState(null);

        React.useEffect(() => {
            const data = convertGregorianToPanchang(new Date());
            setPanchangData(data);
        }, []);

        if (!panchangData) {
            return (
                <div className="text-center p-4" data-name="panchang-loading">
                    <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                </div>
            );
        }

        return (
            <div className="panchang-details bg-white p-4 rounded-lg shadow mt-4" data-name="panchang">
                <h3 className="text-lg font-semibold mb-3">Panchang</h3>
                <div className="space-y-2">
                    {Object.entries(panchangData).map(([key, value]) => (
                        <div 
                            key={key}
                            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md"
                            data-name={`panchang-${key}`}
                        >
                            <span className="capitalize">{key}</span>
                            <span className="text-gray-600">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Panchang component error:', error);
        reportError(error);
        return null;
    }
}
