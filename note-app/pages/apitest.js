import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStaticProps() {
  const posting = await prisma.posting.findMany();

  return {
    props: {
      posting: JSON.parse(JSON.stringify(posting)),
    },
  };
}

// export async function add() {
//   try {
//     const res = await prisma.user.createMany({
//       data: {
//         title: "elsa@prisma.io",
//         content: "Elsa Prisma! Elsa Prisma! Elsa Prisma!",
//       },
//     });

//     console.log("Created a user sucessfully", res);
//   } catch (err) {
//     console.log("Create a user Error:", err);
//   } finally {
//     async () => {
//       await prisma.$disconnect();
//     };
//   }
// }

export default function apitest({ posting }) {
  console.log(JSON.stringify(posting, null, 5));

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
        defaultValue={JSON.stringify(posting, null, 5)}
        rows="70"
        cols="140"
      />
    </div>
  );
}
