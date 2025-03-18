function PremiumFeature({ children, feature }) {
    try {
        return (
            <div className="relative" data-name="premium-feature">
                <div className="filter blur-sm pointer-events-none">
                    {children}
                </div>
                <div 
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    data-name="premium-overlay"
                >
                    <div className="text-center p-4">
                        <i className="fas fa-lock text-2xl text-yellow-400 mb-2"></i>
                        <p className="text-white font-semibold mb-2">Premium Feature</p>
                        <p className="text-white text-sm mb-4">{feature}</p>
                        <button 
                            onClick={() => window.showPaymentModal()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            data-name="unlock-button"
                        >
                            Unlock Now
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PremiumFeature component error:', error);
        reportError(error);
        return null;
    }
}
