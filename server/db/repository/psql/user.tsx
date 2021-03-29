import { ServerUser } from "../../../user-model";
import UserTable from "../../schemes/user";

const userRepository = () => {
  const updateOrCreateAndGet = (user: ServerUser) => {
    const where = { user_id: user.id };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { login, first_name, second_name, avatar, id: user_id } = user;
    const userToUpdate = {
      login,
      first_name,
      second_name,
      avatar,
      user_id,
    };

    return UserTable.findOne({ where }).then(foundedUser => {
      if (!foundedUser) {
        return UserTable.create(userToUpdate).then(item => item);
      }

      return foundedUser.update(userToUpdate);
    });
  };

  return {
    updateOrCreateAndGet,
  };
};

export { userRepository };
