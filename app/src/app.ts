import { App } from 'jovo-framework';
import { NlpjsNlu } from 'jovo-nlu-nlpjs';
import { WebPlatform } from 'jovo-platform-web';
import { ActionType } from 'jovo-platform-core';
import { FileDb } from 'jovo-db-filedb';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

const webPlatform = new WebPlatform();
webPlatform.use(
  new NlpjsNlu(),
);

app.use(webPlatform, new FileDb());


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    return this.tell('You can switch to either light or dark mode by saying "switch to dark mode" or "switch to light mode."');
  },

  SwitchThemeIntent() {
    const theme = this.$inputs.theme?.key;

    if (theme !== 'dark' && theme !== 'light') {
      return this.tell('You can switch to either light or dark mode by saying "switch to dark mode" or "switch to light mode".');
    }

    this.$webApp?.addActions([
      {
        type: ActionType.Custom,
        command: 'set-theme',
        value: theme,
      },
    ]);
    return this.tell(`OK, ${theme} mode.`);
  },

  Unhandled() {
    return this.toIntent('LAUNCH');
  }
});

export { app };
