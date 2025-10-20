"use client";
import Link from "next/link";
// import Image from "next/image";
import Card from "@/components/Card";
import { FaArrowRight } from 'react-icons/fa';

// const projects = [
//   { title: "Digital Stethoscope", img: "/stetho.jpg" },
//   { title: "SiHEDAF", img: "/sihedaf.jpg" },
//   { title: "Antropometri Kit", img: "/antropo.jpg" },
//   { title: "AMons", img: "/amons.jpg" },
// ];

export default function Projects() {
  return (
    <section id="features" className="w-full mt-70 py-20 bg-white mx-auto px-0 items-center">
        <h2 className="text-lg md:text-2xl font-bold text-center text-gray-900">
            Discover More!
        </h2>
        <p className="mt-6 mx-auto text-xs md:text-sm text-center text-gray-600 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <div className="mt-10 overflow-x-auto gap-6 py-2">
            <div className="flex gap-6 min-w-max">
            <Card
                name="Summarecon Bandung"
                image="https://images-residence.summarecon.com/images/article/Summaba.jpg"
                location="Jl. Sentra Raya Selatan Raya Barat, Rancabolang"
                rating={4}
            />
            <Card
                name="Kopi Berbagi"
                image="https://bandungoke.com/wp-content/uploads/2023/12/IMG-20231227-WA0042.jpg"
                location="Jl. Mars Utara III 40E Bandung"
                rating={5}
            />
            <Card
                name="Summarecon Bandung"
                image="https://images-residence.summarecon.com/images/article/Summaba.jpg"
                location="Jl. Sentra Raya Selatan Raya Barat, Rancabolang"
                rating={4}
            />
            <Card
                name="Kopi Berbagi"
                image="https://bandungoke.com/wp-content/uploads/2023/12/IMG-20231227-WA0042.jpg"
                location="Jl. Mars Utara III 40E Bandung"
                rating={5}
            />
            <Card
                name="Summarecon Bandung"
                image="https://images-residence.summarecon.com/images/article/Summaba.jpg"
                location="Jl. Sentra Raya Selatan Raya Barat, Rancabolang"
                rating={4}
            />
            <Card
                name="Kopi Berbagi"
                image="https://bandungoke.com/wp-content/uploads/2023/12/IMG-20231227-WA0042.jpg"
                location="Jl. Mars Utara III 40E Bandung"
                rating={5}
            />
            </div>
        </div>
        <Link href="/dashboard" className="text-gray-700 font-semibold md:underline flex place-content-end mr-50 mt-12 hover:text-blue-600 transition">
            Find More <FaArrowRight className='ml-1 mt-1'/>
        </Link>
    </section>
  );
}