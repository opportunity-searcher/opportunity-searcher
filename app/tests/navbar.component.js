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
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoSearchPage(testController) {
    await testController.click('#search-nav');
  }

  async gotoProfilesPage(testController) {
    await testController.click('#list-nav');
  }

  async gotoCompaniesPage(testController) {
    await testController.click('#list2-nav');
  }

  async gotoHomePage(testController) {
    await testController.click('#home-nav');
  }

  async gotoAddProfilePage(testController) {
    await testController.click('#add-nav');
  }

  async gotoAddCompanyPage(testController) {
    await testController.click('#add2-nav');
  }

  async gotoEditProfilePage(testController) {
    await testController.click('#edit-nav');
  }

  async gotoEditCompanyPage(testController) {
    await testController.click('#edit2-nav');
  }

}

export const navBar = new NavBar();
