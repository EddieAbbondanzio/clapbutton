export class Service {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getClaps(url) {
    return 1338;
  }

  clap(url, claps) {
    console.log('sending claps!', claps);
  }
}
