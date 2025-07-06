import {test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
})

test('Navigate to form page', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().toolTipPage()
})

test('parameterized methods',async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('abc123@gmail.com','test123','option 2')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndChecbox('Jack','jack123@gmail.com',false)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(2)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(5,10)
    
})