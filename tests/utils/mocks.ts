export const highlightsMock = {
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  clear: jest.fn(),
} as unknown as HighlightRegistry;

export const setRangeStartMock = jest.fn();
export const setRangeEndMock = jest.fn();

export const HighlightMock = jest.fn();

export const rangeMock = {
  setStart: jest.fn(),
  setEnd: jest.fn(),
};

export const RangeMock = jest.fn(() => rangeMock) as unknown as typeof Range;
