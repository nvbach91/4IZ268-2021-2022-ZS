const UserInfo = ({ user }) => (
  <div className="flex w-full justify-end">
    <img
      src={user.profileImg}
      alt="Profile"
      className="relative object-cover"
    />
  </div>
);

export default UserInfo;
