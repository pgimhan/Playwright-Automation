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

test('dialog box',async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog =>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr',{hasText:'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('web table',async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1 get the row by any text in this row
    const targetRow = page.getByRole('row',{name:'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').fill('21')
    await page.locator('.nb-checkmark').click()

    // 2 get the row based on the value in the specific column
    await page.locator('.ng2-smart-page-item').getByText('2').click()
    const targetRowByID = page.getByRole('row', {name:'11'}).filter({has:page.locator('td').nth(1).getByText('11')})
    await targetRowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('prabu123@gmail.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowByID.locator('td').nth(5)).toHaveText('prabu123@gmail.com')

    // 3 test filter of the table
    const ages = ["20","30","40","200"]

    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent()

            if(age=='200'){

            }else{
                expect(cellValue).toEqual(age)
            }

            
        }
        
    }
})