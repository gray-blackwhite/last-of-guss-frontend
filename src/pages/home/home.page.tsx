import { useEffect, useMemo, useState } from "react";
import { useGame } from "../../hooks/useGame";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import SessionWidget from "@components/session-widget";
import { useNavigate } from "react-router";
import PageStatus from "@components/page-status";
import CreateGameWidget from "@components/create-game-widget";

const HomePage = () => {
  useLoggedIn();

  const [hideCompleted, setHideCompleted] = useState(true);

  const { sessions, player, isReady } = useGame();

  const nav = useNavigate();

  useEffect(() => {
    if (player?.currentGame) {
      nav("/game");
    }
  }, [nav, player?.currentGame]);

  const filteredSessions = useMemo(() => {
    if (!hideCompleted) {
      return sessions;
    }

    return sessions.filter((s) => s.state !== "finished");
  }, [hideCompleted, sessions]);

  const sessionLines = useMemo(() => {
    if (!isReady) {
      return <PageStatus>Wait for a while...</PageStatus>;
    }

    if (!filteredSessions.length) {
      return <PageStatus>No games are there!</PageStatus>;
    }

    const now = new Date();

    return filteredSessions.map((session) => {
      return <SessionWidget key={session.id} session={session} now={now} />;
    });
  }, [filteredSessions, isReady]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] items-center">
        <div>
          <h1 className="text-4xl font-bold text-center md:text-left">Game Sessions</h1>
        </div>
        <div className="md:text-center">
          <CreateGameWidget/>
        </div>
        <div className="text-center md:text-right">
          <label className="label">
            Hide finished
            <input readOnly={true} type="checkbox" onClick={() => setHideCompleted(!hideCompleted)} checked={hideCompleted} className="checkbox checkbox-accent" />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4">{sessionLines}</div>
    </div>
  );
};

export default HomePage;
