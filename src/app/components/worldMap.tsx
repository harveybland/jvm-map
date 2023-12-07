"use client";

// @ts-ignore
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "../../styles/worldMap.scss";
import { useEffect } from "react";

export default function WorldMap({ data }: any) {
  function initMap() {
    console.log(data);
    const map = new jsVectorMap({
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
          strokeWidth: 2,
          fill: "#fb9039",
          fillOpacity: 1,
        },
      },
      onMarkerClick: function () {
        // redirect to the user profile
        console.log(data);
      },
      // Marker label style
      // markerLabelStyle: {
      //   initial: {
      //     fontFamily: "'Inter', sans-serif",
      //     fontSize: 14,
      //     fontWeight: 500,
      //     fill: "#f0f",
      //   },
      //   hover: {
      //     fill: "#3cc0ff",
      //   },
      // },
      // Lines style
      // lineStyle: {
      //   stroke: "#fb9039",
      //   strokeWidth: 1.5,
      //   fill: "red",
      //   fillOpacity: 1,
      //   strokeDasharray: "6, 3, 6",
      //   animation: true, // Enables animation
      // },
      // render the marker name
      // labels: {
      //   markers: {
      //     render(marker: any) {
      //       return marker.name || "Not available";
      //     },
      //   },
      // },
    });
    // data
    // let previousItemName: any = null;

    let delay = 0;
    const delayIncrement = 600;

    data.forEach((item: any) => {
      // Add markers from data
      setTimeout(() => {
        map.addMarkers([
          {
            name: item.name,
            coords: [item.lat, item.lng],
          },
        ]);

        // Add lines from the previous item to the current item
        // if (previousItemName) {
        //   map.addLines([
        //     {
        //       from: previousItemName,
        //       to: item.name,
        //     },
        //   ]);
        // }

        // Update the previousItemName for the next iteration
        // previousItemName = item.name;
      }, delay);

      delay += delayIncrement;
    });
  }

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
}
