import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/user/user-slice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/reset-password-form.css';

const PasswordResetForm = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const { passwordResetStatus, passwordResetError } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password }));
  };

  return (
    <div className="password-reset-container">
    <h2 className="password-reset-title">Reset Your Password</h2>
    <form className="password-reset-form" onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="password-input"
      />
      <button type="submit" className="reset-button">Reset Password</button>
      {passwordResetStatus === "loading" && <p className="status">Loading...</p>}
      {passwordResetStatus === "success" && (
        <p className="status success">Password reset successfully!</p>
      )}
      {passwordResetError && <p className="status error">{passwordResetError}</p>}
    </form>
  </div>
  );
};

export default PasswordResetForm;
