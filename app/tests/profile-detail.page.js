import { Selector } from 'testcafe';

class ProfileDetailPage {
  constructor() {
    this.pageId = '#profile-detail-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const profileDetailPage = new ProfileDetailPage();
