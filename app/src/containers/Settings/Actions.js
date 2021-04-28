export const moveToUserUpdateSettingScreenAction = (
  path,
  navigation,
  title,
) => {
  return navigation.navigate(path, {title: title});
};
