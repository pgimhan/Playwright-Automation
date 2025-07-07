import {Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase{
        
    constructor(page: Page){
        super(page)
    }

    async formLayoutPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form layouts').click()
        await this.waitForNumberOfSeconds(2)
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal')
        await this.page.getByText('Toastr').click()
    }

    async toolTipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTiltle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTiltle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')

        if(expandedState == 'false'){
            await groupMenuItem.click()
        }
    }
}

