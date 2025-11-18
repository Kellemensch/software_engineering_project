import "./LoginRegister.css";

export default function Login() {
  return (
    <div className="login-background">
      <div className="login-card">
        <h1>Snap<b>Rec</b></h1>
        <form className="login-form">
          <input type="email" placeholder="Mail" />
          <input type="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
