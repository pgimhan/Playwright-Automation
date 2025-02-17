import {test,expect} from '@playwright/test'

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
})

test.describe('Form layouts page',()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('forms').click()
        await page.getByText('form layouts').click()
    })

    test('input fields',async({page})=>{
        const usingTheGridEmailInput = page.locator('nb-card',{hasText:'using the grid'}).getByRole('textbox',{name:'Email'})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test5.com',{delay:500})

        // general assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test5.com')

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test5.com')
    })
    
})