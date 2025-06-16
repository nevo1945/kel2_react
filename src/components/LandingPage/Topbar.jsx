export default function Topbar() {
  return (
    <div className="hidden lg:block fixed top-0 z-50 w-full bg-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-white">
            TRAINING HUB
          </a>
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-sm">
              <i className="fas fa-map-marker-alt mr-2"></i>123 Street, New York, USA
            </span>
            <span className="flex items-center text-sm">
              <i className="fas fa-envelope mr-2"></i>info@example.com
            </span>
            <span className="flex items-center text-sm">
              <i className="fas fa-phone-alt mr-2"></i>+012 345 67890
            </span>
            <div className="flex space-x-2 ml-4">
              <a className="w-8 h-8 flex items-center justify-center bg-white text-blue-600 hover:bg-gray-200 transition" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="w-8 h-8 flex items-center justify-center bg-white text-blue-600 hover:bg-gray-200 transition" href="#"><i className="fab fa-twitter"></i></a>
              <a className="w-8 h-8 flex items-center justify-center bg-white text-blue-600 hover:bg-gray-200 transition" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
