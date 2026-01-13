import Button from "@/components/Button";

export default function Hero() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col justify-center bg-gradient-to-b from-gray-50 to-white -mt-10 overflow-hidden py-80">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[55%_40%] items-center gap-12">

          {/* kolom kiri */}
          <div className="space-y-6 px-6 mt-10">
            <h1 className="text-5xl font-black text-gray-900 leading-tight">
              Technological Innovation for the{" "}
              <span className="text-red-800">Future</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Delivering leading engineering solutions to support human activities.
            </p>
            <Button type="button" href="#projects" className="mt-3">
              View Our Projects
            </Button>
          </div>

          {/* kolom kanan */}
          <div className="relative flex justify-center md:justify-end">
            <div className="absolute inset-y-0 -right-30 -top-60 w-126 h-144 bg-[#7C2727] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            </div>
            <div className="absolute inset-y-0 right-10 -top-52 w-108 h-40 bg-[#B4252A] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 space-y-6 p-6">
              <h3 className="text-white font-bold text-xl">Devices & Sensors</h3>
              <p className="text-white text-base">Engineering using devices and sensors to support human daily activities</p>
            </div>
            <div className="absolute inset-y-0 right-10 -top-8 w-108 h-40 bg-[#B4252A] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 space-y-6 p-6">
              <h3 className="text-white font-bold text-xl">Internet of Things (IoT)</h3>
              <p className="text-white text-base">Internet of Things become an inevitable trending technology</p>
            </div>
            <div className="absolute inset-y-0 right-10 top-36 w-108 h-40 bg-[#B4252A] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 space-y-6 p-6">
              <h3 className="text-white font-bold text-xl">Big Data</h3>
              <p className="text-white text-base">Using Big Data concept to gain knowledge and useful information</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}