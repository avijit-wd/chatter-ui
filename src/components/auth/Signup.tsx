import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState("");

  const { login } = useLogin();
  return (
    <Auth
      submitLabel="Signup"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          const user = await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });

          await login({ email, password });
          setError("");
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          console.log(error);
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <div>
        Already have an account?{" "}
        <Link to="/login" style={{ alignSelf: "center" }}>
          <MuiLink>Login</MuiLink>
        </Link>
      </div>
    </Auth>
  );
};
export default Signup;
