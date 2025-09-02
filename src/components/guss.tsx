import { useCallback, useRef } from "react";
import useAnimationFrame from "../hooks/useAnimationFrame";
import { trapEvents } from "../utils/utils";

export type GooseProps = {
  callback: () => Promise<void>;
  disabled: boolean;
};

const Goose = (props: GooseProps) => {

  const {
    callback,
    disabled
  } = props;

  const ref = useRef<HTMLDivElement>(null)

  useAnimationFrame(() => {
    if (!ref.current) {
      return;
    }
    const opacity = Number(ref.current.style.opacity)
    if (opacity <= 0) {
      return;
    }
    const nextOpacity = opacity - 1/90;
    ref.current.style.opacity = nextOpacity < 0 ? "0" : nextOpacity.toFixed(2);
  });

  const onHit = useCallback(async () => {
    if (ref.current) {
      ref.current.style.opacity = "1";
    }

    if (callback) {
      callback();
    }
  }, [callback]);

  return (
    <div onClick={async (e) => {
      trapEvents(e);
      if (props.disabled) {
        return;
      }
      await onHit();
    }} className={`w-96 h-96 relative cursor-crosshair ${disabled ? "opacity-10" : "cursor-crosshair"}`}>
      <div className="inset-6 absolute rounded-t-2xl pointer-events-none" style={
        {
          backgroundImage: "url('img/guss.png')",
          backgroundSize: "cover"
        }}>
      </div>
      <div style={{opacity: 0}} ref={ref} className="inset-6 absolute">
        <div className="inset-0 absolute rounded-t-2xl grayscale pointer-events-none" style={
          {
            backgroundImage: "url('img/guss.png')",
            backgroundSize: "cover"
          }}>
        </div>
        <div className="inset-0 absolute rounded-t-2xl pointer-events-none" style={
          {
            backgroundImage: "url('img/splash.png')",
            backgroundSize: "cover"
          }}>
        </div>
      </div>
    </div>
  );
};

export default Goose;
