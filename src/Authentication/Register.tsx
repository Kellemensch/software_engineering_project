import "./LoginRegister.css";

export default function Register() {
  return (
    <div className="login-background">
      <div className="register-card">
        <h1>Snap<b>Rec</b></h1>
        <form className="register-form">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Mail" />
          <input type="text" placeholder="Phone Number" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Re-Enter Password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
