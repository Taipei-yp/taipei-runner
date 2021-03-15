const environment = {
  title: "Taipei runner",
  description: "Pixel runner",
  apiUrl: "https://ya-praktikum.tech/api/v2",
  uploadsUrl: "https://ya-praktikum.tech",
  localApiUrl:
    process.env.NODE_ENV !== "production"
      ? "https://local.ya-praktikum.tech:4000/api"
      : "https://taipei-runner-02.ya-praktikum.tech/api",
};

export { environment };
