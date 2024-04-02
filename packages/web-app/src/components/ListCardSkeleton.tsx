interface ListCardSkeletonProps {
  numItems?: number;
  height?: string;
  placeholderColor?: string;
}

export const ListCardSkeleton: React.FC<ListCardSkeletonProps> = ({
  numItems = 3,
  height = "h-full",
  placeholderColor = "bg-gray-200",
}) => {
  return (
    <div className={`animate-pulse ${height} p-2`}>
      {[...Array(numItems)].map((_, index) => (
        <div key={index} className="flex items-center gap-3 mb-2">
          <div className={`${placeholderColor} w-8 h-8 rounded`} />
          <div className="flex-1">
            <div className={`${placeholderColor} w-1/2 h-3 rounded`} />
            <div className={`${placeholderColor} w-2/3 h-2 rounded mt-1`} />
          </div>
        </div>
      ))}
    </div>
  );
};
