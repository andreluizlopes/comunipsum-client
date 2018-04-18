class UrlQueryHelper {

  static toParams(params) {
    return Object
      .keys(params)
      .map(k => {
        if (Array.isArray(params[k])) {
          return params[k]
            .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
            .join("&");
        }

        return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
      })
      .join("&");
  }
}

export default UrlQueryHelper;
