"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { userData } from "./api/json";

const WorldMap = dynamic(() => import("./components/worldMap"), {
  ssr: false,
});

export default function Page() {
  const [jsonData, setData] = useState<any[]>([]);
  const [loadMap, setLoadMap] = useState(false);
  const observedElementRef = useRef(null);

  async function fetchData() {
    const usersData = await userData();
    setData(usersData);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadMap(true);
          fetchData();
        } else if (!entry.isIntersecting) {
          setLoadMap(false);
        }
      });
    });

    if (observedElementRef.current) {
      observer.observe(observedElementRef.current);
    }

    return () => {
      if (observedElementRef.current) {
        observer.unobserve(observedElementRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold py-8 text-2xl">JS Vector Map</h1>
      <div className="pt-[10vh]"></div>
      <div className="px-5" ref={observedElementRef}>
        {loadMap && jsonData && <WorldMap userData={jsonData} />}
      </div>
      <div className="pt-[10vh]"></div>
    </div>
  );
}
