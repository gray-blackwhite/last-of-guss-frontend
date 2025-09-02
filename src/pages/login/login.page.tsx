import LoginForm from "@components/login-form";
import Panel from "@components/panel";
import { useLoggedOut } from "../../hooks/useLoggedOut";

const LoginPage = () => {
  // const { isAuthenticated } = useAuth();
  // const nav = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     nav("/");
  //   }
  // }, [isAuthenticated, nav]);

  useLoggedOut();

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-96">
        <Panel>
          <div className="flex flex-col gap-6">
            <h1 className="text-lg uppercase text-center font-bold">LOG IN</h1>
            <LoginForm />
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default LoginPage;
