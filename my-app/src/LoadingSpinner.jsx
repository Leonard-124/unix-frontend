import Navbar from "./Pages/Navbar"
import Footer from "./Components/Footer"
const LoadingSpinner = () => {
	return(
		<>
	             <div className="flex items-center justify-center h-[400px] ">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full flex items-center justify-center h-10 w-10 border-4 border-red-500 border-x-transparent">
                                <div className="animate-spin rounded-full h-6 w-6 border-4 border-black border-x-transparent"></div>
                            </div>
                            <p className="text-gray-600 font-medium">Loading...</p>
                        </div>
                    </div>
                    
		</>
	)
}

export default LoadingSpinner