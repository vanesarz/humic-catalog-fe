export default function Footer() {
  return (
    <footer className="w-full bg-black text-white px-10 py-10 relative bottom-0">
      <div className="flex justify-between flex-wrap gap-10">
        <div>
          <h3 className="font-bold text-lg mb-2">HUMIC Engineering</h3>
          <p className="text-sm text-gray-300">
            Gedung Kuliah Selatan, Blok F<br />
            Jl. Telekomunikasi, Buah Batu, Bandung<br />
            Jawa Barat, Indonesia. 40257
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Navigation</h4>
          <ul className="text-sm text-gray-300">
            <li>Home</li>
            <li>Catalog</li>
            <li>Partners</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Others</h4>
          <ul className="text-sm text-gray-300">
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-10">
        © 2025 CoE HUMIC Engineering
      </p>
    </footer>
  );
}