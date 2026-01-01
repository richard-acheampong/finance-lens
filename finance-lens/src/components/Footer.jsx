
export default function Footer() {
  return (
    // Fixed height and CSS var to match the calc in <main>
    <footer
      className="border-t bg-white w-full"
      style={{ height: "56px", "--app-footer-h": "56px" }}
    >
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center text-xs text-gray-600">
        <div>
          <p>© {new Date().getFullYear()} FinanceLens</p>
          <p className="mt-1">Informational only; not financial advice. Sources credited.</p>
        </div>
      </div>
    </footer>
  );
}
