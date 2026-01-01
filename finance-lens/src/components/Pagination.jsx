
export default function Pagination({ page, onChange, hasPrev, hasNext }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <button
        onClick={() => onChange(page - 1)}
        disabled={!hasPrev}
        className={`text-sm px-3 py-1 border rounded ${hasPrev ? "bg-white hover:bg-gray-100" : "bg-gray-100 text-gray-500 cursor-not-allowed"}`}
      >
        ← Prev
      </button>
      <span className="text-sm text-gray-700">Page {page}</span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={!hasNext}
        className={`text-sm px-3 py-1 border rounded ${hasNext ? "bg-white hover:bg-gray-100" : "bg-gray-100 text-gray-500 cursor-not-allowed"}`}
      >
        Next →
      </button>
    </div>
  );
}
