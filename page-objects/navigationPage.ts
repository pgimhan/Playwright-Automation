import {Page} from '@playwright/test'

export class NavigationPage{

    readonly page:Page

    constructor(page: Page){
        this.page = page
    }

    async formLayoutPage(){
        await this.page.getByText('forms').click()
        await this.page.getByText('form layouts').click()
    }
}