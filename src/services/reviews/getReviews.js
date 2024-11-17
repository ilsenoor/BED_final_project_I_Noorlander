import { PrismaClient } from "@prisma/client";

const getReviews = async (name) => {
  const prisma = new PrismaClient();

  return prisma.review.findMany();
};

export default getReviews;
