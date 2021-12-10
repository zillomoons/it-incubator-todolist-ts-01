const {toMatchImageSnapshot} = require("jest-image-snapshot");
describe('spanWithEditMode', ()=>{
    it('base example, visually looks correct', async () => {

        // await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:9009/iframe.html?id=todolist-spanwitheditmode--span-with-edit-mode-example&args=&viewMode=story')
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
})