export default function Topbar() {
  return (
    <div className="hidden lg:block fixed top-0 z-50 w-full bg-[#d3932d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <a href="/" className="text-xl font-bold tracking-wider flex items-center">
            <i className="fas fa-wrench mr-2 text-black"></i> TRAINING HUB
          </a>
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>Umban Sari Street, Rumbai, USA (umban sari atas)
            </span>
            <span className="flex items-center">
              <i className="fas fa-envelope mr-2"></i>kel2@gmail.com
            </span>
            <span className="flex items-center">
              <i className="fas fa-phone-alt mr-2"></i>+62895414071747
            </span>
            <div className="flex space-x-2 ml-4">
              <a className="w-8 h-8 flex items-center justify-center bg-white text-[#d3932d] hover:bg-gray-100 rounded-full" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="w-8 h-8 flex items-center justify-center bg-white text-[#d3932d] hover:bg-gray-100 rounded-full" href="#"><i className="fab fa-twitter"></i></a>
              <a className="w-8 h-8 flex items-center justify-center bg-white text-[#d3932d] hover:bg-gray-100 rounded-full" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
