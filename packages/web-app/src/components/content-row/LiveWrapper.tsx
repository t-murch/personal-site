function LiveWrapper({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  return (
    <a href={url} target="_blank">
      {children}
    </a>
  );
}

export default LiveWrapper;
