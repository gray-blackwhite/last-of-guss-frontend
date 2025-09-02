import { useMemo } from "react";
import type { ApiGameSessionState } from "../domain/models";

export type StatusLabelProps = {
  status: ApiGameSessionState;
};

type LabelAppearance = {
  color: string;
  text: string;
};

const StatusLabel = ({ status }: StatusLabelProps) => {
  const appearance = useMemo<LabelAppearance>(() => {
    switch (status) {
      case "active": {
        return {
          color: "text-success",
          text: "Active",
        };
      }
      case "cooldown": {
        return {
          color: "text-warning",
          text: "Cooldown",
        };
      }
      case "finished": {
        return {
          color: "",
          text: "Finished",
        };
      }
    }
  }, [status]);

  return <div className={`font-bold ${appearance.color}`}>{appearance.text}</div>;
};

export default StatusLabel;
