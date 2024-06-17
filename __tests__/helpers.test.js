const { formatDate, formatTime } = require("../src/utils/helpers");

describe('formatDate', () => {
    test('should return date string in dd month yyyy format', () => {
        const input = "2020-11-22T11:13:00.000Z"
        expect(formatDate(input)).toBe('22 November 2020')
    });
});

describe('formatTime', () => {
    test('should format date string to return the time', () => {
        const input = "2020-11-22T11:13:00.000Z"
        expect(formatTime(input)).toBe('11:13 am');
    });
});