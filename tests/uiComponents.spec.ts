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

    test('Radio Button',async ({page})=>{
        const usingTheGridFrom = page.locator('nb-card',{hasText:'using the grid'})
        // await usingTheGridFrom.getByLabel('option 1').check({force:true})
        await usingTheGridFrom.getByRole('radio',{name:'option 1'}).check({force:true})

        const radioStatus = await usingTheGridFrom.getByRole('radio',{name:'option 1'}).isChecked()
        expect(radioStatus).toBeTruthy()

        await expect(usingTheGridFrom.getByRole('radio',{name:'option 1'})).toBeChecked()

        //-----
        await usingTheGridFrom.getByRole('radio',{name:'option 2'}).check({force:true})
        expect (await usingTheGridFrom.getByRole('radio',{name:'option 1'}).isChecked()).toBeFalsy()
        expect (await usingTheGridFrom.getByRole('radio',{name:'option 2'}).isChecked()).toBeTruthy()
    })
    
})

test('checkboxes',async ({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click() 
    await page.getByRole('checkbox',{name:'Hide on click'}).uncheck({force:true})
    await page.getByRole('checkbox',{name:'Prevent arising of duplicate toast'}).check({force:true})

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force:true})
        expect(await box.isChecked()).toBeTruthy()
    }
})