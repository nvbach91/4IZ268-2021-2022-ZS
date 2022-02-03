import logo from "../assets/logo.png"
const AppLogo = ({ children }) => {
  return (
    <div className="flex">
      <img className="px-6 py-3" src={logo} alt="application logo"/>
      <div className="text-8xl bg-purple-700 p-3 rounded-md text-white">
        SP2
      </div>
    </div>
  );
};

export default AppLogo;
