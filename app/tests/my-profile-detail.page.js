import { Selector } from 'testcafe';

class MyProfileDetailPage {
  constructor() {
    this.pageId = '#my-profile-detail-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const myProfileDetailPage = new MyProfileDetailPage();
