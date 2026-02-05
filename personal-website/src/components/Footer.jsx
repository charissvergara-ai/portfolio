const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-2xl font-bold text-primary-400">Portfolio</p>
            <p className="text-secondary-400 text-sm mt-1">
              Building digital experiences
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-secondary-400 text-sm">
              &copy; {new Date().getFullYear()} John Doe. All rights reserved.
            </p>
            <p className="text-secondary-500 text-xs mt-1">
              Made with React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
