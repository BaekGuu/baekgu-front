import router from "@/router";

export const reload = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      router.go(0);
      resolve();
    }, 1200);
  });
};
