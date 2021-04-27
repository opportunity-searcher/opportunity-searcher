import { Selector } from 'testcafe';

class ListProfilesPage {
  constructor() {
    this.pageId = '#list-profiles-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const listProfilesPage = new ListProfilesPage();
