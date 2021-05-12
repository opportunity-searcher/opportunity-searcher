import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { searchProfilePage } from './search-profile.page';
import { listProfilesPage } from './list-profiles.page';
import { listCompaniesPage } from './list-companies.page';
import { homePage } from './home.page';
import { addCompanyPage } from './add-company.page';
import { addProfilePage } from './add-profile.page';
// import { addInitialPage } from './add-initial.page';
import { companyDetailPage } from './company-detail.page';
// import { signupPage } from './signup.page';
import { myCompanyDetailPage } from './my-company-detail.page';
import { myProfileDetailPage } from './my-profile-detail.page';
import { editProfilePage } from './edit-profile.page';
import { editCompanyPage } from './edit-company.page';
import { profileDetailPage } from './profile-detail.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const companyCredentials = { username: 'greg@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
// `const newCredentials = { username: 'hi@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Search Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSearchProfilePage(testController);
  await searchProfilePage.isDisplayed(testController);
});

test('Test the List Profiles page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilesPage(testController);
  await listProfilesPage.isDisplayed(testController);
});

test('Test the List Companies page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCompaniesPage(testController);
  await listCompaniesPage.isDisplayed(testController);
});

test('Test the home page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoHomePage(testController);
  await homePage.isDisplayed(testController);
});

test('Test the Add Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAddProfilePage(testController);
  await addProfilePage.isDisplayed(testController);
  await addProfilePage.fillForm(testController);
});

test('Test the Add Company page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, credentials.password);
  await navBar.gotoAddCompanyPage(testController);
  await addCompanyPage.isDisplayed(testController);
  await addCompanyPage.fillForm(testController);
});

/* test('Test the Add Initial page', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, newCredentials.username, credentials.password);
  // await navBar.gotoAddInitialPage(testController);
  await addInitialPage.isDisplayed(testController);
  await addInitialPage.fillForm(testController);
}); */

test('Test the Company Detail page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCompanyDetailPage(testController);
  await companyDetailPage.isDisplayed(testController);
});

test('Test the Profile Detail page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfileDetailPage(testController);
  await profileDetailPage.isDisplayed(testController);
});

test('Test the My Company Detail page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, companyCredentials.username, credentials.password);
  await navBar.gotoMyCompanyDetailPage(testController);
  await myCompanyDetailPage.isDisplayed(testController);
});

test('Test the My Profile Detail page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyProfileDetailPage(testController);
  await myProfileDetailPage.isDisplayed(testController);
});

test('Test the Edit Company page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, companyCredentials.username, credentials.password);
  await navBar.gotoMyCompanyDetailPage(testController);
  await navBar.gotoEditCompanyPage(testController);
  await editCompanyPage.isDisplayed(testController);
});

test('Test the Edit Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyProfileDetailPage(testController);
  await navBar.gotoEditProfilePage(testController);
  await editProfilePage.isDisplayed(testController);
});
