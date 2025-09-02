export type PanelProps = React.HTMLAttributes<HTMLDivElement>;

const Panel = (props: PanelProps) => {
  const { children, ...rest } = props;
  return (
    <div className="card bg-base-200 shadow-sm border-base-300 border-4" {...rest}>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Panel;
