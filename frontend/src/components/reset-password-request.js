import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "../features/user/user-slice";
import { useState } from "react";
import '../styles/reset-password-request.css';
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
    <div className="reset-password-request">
      <h3 className="reset-password-text">Eğer şifrenizi unuttuysanız lütfen aşağıya siteye kayıtlı olduğunuz mail adresinizi giriniz.</h3>
   
    <form className="reset-password-request-form"  onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="reset-password-input"
      />
      <button className="reset-password-button" type="submit">Send Reset Link</button>
      {passwordResetRequestStatus === "loading" && <p>Loading...</p>}
      {passwordResetRequestStatus === "success" && (
        <p>Reset link sent successfully!</p>
      )}
      {passwordResetRequestError && <p>{passwordResetRequestError}</p>}
    </form>
    </div>
  );
};

export default PasswordResetRequestForm;
