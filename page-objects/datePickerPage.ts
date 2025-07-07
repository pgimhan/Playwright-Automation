import { Page, expect } from '@playwright/test'
import { PageManager } from './pageManager'
import { HelperBase } from './helperBase'

export class DatePickerPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {

        const calanderInput = this.page.getByPlaceholder('Form Picker')
        await calanderInput.click()
        const dateToAssert = await this.selectDateInTheCalander(numberOfDaysFromToday)
        await expect(calanderInput).toHaveValue(dateToAssert)

    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calanderInput = this.page.getByPlaceholder('Range Picker')
        await calanderInput.click()
        const dateToAssertStart = await this.selectDateInTheCalander(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalander(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calanderInput).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalander(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calanderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while (!calanderMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calanderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return dateToAssert
    }

}