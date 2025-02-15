import {test,expect} from '@playwright/test'

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
    await page.getByText('forms').click()
    await page.getByText('form layouts').click()
})

test('locator syntax rules',async ({page})=>{
    // by tag
    await page.locator('input').first().click()

    // by id
    page.locator('#inputEmail1')

    // by class value
    page.locator('.size-medium')

    // by attribute
    page.locator('[type="email"]')

    // by class value full
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selector
    page.locator('input[type="email"][nbinput]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})


test('user facing locators', async ({page})=>{
    await page.getByLabel('Email').first().fill('test123@gmail.com')
    await page.getByLabel('password').first().fill('1234')
    await page.getByRole('button',{name:'Sign in'}).first().click()
})


test('locating child element',async ({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card nb-checkbox :text-is("Check me out")').click()
    await page.locator('nb-card').getByPlaceholder('Message').fill('hello user')
})


test('locating parent element',async ({page})=>{
    await page.locator('nb-card', {hasText:'Block form'}).getByPlaceholder('website').fill('google')
    await page.locator('nb-card', {has:page.locator('#inputEmail1')}).getByLabel('Email').fill('test123@getMaxListeners.com')

    await page.locator('nb-card').filter({hasText:'Block form'}).getByPlaceholder('website').click()
    await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByLabel('Email').click()

    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'})
        .getByRole('textbox',{name:'Email'}).click()
})


test('Reusing the locators',async({page})=>{
    const basicForm = page.locator('nb-card',{hasText:'Basic Form'})
    const emailField = basicForm.getByRole('textbox',{name:'Email'})

    await emailField.fill('adam123@gmail.com')
    await basicForm.getByRole('textbox',{name:'password'}).fill('123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()  // there is only one submit button

    await expect(emailField).toHaveValue('adam123@gmail.com')
})


test('extracting values',async({page})=>{
    //single text value
    const basicForm = page.locator('nb-card',{hasText:'Basic Form'})
    const buttontext = await basicForm.locator('button').textContent()
    expect(buttontext).toEqual('Submit')

    //all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain('Option 1')

    //input values
    const emailField = basicForm.getByRole('textbox', {name:'Email'})
    await emailField.fill('hello123@gmail.com')
    const emailInputValue = await emailField.inputValue()
    expect(emailInputValue).toEqual('hello123@gmail.com')
})


test('assertions',async({page})=>{

    const basicFormButton = page.locator('nb-card', {hasText:'basic form'}).locator('button')

    //Genaral assertions
    const value = 10
    expect(value).toEqual(10)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertions
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertions
    await expect.soft(basicFormButton).toHaveText('Submit3')
    await basicFormButton.click()
})

