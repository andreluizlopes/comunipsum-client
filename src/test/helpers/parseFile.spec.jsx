import Papa from 'papaparse';

describe('Helpers parseFile', () => {
  it('papaparse', () => {
    spyOn(Papa, "parse");
    Papa.parse("file");
    expect(Papa.parse).toHaveBeenCalled();
    expect(Papa.parse).toHaveBeenCalledWith("file");
  });
});