import { Selector } from 'testcafe';

class AddInitialPage {
  constructor() {
    this.pageId = '#add-initial-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async fillForm(testController) {
    await this.isDisplayed(testController);
    await testController.click('#initial-radio', 'company');
    await testController.typeText('#initial-name', 'a');
    await testController.typeText('#initial-location', 'a');
    await testController.typeText('#initial-image', 'a');
    await testController.typeText('#initial-description', 'a');
    await testController.typeText('#initial-skills', 'a');
    await testController.click('#initial-submit');
  }
}

export const addInitialPage = new AddInitialPage();
