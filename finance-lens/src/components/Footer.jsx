
export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-5xl mx-auto px-4 py-6 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} FinanceLens</p>
        <p className="mt-1">Informational only; not financial advice. Sources credited.</p>
      </div>
    </footer>
  );
}
