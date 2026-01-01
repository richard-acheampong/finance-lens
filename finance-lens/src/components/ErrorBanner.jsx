
export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="mt-4 bg-red-50 border border-red-200 text-red-800 text-sm px-3 py-2 rounded">
      {message}
    </div>
  );
}
