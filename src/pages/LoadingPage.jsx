import { useEffect } from "react";

export default function LoadingPage({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <h1 className="text-4xl font-bold">
       <img className="w-100"
       src="/animatedLogo.gif"/>
      </h1>
    </div>
  );
}