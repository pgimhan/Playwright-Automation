import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{

    constructor(page:Page){
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email:string, password:string, optionText:string){
        const usingTheGridFrom = this.page.locator('nb-card',{hasText:'using the grid'})
        await usingTheGridFrom.getByRole('textbox',{name:'Email'}).fill(email)
        await usingTheGridFrom.getByRole('textbox',{name:'password'}).fill(password)
        await usingTheGridFrom.getByRole('radio',{name:optionText}).check({force:true})
        await usingTheGridFrom.getByRole('button',{name:'Sign in'}).click()
    }


    /**
     * This methode fill out inline form with name and email
     * @param name should be first and last name
     * @param email should be valid email for test user
     * @param rememberMe true or false 
     */
    async submitInlineFormWithNameEmailAndChecbox(name:string, email:string, rememberMe:boolean){
        const inlineForm = this.page.locator('nb-card',{hasText:'Inline form'})
        await inlineForm.getByRole('textbox',{name:'Jane Doe'}).fill(name)
        await inlineForm.getByRole('textbox',{name:'Email'}).fill(email)
        if(rememberMe){
            await inlineForm.getByRole("checkbox").check({force:true})
        }
        await inlineForm.getByRole('button',{name:'submit'}).click()
    }
}