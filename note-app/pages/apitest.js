import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const allFoods = await prisma.posting.findMany();
    console.log(allFoods);
  }

export default function apitest() {
    console.log(Posting())
  return (
    <div>
      <h1>apitest</h1>
      {/* <p>{JSON.stringify(Posting())}</p> */}
    </div>
  );
}
