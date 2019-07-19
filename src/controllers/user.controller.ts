import { Request, Response } from 'express';
import {User} from "../entity/User";
import {getRepository} from "typeorm";

class UserController {
  private static users = [
    {
      id: 'aab6a7ff-49ec-4a0a-87af-7a18eaff7581',
      name: 'Pierre',
    },
    {
      id: 'db6ebcf3-fbda-4413-a380-e7085f70ea71',
      name: 'Paul',
    },
    {
      id: 'a4547b54-8519-49d5-8c4d-103fcf3adf4e',
      name: 'Jacques',
    },
  ];

  public static listAll = async (req: Request, res: Response) => {


    const userRepository = getRepository(User);

    let users: User[];

    try {
      users = await userRepository.find();
    } catch (error) {
      return res.status(401).send();
    }

    return res.json(users);
  };
}

export default UserController;
