import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "../features/user/user-slice";
import { useState } from "react";

const PasswordResetRequestForm = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { passwordResetRequestStatus, passwordResetRequestError } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset(email));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send Reset Link</button>
      {passwordResetRequestStatus === "loading" && <p>Loading...</p>}
      {passwordResetRequestStatus === "success" && (
        <p>Reset link sent successfully!</p>
      )}
      {passwordResetRequestError && <p>{passwordResetRequestError}</p>}
    </form>
  );
};

export default PasswordResetRequestForm;
