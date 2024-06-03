import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LandingPage from "@/components/Dashboard/LandingPage";
import { Canvas } from "@react-three/fiber";
import Canvaspage from "@/components/canvas";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title:
    "Sonalgaz HR platform",
  description: "This is a HR platform for Sonalgaz",
};

export default function Home() {
  return (
    <>
  <div className="bg-white">
  <div className="grid z-99999 h-[100vh] px-5 grid-flow-col grid-cols-1 xl:grid-cols-3">
    <div className="max-w-[60vw] col-span-3 hidden md:block">
      <div className="h-[90%] w-full bg-gradient-to-tr from-sky-600 via-sky-400 to-gray-200 rounded-3xl my-[3%]">
        <Canvaspage />
      </div>
    </div>
    <div className="col-span-1 md:col-span-1 p-15">
      <LandingPage />
      <Toaster position="top-center" />
    </div>
  </div>
</div>

   
    </>
  );
}
