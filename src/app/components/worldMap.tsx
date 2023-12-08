import React, { useEffect, useState } from "react";
// @ts-ignore
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "../../styles/worldMap.scss";
import { UserDataProps } from "../../../types/types";

export default function WorldMap({ userData }: any) {
  const [map, setMap] = useState<any>(null);

  const initMap = () => {
    const newMap = new jsVectorMap({
      selector: "#map",
      map: "world",
      zoomOnScroll: false,
      regionsSelectable: false,
      // Regions style
      regionStyle: {
        initial: {
          fill: "#808080",
          "fill-opacity": 1,
        },
      },
      // Marker style
      markerStyle: {
        initial: {
          stroke: "#5a6779",
          strokeWidth: 0,
          fillOpacity: 2,
        },
      },
      onMarkerClick: function (event: any, index: number) {
        // Get the URL from the data
        const url = userData[index].url;

        if (url) {
          // Redirect the user to the URL
          window.location.href = url;
        }
      },
    });

    setMap(newMap);
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (map) {
      const delayIncrement = 900;
      const transitionDelay = 2200;

      const showAndRemoveMarkers = (arrayIndex: number) => {
        const markerColor = getMarkerColor(arrayIndex);
        const itemArray = userData[arrayIndex];

        itemArray.forEach((item: UserDataProps, index: number) => {
          setTimeout(() => {
            map.addMarkers([
              {
                name: item.funder,
                coords: [item.lat, item.lng],
                style: {
                  fill: markerColor,
                },
              },
            ]);
          }, index * delayIncrement);

          setTimeout(() => {
            map.removeMarkers([index]);
          }, index * delayIncrement + transitionDelay);
        });

        setTimeout(() => {
          showAndRemoveMarkers((arrayIndex + 1) % userData.length); // Repeat with the next array
        }, itemArray.length * delayIncrement + transitionDelay - delayIncrement);
      };

      showAndRemoveMarkers(0); // Start with the first array
    }
  }, [map, userData]);

  // Define marker colors based on array index
  const getMarkerColor = (index: number): string => {
    const colors = ["blue", "green", "red", "pink"];
    return colors[index % colors.length];
  };

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
}
