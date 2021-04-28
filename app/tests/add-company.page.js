import { Selector } from 'testcafe';

class AddCompanyPage {
  constructor() {
    this.pageId = '#add-company-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async fillForm(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#company-name', 'a');
    await testController.typeText('#company-location', 'a');
    await testController.typeText('#company-image', 'a');
    await testController.typeText('#company-description', 'a');
    await testController.typeText('#company-skills', 'a');
    await testController.click('#company-submit');
  }
}

export const addCompanyPage = new AddCompanyPage();
