import { useAuth } from "../../hook/AuthContext";
import AppLogo from "./AppLogo";
import UserInfo from "./UserInfo";
import CalendarEventControls from "../controls/CalendarEventControls";

const Header = ({ reloadEvents, toggleFilter, filterOpen }) => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="px-10 py-6 bg-purple-300">
        <div className="flex justify-between border-b-2 border-black pb-2">
          <AppLogo />
          <UserInfo user={user} />
        </div>

        <div className="flex justify-between items-center pt-6">
          <CalendarEventControls
            reloadEvents={reloadEvents}
            toggleFilter={toggleFilter}
            filterOpen={filterOpen}
          />
          <button
            onClick={signOut}
            className="border px-3 py-2 bg-blue-700 text-white rounded-lg"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
};

export default Header;
