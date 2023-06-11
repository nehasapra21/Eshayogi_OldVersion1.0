import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import Warning from "../hoc/Warning/Warning";

const Pizza = (props) => {
  console.log("Pizza ka material", props);

  let colors = [
    { status: "PENDING", color: "#2f2d64" },
    { status: "ASSIGNED", color: "#F89939" },
    { status: "SOLVED", color: "#198A44" },
    { status: "DISCUSS", color: "#FD5F60" },
    { status: "DELEGATED", color: "#198A44" },
    { status: "UNSUCCESSFUL", color: "#FF4444" },
    { status: "SCHEDULED", color: "#FEB81C" },
    { status: "ATTENDED", color: "#00D47D" },
    { status: "REJECTED", color: "#B772F3" },
    { status: "SANCTIONED", color: "#F89939" },
    { status: "WORKINPROGRESS", color: "#00D57D" },
    { status: "WORK DONE", color: "#198A44" },
    { status: "INAUGURATED", color: "#00B8EA" },
    { status: "PROCESSING", color: "#00D47D" },
    { status: "CLEARED", color: "#FEB81C" },
    { status: "RESPONSENEEDED", color: "#FDB81C" },
    { status: "RESPONSENOTNEEDED", color: "#00D57D" },
    { status: "RESPONDEDTO", color: "#B572F3" },
    { status: "SHARED", color: "#FEB81C" },
    { status: "PLACED", color: "#00D47D" },
    { status: "CONFIRMED", color: "#DB1B1B" },
    { status: "NOTCONFIRMED", color: "#2F2D64" },
    { status: "GENERAL", color: "#FEB81C" },
    { status: "IMPORTANT", color: "#DB1B1B" },
    { status: "VERYIMPORTANT", color: "#2F2D64" },
    { status: "UNDERREVIEW", color: "#2f2d64" },
  ];

  let pizzaMaterial = [];

  for (let i = 0; i < props.data.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      if (props.data[i].status === colors[j].status) {
        pizzaMaterial.push({
          title: "",
          value: parseInt(props.data[i].count, 10),
          color: colors[j].color,
        });
      }
    }
  }

  /*pizzaMaterial = props.data.map((slice) => {
    console.log("pizza slice", slice);
    colors.map((cheese) => {
      if (cheese.status === slice.status) {
        console.log("status", cheese.status, slice.status, cheese.color);
        return (slice = {
          ...slice,
          color: cheese.color,
        });
      }
    });
  });*/

  console.log("Pizza ban gya", pizzaMaterial);

  return <PieChart paddingAngle="2" data={pizzaMaterial} />;
};

export default Pizza;
