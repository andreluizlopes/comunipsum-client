import UrlQueryHelper from '../../helpers/urlQuery';

describe('Helpers UrlQuery', () => {
  it('UrlQueryHelper', () => {
    const data = UrlQueryHelper.toParams({sku: "1234", cor: "Azul"});
    expect(data).toEqual('sku=1234&cor=Azul');
  });
});