import { StudentInfoPage } from './app.po';

describe('student-info App', () => {
  let page: StudentInfoPage;

  beforeEach(() => {
    page = new StudentInfoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
