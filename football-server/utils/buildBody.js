export const buildBody = (body) => {
  let bodyBuilded = {};
  Object.keys(body).forEach((key) => {
    bodyBuilded = { ...bodyBuilded, [key]: body[key] };
  });

  return bodyBuilded;
};