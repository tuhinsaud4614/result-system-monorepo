import { Prisma } from "@prisma/client";

import { prismaClient } from "@result-system/backend/utility";
import { CreateClassInput } from "@result-system/shared/utility";

export default class ClassRepository {
  static #select = {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  } satisfies Prisma.ClassRoomSelect;

  static create(inputs: CreateClassInput) {
    return prismaClient.classRoom.create({ data: inputs });
  }
}
