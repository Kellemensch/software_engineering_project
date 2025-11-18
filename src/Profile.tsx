import "./Profile.css";

export default function Profile() {
  const user = {
    name: "Jonathan",
    lastname: "Smith",
    dob: "1.1.2000",
    email: "jonathan.smith@gmail.com",
    phone: "+123 12 123 123",
    groupId: "1234567890",
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="120"
            height="120"
            stroke="black"
            fill="none"
            strokeWidth="2"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </div>

        <div className="profile-details">
          <p><span className="label">Name:</span> {user.name}</p>
          <p><span className="label">Lastname:</span> {user.lastname}</p>
          <p><span className="label">Date of Birth:</span> {user.dob}</p>
          <br />
          <br />

          <p><span className="label">Mail:</span> {user.email}</p>
          <p><span className="label">Phone number:</span> {user.phone}</p>
          <br />
          <br />

          <p className="change-password">Change Password</p>
          <br />
          <br />
          <br />

          <p className="group-id">Group ID: <span>{user.groupId}</span></p>
        </div>
      </div>
    </div>
  );
}
