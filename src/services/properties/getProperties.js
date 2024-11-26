import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
  const prisma = new PrismaClient();

  const numericPrice = pricePerNight ? parseFloat(pricePerNight) : undefined;

  if (pricePerNight && isNaN(numericPrice)) {
    throw new Error("pricePerNight must be a valid number.");
  }

  const properties = await prisma.property.findMany({
    where: {
      ...(location && { location: { contains: location } }),
      ...(numericPrice !== undefined && {
        pricePerNight: { equals: numericPrice },
      }),
    },
  });

  return properties;
};

export default getProperties;
