export type PageStatusProps = React.HTMLAttributes<HTMLDivElement>;

const PageStatus = (props: PageStatusProps) => {
  const { children, ...rest } = props;
  return (
    <div className="p-12 text-center text-3xl" {...rest}>
      {children}
    </div>
  );
};

export default PageStatus;
