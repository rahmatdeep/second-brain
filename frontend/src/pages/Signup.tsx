import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border min-w-48 p-8 rounded-xl">
        <Input placeHolder="username" />
        <Input placeHolder="password" />
        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text="Sign up"
            fullWidth={true}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
