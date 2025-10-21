"use client";

export default function About() {
  return (
    <section id="about" className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* kiri: text */}
        <div>
          <p className="text-lg md:text-3xl font-bold text-center text-gray-900 mt-6">
            About CoE HUMIC Engineering
          </p>
          <hr className="w-56 border-2 border-red-800 mt-3 mb-6 mx-auto" />
          <p className="mt-6 mx-auto text-xs md:text-sm text-center text-gray-800 max-w-xl">
            HUMIC Engineering is a research center focused on technology engineering that supports human daily activities. We have a keen interest in the development of advanced wearable devices and sensors designed for seamless integration with the human body, aiming to enhance and simplify life.
          </p>
          <br />
          <p className="mt-6 mx-auto text-xs md:text-sm text-center text-gray-800 max-w-xl">
            In the scientific field, we are dedicated to collecting and analyzing data and information related to human body activities. By leveraging Big Data concepts, we transform this raw data into valuable knowledge and accurate insights, paving the way for groundbreaking discoveries and applications.
          </p>
        </div>
      </div>
    </section>
  );
}