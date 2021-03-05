import SiteThemeTable from "../../schemes/site-theme";
import UserThemeTable from "../../schemes/user-theme";

const userThemeRepository = () => {
  const getByUserId = (userId: number) => {
    return UserThemeTable.findOne({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: SiteThemeTable,
        },
      ],
    });
  };
  const updateByUserId = (userId: number, themeId: number) => {
    return UserThemeTable.findOrCreate({
      where: {
        user_id: userId,
      },
      defaults: {
        theme_id: themeId,
      },
    }).then(([row, created]) => {
      if (created) {
        return [1, [row]];
      }
      return UserThemeTable.update(
        { theme_id: themeId },
        {
          where: {
            user_id: userId,
          },
        },
      );
    });
  };

  return {
    getByUserId,
    updateByUserId,
  };
};

export { userThemeRepository };
