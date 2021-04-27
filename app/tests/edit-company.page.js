import { Selector } from 'testcafe';

class EditCompanyPage {
  constructor() {
    this.pageId = '#edit-company-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const editCompanyPage = new EditCompanyPage();
