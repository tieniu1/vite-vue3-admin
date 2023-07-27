// 获取assets静态图片
export const getAssetsImg = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
