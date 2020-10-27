import { App } from 'jovo-framework';
import { NlpjsNlu } from 'jovo-nlu-nlpjs';
import { WebPlatform } from 'jovo-platform-web';
import { ActionType } from 'jovo-platform-core';
import { JovoDebugger } from 'jovo-plugin-debugger';
import { FileDb } from 'jovo-db-filedb';
import { LexSlu } from 'jovo-slu-lex';
import { PollyTts } from 'jovo-tts-polly';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

const webPlatform = new WebPlatform();

app.use(webPlatform, new JovoDebugger(), new FileDb());

webPlatform.use(
  new NlpjsNlu(),
  // new LexSlu({
  //   botAlias: process.env.LEX_BOT_ALIAS,
  //   botName: process.env.LEX_BOT_NAME,
  // }),
  // new PollyTts(),
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    return this.toIntent('HelloWorldIntent');
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
    return this.tell(`Alright, I am switching to ${theme} mode.`);
  },

  Unhandled() {
    return this.tell('You can switch to either light or dark mode by saying "switch to dark mode" or "switch to light mode."');
  }
});

export { app };
