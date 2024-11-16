import "./UserInitialAvatar.scss";

const UserInitialAvatar = ({letter}) => {
  return (
    <div className="user-avatar" aria-label="Sender Initial">
      {letter}
    </div>
  );
};

export default UserInitialAvatar;
