function PaymentModal({ isOpen, onClose, onPaymentSuccess }) {
    try {
        const [isProcessing, setIsProcessing] = React.useState(false);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            const handleMessage = (event) => {
                if (event.data === 'PAYMENT_SUCCESS') {
                    handlePaymentSuccess();
                }
            };

            window.addEventListener('message', handleMessage);
            return () => window.removeEventListener('message', handleMessage);
        }, []);

        const handlePaymentSuccess = () => {
            try {
                localStorage.setItem('calendarPaid', 'true');
                localStorage.setItem('paymentDate', new Date().toISOString());
                onPaymentSuccess();
                onClose();
            } catch (error) {
                console.error('Payment verification error:', error);
                setError('There was an error processing your payment. Please try again.');
            }
            setIsProcessing(false);
        };

        const handlePayClick = () => {
            setIsProcessing(true);
            const paypalWindow = window.open('https://www.paypal.com/ncp/payment/FY3Q95X5X4RTL', 'PayPal', 'width=600,height=600');
            if (paypalWindow) {
                paypalWindow.focus();
            } else {
                setError('Please allow popups to complete the payment.');
                setIsProcessing(false);
            }
        };

        if (!isOpen) return null;

        const features = [
            {
                icon: "fas fa-bell",
                title: "Smart Notifications",
                description: "Set custom alarms for prayer times and important events"
            },
            {
                icon: "fas fa-wifi-slash",
                title: "Offline Access",
                description: "Full calendar access even without internet connection"
            },
            {
                icon: "fas fa-language",
                title: "Multiple Languages",
                description: "Access in Hindi, Urdu, English, and regional languages"
            },
            {
                icon: "fas fa-compass",
                title: "Advanced Features",
                description: "Qibla direction, Panchang details, and astrological insights"
            },
            {
                icon: "fas fa-calendar-alt",
                title: "Dual Calendar System",
                description: "Seamlessly switch between Hindu and Islamic calendars"
            },
            {
                icon: "fas fa-mobile-alt",
                title: "Mobile Widgets",
                description: "Quick access to prayer times and important dates"
            }
        ];

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto" data-name="payment-modal">
                <div className="bg-white rounded-lg w-full max-w-2xl m-4 relative modal-content" data-name="modal-content">
                    <button 
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 modal-close-button"
                        data-name="close-modal-button"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>

                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pr-8">Unlock Premium Features</h2>

                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6" data-name="error-message">
                                {error}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6 mb-8 feature-grid">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="flex items-start space-x-4 feature-item"
                                    data-name={`feature-item-${index}`}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <i className={`${feature.icon} text-blue-600 text-xl`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg mb-6 pricing-section" data-name="pricing-section">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-gray-900">$20.00</p>
                                <p className="text-blue-600 font-medium">One-time payment • Lifetime access</p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center justify-center">
                                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                        No recurring fees
                                    </li>
                                    <li className="flex items-center justify-center">
                                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                        All future updates included
                                    </li>
                                    <li className="flex items-center justify-center">
                                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                        Premium support
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {isProcessing ? (
                            <div className="text-center py-4" data-name="processing-payment">
                                <i className="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
                                <p className="mt-2 text-gray-600">Processing your payment...</p>
                            </div>
                        ) : (
                            <button 
                                onClick={handlePayClick}
                                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center justify-center"
                                data-name="paypal-button"
                            >
                                <i className="fab fa-paypal mr-2"></i>
                                Pay with PayPal
                            </button>
                        )}
                        
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Secure payment powered by PayPal
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PaymentModal component error:', error);
        reportError(error);
        return null;
    }
}
