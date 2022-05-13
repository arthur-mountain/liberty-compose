const errorWrapper = (fn) => {
  return async (params) => {
    try {
      const data = await fn(params);

      return [data, null];
    } catch (error) {
      return [null, error];
    }
  }
};

export default function (fns) {
  return fns.reduce((acc, fn) => {
    return { ...acc, [fn.name]: errorWrapper(fn) }
  }, {}) as NotionApi.NotionType;
}