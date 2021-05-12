import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    // await this.logout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoSearchProfilePage(testController) {
    await testController.click('#search-drop');
    await testController.click('#search1-nav');
  }

  async gotoSearchCompanyPage(testController) {
    await testController.click('#search-drop');
    await testController.click('#search2-nav');
  }

  async gotoSearchSkillsPage(testController) {
    await testController.click('#search-drop');
    await testController.click('#search3-nav');
  }

  async gotoProfilesPage(testController) {
    await testController.click('#list-drop');
    await testController.click('#list-nav');
  }

  async gotoCompaniesPage(testController) {
    await testController.click('#list-drop');
    await testController.click('#list2-nav');
  }

  async gotoHomePage(testController) {
    await testController.click('#home-nav');
  }

  async gotoAddProfilePage(testController) {
    await testController.click('#admin-list-drop');
    await testController.click('#add-nav');
  }

  async gotoAddCompanyPage(testController) {
    await testController.click('#admin-list-drop');
    await testController.click('#add2-nav');
  }

  async gotoAddInitialPage(testController) {
    await testController.click('#login-dropdown');
    await testController.click('#add-init');
  }

  async gotoEditProfilePage(testController) {
    await testController.click('#edit-profile');
  }

  async gotoEditCompanyPage(testController) {
    await testController.click('#edit-company');
  }

  async gotoCompanyDetailPage(testController) {
    await testController.click('#home-nav');
    await testController.click('#click-me-company');
  }

  async gotoProfileDetailPage(testController) {
    await testController.click('#home-nav');
    await testController.click('#click-me-profile');
  }

  async gotoMyCompanyDetailPage(testController) {
    await testController.click('#navbar-current-user');
    await testController.click('#my-company-detail');
  }

  async gotoMyProfileDetailPage(testController) {
    await testController.click('#navbar-current-user');
    await testController.click('#my-profile-detail');
  }

}

export const navBar = new NavBar();
