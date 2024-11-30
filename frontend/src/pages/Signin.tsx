import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border min-w-48 p-8 rounded-xl">
        <Input placeHolder="username" reference={usernameRef} />
        <Input placeHolder="password" reference={passwordRef} />
        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text="Sign in"
            fullWidth={true}
            isLoading={false}
            onClick={signin}
          />
        </div>
      </div>
    </div>
  );
}
