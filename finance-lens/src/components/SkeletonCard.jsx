
export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg border p-4 animate-pulse flex gap-4">
      <div className="w-24 h-24 bg-gray-200 rounded-md" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-3" />
      </div>
    </div>
  );
}
