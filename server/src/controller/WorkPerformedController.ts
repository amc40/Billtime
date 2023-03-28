import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { WorkPerformed } from "../entity/WorkPerformed";

export class WorkPerformedController {
  private workPerformedRepository = AppDataSource.getRepository(WorkPerformed);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.workPerformedRepository.find({
      relations: {
        staff: true,
        client: {
            companyClient: true
        },
        workType: true,
      },
    });
  }

  // async one(request: Request, response: Response, next: NextFunction) {
  //     const id = parseInt(request.params.id)

  //     const user = await this.workPerformedRepository.findOne({
  //         where: { id }
  //     })

  //     if (!user) {
  //         return "unregistered user"
  //     }
  //     return user
  // }

  // async save(request: Request, response: Response, next: NextFunction) {
  //     const { firstName, lastName, age } = request.body;

  //     const user = Object.assign(new User(), {
  //         firstName,
  //         lastName,
  //         age
  //     })

  //     return this.workPerformedRepository.save(user)
  // }

  // async remove(request: Request, response: Response, next: NextFunction) {
  //     const id = parseInt(request.params.id)

  //     let userToRemove = await this.workPerformedRepository.findOneBy({ id })

  //     if (!userToRemove) {
  //         return "this user not exist"
  //     }

  //     await this.workPerformedRepository.remove(userToRemove)

  //     return "user has been removed"
  // }
}
