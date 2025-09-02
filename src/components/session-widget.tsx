import { useCallback, useMemo, useState } from "react";
import Panel from "./panel";
import StatusLabel from "./status-label";
import { formatDistance } from "date-fns";
import { useGame } from "../hooks/useGame";
import type { ApiGameSession } from "../domain/models";

export type SessionWidgetProps = {
  session: ApiGameSession;
  now: Date;
};

const SessionWidget = ({ session, now }: SessionWidgetProps) => {
  const { endsAt, startsAt, state, id } = session;

  const [pendingJoin, setPendingJoin] = useState(false);

  const startsAtLabel = useMemo(() => {
    return formatDistance(startsAt, now, { addSuffix: true, includeSeconds: true });
  }, [now, startsAt]);

  const endsAtLabel = useMemo(() => {
    return formatDistance(endsAt, now, { addSuffix: true, includeSeconds: true });
  }, [endsAt, now]);

  const {
    api: { join },
  } = useGame();

  const onJoin = useCallback(
    async (gameSessionId: string) => {
      setPendingJoin(true);
      try {
        await join(gameSessionId);
      } catch {
        // do nothing;
      }

      setPendingJoin(false);
    },
    [join],
  );

  return (
    <Panel>
      <div className="flex flex-col gap-4">
        <div className="text-xs uppercase border-b pb-1 font-mono">
          <span className="opacity-50">Session ID: </span> {id}
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <div>Start: </div>
            <div>{startsAtLabel}</div>
            <div>End: </div>
            <div>{endsAtLabel}</div>
            <div>Status</div>
            <div>
              <StatusLabel status={state} />
            </div>
          </div>
          <div>
            <button onClick={async () => await onJoin(id)} disabled={state === "finished" || pendingJoin} className="btn btn-accent btn-outline btn-lg uppercase">
              Join
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default SessionWidget;
