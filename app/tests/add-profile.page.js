import { Selector } from 'testcafe';

class AddProfilePage {
  constructor() {
    this.pageId = '#add-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async fillForm(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#profile-name', 'a');
    await testController.typeText('#profile-location', 'a');
    await testController.typeText('#profile-image', 'a');
    await testController.typeText('#profile-description', 'a');
    await testController.typeText('#profile-skills', 'a');
    await testController.click('#profile-submit');
  }
}

export const addProfilePage = new AddProfilePage();
