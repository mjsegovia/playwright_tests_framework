import { BasePage } from '@core/base/BasePage';
import {Page, Locator} from '@playwright/test';

export class CheckoutPage  extends BasePage{
    
 constructor(page: Page) {
    super(page);
    }
    
    async goto() {
        await this.page.goto('/checkout');
    }
       
    get checkoutTitle(): Locator {
        return this.page.getByTestId('shipping-address-heading'); 
    }

    get firstNameInput(): Locator {
        return this.page.getByRole('textbox', { name: 'First Name' });
    }

    get lastNameInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Last Name' });
    }

    get addressInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Address' });
    }

    get postalCodeInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Postal Code' });
    }

    get stateProvinceInput(): Locator {
        return this.page.getByRole('textbox', { name: 'State/Province' });
    }

    get submitButton(): Locator {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    async fillShippingInfo(details: { 
        firstName?: string; 
        lastName?: string;
        address?: string;
        postalCode?: string; 
        stateProvince?: string;}) 
        : Promise<void> {
        if (details.firstName) 
            await this.fill(this.firstNameInput, details.firstName, 'First Name Input');        
        if (details.lastName) 
            await this.fill(this.lastNameInput, details.lastName, 'Last Name Input');
        if(details.address)
            await this.fill(this.addressInput, details.address, 'Address Input');       
        if (details.postalCode) 
            await this.fill(this.postalCodeInput, details.postalCode, 'Postal Code Input');        
        if (details.stateProvince) 
            await this.fill(this.stateProvinceInput, details.stateProvince, 'State/Province Input');        
    }

    async submitShippingInfo(): Promise<void> {
        await Promise.all([
                    this.submitButton.waitFor({ state: 'visible' }),
                    this.click(this.submitButton, 'Submit Button'),                   
                ]);       //Alternatively, if the navigation is not guaranteed, we can just click the button without waiting for navigation
        //await   
                    this.click(this.submitButton, 'Submit Button');
    }

}
