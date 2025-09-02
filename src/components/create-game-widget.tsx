import { useCallback, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useGame } from "../hooks/useGame";

const CreateGameWidget = () => {
  
  const [pending, setPending] = useState(false);

  const {
    user
  } = useAuth();

  const {
    api: { create },
  } = useGame();

  const onCreate = useCallback(
    async () => {
      setPending(true);
      try {
        await create();
      } catch {
        // do nothing;
      }

      setPending(false);
    },
    [create],
  );

  if (!user || user.role !== "admin") {
    return null;
  }
  
  return (
    <button onClick={onCreate} disabled={pending} className="btn uppercase btn-lg w-full">Create</button>
  )
}

export default CreateGameWidget;