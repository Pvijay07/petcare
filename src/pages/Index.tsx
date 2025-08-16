import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import HomePage from "./HomePage";
import { FaCommentAlt, FaInfoCircle } from "react-icons/fa";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        {" "}
        {/* Added padding-bottom for mobile footer */}
        <HomePage />
        <HowItWorks />
      </main>

      {/* Mobile Footer - Only shown on mobile screens */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around items-center md:hidden">
        <div className="text-center">
          <FaInfoCircle className="mx-auto text-gray-500 text-xl" />
        </div>

        <div className="text-center">
          <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center -mt-8 mx-auto shadow-lg">
            <img src="/images/paw-foot.png" alt="Home" className="w-6 h-6" />
          </div>
          <p className="text-xs mt-1 text-indigo-600 font-medium">Home</p>
        </div>

        <div className="text-center">
          <FaCommentAlt className="mx-auto text-gray-500 text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Index;
