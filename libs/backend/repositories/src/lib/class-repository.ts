import { ClassRoom, Prisma } from "@prisma/client";

import { prismaClient } from "@result-system/backend/utility";
import {
  CreateClassInput,
  IDParams,
  ResultWithOffset,
} from "@result-system/shared/utility";

export default class ClassRepository {
  /**
   * This function returns the count of classes based on the given condition using Prisma.
   * @param [condition] - The `condition` parameter is an optional argument of type
   * `Prisma.ClassCountArgs`. It is used to specify any filtering or aggregation conditions to be
   * applied when counting the number of `Class` records in the database. This parameter can
   * include various options such as `where`, `orderBy`,
   * @returns The `count` method is returning the result of calling the `count` method on the
   * `class` property of the `prismaClient` object, with an optional `condition` argument. The
   * `count` method returns the number of `Class` records that match the specified condition.
   */
  static count(condition?: Prisma.ClassRoomCountArgs) {
    return prismaClient.classRoom.count(condition);
  }

  /**
   * This function retrieves multiple classes from the database based on an optional condition.
   * @param [condition] - The `condition` parameter is an optional argument of type
   * `Prisma.ClassRoomFindManyArgs`. It is used to specify additional filters, sorting, and pagination
   * options when querying the `classRoom` table using the Prisma client. If no `condition` argument is
   * provided, all records in the
   * @returns The function `getClasses` is returning a Promise that resolves to an array of `ClassRoom`
   * objects. The `condition` parameter is an optional argument that can be used to filter the results
   * of the query performed by `prismaClient.classRoom.findMany()`.
   */
  static getClasses(
    condition?: Prisma.ClassRoomFindManyArgs,
  ): Promise<ClassRoom[]> {
    return prismaClient.classRoom.findMany({ ...condition });
  }

  /**
   * This function retrieves a list of classes with pagination and returns the result with offset.
   * @param {number} count - The total number of ClassRoom objects that match the given query criteria.
   * @param {number} [page] - The page parameter is used to specify which page of results to retrieve
   * when paginating through a larger set of data. It is an optional parameter that is used in
   * conjunction with the limit parameter to determine how many results to skip and how many to return.
   * @param {number} [limit] - The maximum number of items to return in a single page of results.
   * @param [args] - args is an optional parameter of type Prisma.ClassRoomFindManyArgs. It is used to
   * pass additional filtering, sorting, and pagination options to the Prisma query.
   * @returns The function `getClassesWithOffset` returns a Promise that resolves to an object of type
   * `ResultWithOffset<ClassRoom>`. This object contains the `data` property which is an array of
   * `ClassRoom` objects, the `total` property which is the total count of `ClassRoom` objects, and the
   * `pageInfo` property which is an object containing information about the pagination such as
   */
  static async getClassesWithOffset(
    count: number,
    page?: number,
    limit?: number,
    args?: Prisma.ClassRoomFindManyArgs,
  ): Promise<ResultWithOffset<ClassRoom>> {
    if (limit && page) {
      const result = await prismaClient.classRoom.findMany({
        ...args,
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        data: result,
        total: count,
        pageInfo: {
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        },
      };
    }

    const result = await this.getClasses({ ...args });
    return { data: result, total: count };
  }

  /**
   * This function retrieves a class by its ID and an optional condition using Prisma.
   * @param id - The ID of the class that we want to retrieve from the database.
   * @param [condition] - The `condition` parameter is an optional argument of type
   * `Omit<Prisma.ClassRoomWhereInput, "id">`. It is used to specify additional conditions to filter
   * the `ClassRoom` object that is being retrieved from the database. The `Omit` utility type is used
   * to exclude
   * @returns This function returns a Promise that resolves to a single `ClassRoom` object or `null`.
   * The `ClassRoom` object represents a class room record in a database and contains information such
   * as the class room's ID, name, capacity, and other attributes. The function takes an `id` parameter
   * which is used to find the class room record in the database, and an optional `condition` parameter
   */
  static getClassById(
    id: IDParams["id"],
    condition?: Omit<Prisma.ClassRoomWhereInput, "id">,
  ): Promise<ClassRoom | null> {
    return prismaClient.classRoom.findFirst({
      where: {
        id,
        ...condition,
      },
    });
  }

  /**
   * This function creates a new class in the Prisma database using the provided input data.
   * @param {CreateClassInput} inputs - The `inputs` parameter is an object that contains the data
   * needed to create a new class in the database. It likely includes properties such as the class
   * name, the teacher's name, the class schedule, and any other relevant information.
   * @returns The `create` method is returning the result of calling the `create` method of the
   * `classRoom` model of the Prisma client, passing in an object with a `data` property set to the
   * `inputs` parameter. The `create` method of the `classRoom` model creates a new class room record
   * in the database with the provided data and returns the created record. Therefore,
   */
  static create(inputs: CreateClassInput) {
    return prismaClient.classRoom.create({ data: inputs });
  }
}
