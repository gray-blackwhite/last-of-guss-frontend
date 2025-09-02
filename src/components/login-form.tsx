import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export type LoginFormProps = object;

type Inputs = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    api: { login },
  } = useAuth();
  const [pending, setPending] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      username: "MegaAbizzaba",
      password: "ppsdwGGwe!)2c3r",
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPending(true);
    try {
      const { username, password } = data;

      await login(username, password);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login Error", error.message);
        setError(error.message);
      }
    }
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <input
          {...register("username")}
          type="text"
          className="input"
          disabled={pending}
          required
          placeholder="Username"
          pattern="^[a-zA-Z0-9_]+$"
          minLength={3}
          maxLength={30}
          title="Only letters, numbers or dash"
        />
      </div>
      <div>
        <input
          {...register("password")}
          type="password"
          className="input"
          disabled={pending}
          required
          placeholder="Password"
          minLength={8}
          maxLength={512}
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$"
          title="Must be more than 7 characters, including number, lowercase letter, uppercase letter"
        />
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="flex justify-center">
        <button disabled={pending} type="submit" className="btn block uppercase">
          Enter the battle
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
