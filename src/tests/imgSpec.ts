import { resize } from '../utilities/img';
import fs from 'fs';

describe('Testing resize function', () => {
    it('should return true', async () => {
        await resize('fjord', 200, 200);
        expect(fs.existsSync('res/fjord200x200.jpg')).toBe(true);
        fs.promises.unlink('res/fjord200x200.jpg');
    });
    it('should throw error', async () => {
        let flag = false;
        await resize('balmtunnel', 700, 500).catch(() => {
            flag = true;
        });
        expect(flag).toBe(true);
    });
});
