import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function Exp() {
  const req = async function () {
    const response = await axios({
      method: "post",
      url: "http://localhost:5500/",
      data: {
        name: "Max",
        age: 24,
        grades: [54, 90, 60, 55],
        faculty: "FOE",
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    console.log(response);
  };
  return <Button onClick={req}>Click me</Button>;
}
