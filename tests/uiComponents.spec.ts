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

test('list and dropdown', async ({page})=>{
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list')  //when the list has a UL tag    
    page.getByRole('listitem') //when the list has LI tag

    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light','Dark','Cosmic','Corporate'])

    await optionList.filter({hasText:'Cosmic'}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color','rgb(50, 50, 89)')


    const colors ={
        'Light': 'rgb(255, 255, 255)',
        'Dark' : 'rgb(25, 32, 56)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Coperate': 'rgb(255, 255, 255)'
    }

    await dropDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText:color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != 'Coperate')
            await dropDownMenu.click()

    }

    // for in use beacuse of object array
})

test('tooltip',async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()
    const tooltipCard = page.locator('nb-card',{hasText:'Tooltip Placements'})

    await tooltipCard.getByRole('button',{name:'TOP'}).hover()

    page.getByRole('tooltip') // if you have a role for tooltip

    const toolTip = await page.locator('nb-tooltip').textContent()
    expect(toolTip).toEqual('This is a tooltip')

})