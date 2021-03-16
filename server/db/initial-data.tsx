import SiteTheme from "./schemes/site-theme";

const createSiteThemes = async () => {
  await SiteTheme.findOrCreate({
    where: {
      theme: "dark",
    },
    defaults: {
      description: "dark theme",
      deleted: false,
    },
  });
  await SiteTheme.findOrCreate({
    where: {
      theme: "light",
    },
    defaults: {
      description: "light theme",
      deleted: false,
    },
  });
};

export { createSiteThemes };
