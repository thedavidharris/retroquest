import { browser, by, element, ElementFinder } from 'protractor';
import { CreatePage } from '../create/create.po';

export class TeamPage {
  private createPage = new CreatePage();

  loginToBoard(boardName: string) {
    return new Promise<{ id, name }>((resolve) => {
      this.createPage.navigateTo().then(() => {
        this.createPage.createBoard(boardName).then(() => {
          browser.driver.getCurrentUrl().then((url: string) => {
            const boardId = boardName.replace(' ', '-');
            if (url.includes(`/team/${boardId}`)) {
              resolve({ id: boardId, name: boardName });
            } else {
              resolve();
            }
          });
        });
      });
    });
  }

  loginToRandomBoard(boardName: string = '') {
    return this.loginToBoard(boardName + new Date().getTime());
  }

  navigateTo(teamId) {
    return browser.get(`/team/${teamId}`);
  }

  teamName() {
    return element(by.id('teamName'));
  }

  feedbackButton() {
    return element(by.id('giveFeedback'));
  }
}
