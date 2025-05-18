import {test,expect} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutPage'

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
})

test('Navigate to form page', async({page})=>{
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.toolTipPage()
})

test('parameterized methods',async({page})=>{
    const navigateTo = new NavigationPage(page)
    const onformLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutPage()
    await onformLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('abc123@gmail.com','test123','option 2')

    await onformLayoutsPage.submitInlineFormWithNameEmailAndChecbox('Jack','jack123@gmail.com',false)
    
})