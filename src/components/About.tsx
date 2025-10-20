"use client";

export default function About() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 text-center px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 my-50 pb-1">

          {/* kiri: form */}
          <div className="">
            <p className="text-lg md:text-3xl font-bold text-center text-gray-900 mt-6">
              About CoE HUMIC Engineering
            </p><br />
            <p className="mt-6 mx-auto text-xs md:text-sm text-center text-gray-600 max-w-xl">
              HUMIC Engineering is a research center focused on technology engineering that supports human daily activities. We have a keen interest in the development of advanced wearable devices and sensors designed for seamless integration with the human body, aiming to enhance and simplify life.
            </p><br />
            <p className="mt-6 mx-auto text-xs md:text-sm text-center text-gray-600 max-w-xl">
              In the scientific field, we are dedicated to collecting and analyzing data and information related to human body activities. By leveraging Big Data concepts, we transform this raw data into valuable knowledge and accurate insights, paving the way for groundbreaking discoveries and applications.
            </p><br />
          </div>
        </div>
    </section>
    // <section className="text-center py-16 bg-gray-100 px-10 mt-50">
    //   <h2 className="text-2xl font-bold">
    //     About <span className="text-primary">CoE HUMIC Engineering</span>
    //   </h2>
    //   <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-relaxed">
    //     HUMIC Engineering is a research center focused on technology engineering that supports human daily activities. 
    //     We develop advanced wearable devices and sensors designed for seamless integration with the human body, aiming to enhance and simplify life.
    //   </p>
    //   <p className="mt-4 max-w-3xl mx-auto text-gray-600 leading-relaxed">
    //     In the scientific field, we collect and analyze data related to human body activities. 
    //     By leveraging Big Data concepts, we transform raw data into valuable insights that pave the way for discoveries and applications.
    //   </p>
    // </section>
  );
}