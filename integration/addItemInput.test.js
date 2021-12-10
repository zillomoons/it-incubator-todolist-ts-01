
describe('addItemInput', ()=>{
    it('base example, visually looks correct', async () => {

        // await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additeminput--add-item-input-example&args=&globals=backgrounds.grid:false&viewMode=story')
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
})