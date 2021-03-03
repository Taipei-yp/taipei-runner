const themeService = () => {
  const getAll = () => {
    return [];
  };
  const getUserTheme = (userId: number) => {
    return { userId };
  };
  return { getAll, getUserTheme };
};
export { themeService };
