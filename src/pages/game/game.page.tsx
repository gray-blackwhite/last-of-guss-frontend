import { useGame } from "../../hooks/useGame";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Goose from "@components/guss";
import { intervalToDuration } from "date-fns";

const CentralBlock = (props: React.HTMLAttributes<HTMLDivElement>) => {

  const {
    children,
  } = props;

  return (
    <div className="pointer-events-none flex flex-col items-center justify-center absolute inset-0">
      {children}
    </div>
  )
}

const GamePage = () => {
  useLoggedIn();

  const [pendingLeave, setPendingLeave] = useState(false);
  const [score, setScore] = useState(0);

  const {
    player,
    api: { leave, hit },
  } = useGame();

  const nav = useNavigate();

  const title = useMemo(() => {
    const state = player?.currentGame?.state;
    if (state === "cooldown") {
      return "Get Ready"
    };
    if (state === "active") {
      return "Do it NOW!"
    }
    
    return "Game Over";
  }, [player?.currentGame?.state])

  const roundProgress = useMemo(() => {
    const game = player?.currentGame;
    if (!game) {
      return 0;
    }

    const state = game.state;
    if (state === "cooldown") {
      return 0
    };
    if (state === "finished") {
      return 100;
    }
    
    const from = (game.startsAt ? new Date(game.startsAt) : new Date()).getTime();
    const to = (game.endsAt ? new Date(game.endsAt) : new Date()).getTime();
    const now = new Date().getTime()
    
    if (to === now) {
      return 0;
    }

    const result = 100 - ((to - now) / (to - from)) * 100;
    return result > 100 ? 100 : result;
    
  }, [player?.currentGame])

  useEffect(() => {
    if (!player?.currentGame) {
      nav("/");
    }
  }, [nav, player?.currentGame]);

  useEffect(() => {
    const stat = player?.currentGame?.stat;
    if (stat) {
      setScore(stat.score);
    }
  }, [player?.currentGame?.stat]);

  const onLeave = useCallback(async () => {
    setPendingLeave(true);
    try {
      await leave();
    } catch {
      // do nothing;
    }

    setPendingLeave(false);
  }, [leave]);

  const onHit = useCallback(async () => {
    const result = await hit();
    if (result) {
      setScore(result.score)
    }
  }, [hit])

  const centralWidget = useMemo(() => {
    
    const game = player?.currentGame;

    if (game?.state === "active") {
      return null;
    }

    if (game?.state === "cooldown") {

      const duration = intervalToDuration({
        start: new Date(),
        end: new Date(game?.startsAt || new Date)
      })

      const seconds = (duration.seconds || 0) + (duration.minutes || 0) * 60;

      return (
        <CentralBlock>
          <div className="text-xs uppercase font-bold mb-2">Game starts in</div>
          <div className="text-4xl font-black mb-6">{(seconds) || "NOW!"}</div>
        </CentralBlock>
      )
    }
    
    if (game?.state !== "finished") {
      return null;
    }

    if (!game?.winnerId) {
      return <CentralBlock><div className="text-lg">There's no Winner...</div></CentralBlock>
    }

    return (
      <CentralBlock>
        <div className="text-center text-3xl font-bold mb-4">{game?.winnerName}<br/><span className="text-error">WINS!</span></div>
        <div className="text-xs uppercase font-bold">Score:</div>
        <div className="text-6xl font-black text-accent">{game?.winnerScore}</div>
      </CentralBlock>
    )
  }, [player?.currentGame])

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="bg-base-200 rounded-3xl flex flex-col items-center">
          <div className="relative">
            <Goose callback={onHit} disabled={player?.currentGame?.state !== "active"}/>
            {centralWidget}
          </div>
          <div className="text-center">
            <div className="text-xs uppercase font-bold mb-2">Your score</div>
            <div className="text-4xl text-accent font-black mb-4">{score}</div>
          </div>
          <div>
            <progress className="progress w-56 mb-4 " value={roundProgress} max="100"></progress>
          </div>
        </div>
        <div>
          <button disabled={pendingLeave} onClick={onLeave} className="btn">
            Leave Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
