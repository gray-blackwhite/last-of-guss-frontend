import { useCallback, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { userFriendlyRoleName } from "../utils/utils";

export type UserWidgetProps = React.HTMLAttributes<HTMLDivElement>;
const UserWidget = (props: UserWidgetProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children,
    ...rest
  } = props;

  const [pending, setPending] = useState(false);
  const {
    isAuthenticated,
    user,
    api: { logout },
  } = useAuth();

  const onLogOut = useCallback(async () => {
    setPending(true);
    try {
      await logout();
    } catch {
      // do nothing
    }
    setPending(false);
  }, [logout]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const { name, role } = user;

  return (
    <div {...rest}>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-1 items-end">
          <div className="font-bold">{name}</div>
          <div className="text-xs opacity-50">{userFriendlyRoleName(role)}</div>
        </div>
        <div>
          <button onClick={onLogOut} disabled={pending} type="button" className="btn block uppercase">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
