import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      console.log(response);
      alert("Sign up successful");
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
            text="Sign up"
            fullWidth={true}
            isLoading={false}
            onClick={signup}
          />
        </div>
      </div>
    </div>
  );
}
