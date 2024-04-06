import { rest } from "msw";

const baseURL = "https://mixing-potions-drf-api-0a8cbdf11dd2.herokuapp.com/";

const userEndpointHandler = rest.get(
  `${baseURL}dj-rest-auth/user/`,
  (req, res, ctx) => {
    const userResponse = {
      pk: 2,
      username: "test",
      email: "",
      first_name: "",
      last_name: "",
      profile_id: 2,
      profile_image:
        "https://res.cloudinary.com/dgcwnjoh4/image/upload/v1/experienced_vmfnxw",
    };
    return res(ctx.json(userResponse));
  }
);

const logoutEndpointHandler = rest.post(
  `${baseURL}dj-rest-auth/logout/`,
  (req, res, ctx) => {
    return res(ctx.status(200));
  }
);

export const handlers = [userEndpointHandler, logoutEndpointHandler];
