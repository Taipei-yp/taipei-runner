const environment = {
  title: "Taipei runner",
  description: "Pixel runner",
  apiUrl: "https://ya-praktikum.tech/api/v2",
  uploadsUrl: "https://ya-praktikum.tech",
  localApiUrl:
    process.env.API_HOST || "https://local.ya-praktikum.tech:4000/api",
};

export { environment };
