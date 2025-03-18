function InstallPrompt({ isVisible, onClose }) {
    try {
        if (!isVisible) return null;

        return (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg" data-name="install-prompt">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-blue-100 p-2">
                            <i className="fas fa-mobile-alt text-blue-600"></i>
                        </div>
                        <div>
                            <h3 className="font-semibold">Install Calendar App</h3>
                            <p className="text-sm text-gray-600">Add to Home Screen for quick access</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            data-name="install-later-button"
                        >
                            Later
                        </button>
                        <button 
                            onClick={() => {
                                window.deferredPrompt?.prompt();
                                onClose();
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            data-name="install-now-button"
                        >
                            Install Now
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('InstallPrompt component error:', error);
        reportError(error);
        return null;
    }
}
