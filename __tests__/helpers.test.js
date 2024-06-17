const { formatDate } = require("../src/utils/helpers");
// import { formatDate } from "../src/utils/helpers"

describe('formatDate', () => {
    test('should return date string in dd month yyyy format', () => {
        const input = "2020-11-22T11:13:00.000Z"
        expect(formatDate(input)).toBe('22 November 2020')
    });
});