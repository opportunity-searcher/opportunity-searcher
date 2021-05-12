import { Selector } from 'testcafe';

class CompanyDetailPage {
  constructor() {
    this.pageId = '#company-detail-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const companyDetailPage = new CompanyDetailPage();
