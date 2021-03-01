type Cookies = Record<string, string>;
type CookieOptions = {
  expires?: Date;
  "max-age"?: number;
  days?: number;
};

const clientCookieManager = () => {
  const getAll = (): Cookies => {
    const pairs = document.cookie.split(";");
    const cookies: Cookies = {};

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      cookies[`${pair[0]}`.trim()] = decodeURIComponent(pair[1]);
    }

    return cookies;
  };

  const get = (name: string) => {
    const cookies = getAll();
    return cookies[name];
  };

  const set = (name: string, value = "", options: CookieOptions = {}) => {
    const cookieSet = [`${name}=${value}`, "path=/"];
    if (options["max-age"] !== undefined) {
      cookieSet.push(`max-age=${options["max-age"]}`);
    }
    if (options.expires !== undefined) {
      cookieSet.push(`expires=${options.expires.toUTCString()}`);
    } else {
      const date = new Date();
      date.setTime(date.getTime() + (options.days || 7) * 24 * 60 * 60 * 1000);
      cookieSet.push(`expires=${date.toUTCString()}`);
    }
    const chunks = cookieSet.join("; ");
    document.cookie = chunks;
  };

  const del = (name: string) => {
    set(name, "", {
      "max-age": -1,
    });
  };

  return { getAll, get, set, del };
};

export { clientCookieManager, Cookies };
