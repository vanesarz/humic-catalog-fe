export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-left px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 mt-40">

          {/* kiri: search */}
          <div>
            <p className="text-5xl font-bold text-gray-900 leading-tight mt-40">
              Technological Innovation for the Future
            </p>
            <p className="mt-6 text-3xl md-20 text-gray-600 max-w-2xl">
              Delivering leading engineering solutions to support human activities
            </p>

          </div>

          {/* kanan: preview */}
          <div>
            <div className="bg-red-900 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-60 mt-20">
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}