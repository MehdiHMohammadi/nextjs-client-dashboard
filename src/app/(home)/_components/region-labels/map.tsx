"use client";
import jsVectorMap from "jsvectormap";
import { useEffect, useRef } from "react";
import "@/js/world";

export default function Map({ mapId = "mapOne" }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // فقط در صورتی نقشه ایجاد شود که نمونه قبلی وجود نداشته باشد
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new jsVectorMap({
        selector: `#${mapId}`,
        map: "world",
        zoomButtons: true,
        regionStyle: {
          initial: {
            fill: "#C8D0D8",
          },
          hover: {
            fillOpacity: 1,
            fill: "#3056D3",
          },
        },
        regionLabelStyle: {
          initial: {
            fontWeight: "semibold",
            fill: "#fff",
          },
          hover: {
            cursor: "pointer",
          },
        },
        labels: {
          regions: {
            render(code: string) {
              return code.split("-")[1];
            },
          },
        },
      });
    }

    // تابع cleanup برای تخریب نقشه
    return () => {
      if (mapRef.current && mapInstanceRef.current) {
        // پاک کردن محتوای DOM
        mapRef.current.innerHTML = "";
        mapInstanceRef.current = null;
      }
    };
  }, [mapId]);

  return (
    <div className="h-[422px] w-full">
      <div id={mapId} ref={mapRef} className="mapOne map-btn w-full h-full" />
    </div>
  );
}