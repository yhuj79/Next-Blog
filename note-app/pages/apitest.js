import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export async function getData(){
  const { data } = await axios.get(
    "api/posting"
  );
  console.log("data loaded");
  console.log(data);
  return data;
};

export default function apitest() {
  console.log(JSON.stringify(getData(), null, 5));

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1>apitest</h1>
        <button
          onClick={() => add()}
          style={{ backgroundColor: "black", margin: "10px" }}
        >
          Add
        </button>
      </div>
      <textarea
        defaultValue={JSON.stringify(getData(), null, 5)}
        rows="70"
        cols="140"
      />
    </div>
  );
}
