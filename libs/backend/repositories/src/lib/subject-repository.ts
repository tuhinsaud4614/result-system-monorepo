import { prismaClient } from "@result-system/backend/utility";
import { IDParams } from "@result-system/shared/utility";

export default class SubjectRepository {
  /**
   * This function deletes all active subjects in a classroom if they have no examinations.
   * @param classRoomId - The ID of the classroom for which we want to delete active subjects if there
   * are no examinations associated with them.
   * @returns a promise that resolves to the result of deleting all active subjects that belong to a
   * specific classroom and have no associated examinations in the Prisma database.
   */
  static deleteActiveSubjectsIfNoExaminations(classRoomId: IDParams["id"]) {
    return prismaClient.subject.deleteMany({
      where: { classRoomId, status: "ACTIVE", examinations: { none: {} } },
    });
  }
}
