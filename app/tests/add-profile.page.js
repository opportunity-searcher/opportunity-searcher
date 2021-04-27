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
}

export const addProfilePage = new AddProfilePage();
