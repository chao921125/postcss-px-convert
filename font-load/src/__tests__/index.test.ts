// @jest-environment jsdom
import checkFontLoaded from '../index';

describe('checkFontLoaded', () => {
  it('should resolve true if FontFaceSet API is not available', async () => {
    const originalDocument = global.document;
    // @ts-ignore
    global.document = undefined;
    await expect(checkFontLoaded('FakeFont')).resolves.toBe(true);
    global.document = originalDocument;
  });

  it('should resolve true if font is loaded', async () => {
    const mockFonts = {
      load: jest.fn().mockResolvedValue([{}]),
      check: jest.fn().mockReturnValue(true),
    };
    const originalDocument = global.document;
    // @ts-ignore
    global.document = { fonts: mockFonts };
    await expect(checkFontLoaded('FakeFont')).resolves.toBe(true);
    global.document = originalDocument;
  });

  it('should resolve false if timeout', async () => {
    const mockFonts = {
      load: jest.fn(() => new Promise(() => {})), // never resolves
      check: jest.fn().mockReturnValue(false),
    };
    const originalDocument = global.document;
    // @ts-ignore
    global.document = { fonts: mockFonts };
    await expect(checkFontLoaded('FakeFont', 10)).resolves.toBe(false);
    global.document = originalDocument;
  });
}); 