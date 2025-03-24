type SplashScreenProps = {
    showSplashScreen: boolean;
    setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SplashScreen({ STATE }: { STATE: SplashScreenProps }) {

    const handleStartExperience = () => {
        STATE?.setShowSplashScreen(false);
    }

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-white py-8 px-4">
            {/* Logos section */}
            <div className="w-full flex justify-between max-w-md mb-8">
                <div className="bg-gray-200 w-36 h-16 flex items-center justify-center">
                    <p className="text-gray-800 font-medium">Sponsor Logo</p>
                </div>
                <div className="bg-gray-200 w-36 h-16 flex items-center justify-center">
                    <p className="text-gray-800 font-medium">MI Logo</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">POSE WITH MI STARS!</h1>

                {/* Silhouette placeholder */}
                <div className="bg-gray-200 w-full max-w-xs h-48 mb-12 flex items-center justify-center">
                    <p className="text-white text-center text-sm">
                        Silhouette of
                        <br />
                        image clicked
                    </p>
                </div>

                <h2 className="text-xl font-bold text-center mb-8">
                    HUDDLE UP
                    <br />
                    AND TAKE A SELFIE
                </h2>

                {/* Start button */}
                <button
                    onClick={handleStartExperience}
                    className="bg-gray-200 w-full max-w-xs py-4 text-center font-bold text-gray-800 mb-6 hover:bg-gray-300 transition-colors"
                >
                    {"START EXPERIENCE"}
                </button>

                {/* Terms link */}
                <a href="#" className="text-xs text-gray-800 hover:underline">
                    Terms & Conditions
                </a>
            </div>
        </div>
    )
}

