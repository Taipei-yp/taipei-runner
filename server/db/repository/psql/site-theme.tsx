import SiteThemeTable from "../../schemes/site-theme";

const siteThemeRepository = () => {
  const addTheme = (data: { theme: string; description: string }) => {
    const theme = new SiteThemeTable({ deleted: false, ...data });
    return theme.save();
  };
  const editTheme = (
    id: number,
    data: { theme: string; description: string },
  ) => {
    return SiteThemeTable.update(data, { where: { id } });
  };
  const deleteTheme = (id: number) => {
    return SiteThemeTable.update({ deleted: true }, { where: { id } });
  };
  const getAll = () => {
    return SiteThemeTable.findAll({
      where: {
        deleted: false,
      },
    });
  };

  return {
    addTheme,
    editTheme,
    deleteTheme,
    getAll,
  };
};

export { siteThemeRepository };
