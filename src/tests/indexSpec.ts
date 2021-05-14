import app from '../index';
import supertest from 'supertest';
import fs from 'fs';

const test = supertest(app);

describe('Testing endpoint', () => {
    describe('without optional parameters', () => {
        it('checks response type', async () => {
            const res = await test.get('/resize?fileName=encenadaport');
            expect(res.type).toBe('image/jpeg');
            fs.promises.unlink('res/encenadaport200x200.jpg');
        });
        it('checks if file was made', async () => {
            await test.get('/resize?fileName=fjord');
            expect(fs.existsSync('res/fjord200x200.jpg')).toBe(true);
            fs.promises.unlink('res/fjord200x200.jpg');
        });
    });
    describe('with optional parameters', () => {
        it('checks response type', async () => {
            const res = await test.get(
                '/resize?fileName=icelandwaterfall&width=1000&height=800'
            );
            expect(res.type).toBe('image/jpeg');
            fs.promises.unlink('res/icelandwaterfall1000x800.jpg');
        });
        it('checks if file was made', async () => {
            await test.get('/resize?fileName=palmtunnel&width=400&height=400');
            expect(fs.existsSync('res/palmtunnel400x400.jpg')).toBe(true);
            fs.promises.unlink('res/palmtunnel400x400.jpg');
        });
    });
    describe('expected errors', () => {
        it('no fileName', async () => {
            const res = await test.get('/resize');
            expect(res.text).toBe(
                'Please enter the name of the image file to resize using fileName key in the URL query'
            );
        });
        describe('invalid fileName', () => {
            it('without optional parameters', async () => {
                const res = await test.get('/resize?fileName=santamonisha');
                expect(res.text).toBe(
                    'No file by this name. .jpg extension is automatically added, no need to add it to the fileName.'
                );
            });
            it('with optional parameters', async () => {
                const res = await test.get(
                    '/resize?fileName=echidnaport&width=600&height=400'
                );
                expect(res.text).toBe(
                    'No file by this name. .jpg extension is automatically added, no need to add it to the fileName.'
                );
            });
        });
        describe('array fileName', () => {
            it('checks for response text', async () => {
                const res = await test.get(
                    '/resize?fileName=fjord&fileName=icelandwaterfall'
                );
                expect(res.text).toBe(
                    'No file by this name. .jpg extension is automatically added, no need to add it to the fileName.'
                );
            });
            describe('checks if files were made', () => {
                it('first file', async () => {
                    await test.get(
                        '/resize?fileName=palmtunnel&fileName=santamonica'
                    );
                    expect(fs.existsSync('res/palmtunnel200x200.jpg')).toBe(
                        false
                    );
                });
                it('second file', async () => {
                    await test.get(
                        '/resize?fileName=encenadaport&fileName=fjord'
                    );
                    expect(fs.existsSync('res/fjord200x200.jpg')).toBe(false);
                });
            });
        });
        it('non-numeric parameters', async () => {
            const res = await test.get(
                '/resize?fileName=icelandwaterfall&height=abc'
            );
            expect(res.text).toBe(
                'Height and width keys in the URL query must either be numeric or undefined'
            );
        });
    });
});
