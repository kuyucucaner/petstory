import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/user/user-slice";
import { useState } from "react";
import { useParams } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
      {passwordResetStatus === "loading" && <p>Loading...</p>}
      {passwordResetStatus === "success" && (
        <p>Password reset successfully!</p>
      )}
      {passwordResetError && <p>{passwordResetError}</p>}
    </form>
  );
};

export default PasswordResetForm;
