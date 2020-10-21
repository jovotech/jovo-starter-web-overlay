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

  ColorIntent() {
    const color = this.$inputs.color?.key;

    if (!color) {
      return this.tell('I could not understand the color.');
    }

    this.$webApp?.addActions([
      {
        type: ActionType.Custom,
        command: 'set-color',
        value: color,
      },
    ]);
    return this.tell(`Alright, I am changing to ${color}.`);
  },

  HelloWorldIntent() {
    this.ask("Hello World! What's your name?", 'Please tell me your name.');
    this.$webApp?.showQuickReplies(['John', 'Eva', 'Max']);
  },

  MyNameIsIntent() {
    this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
  },
});

export { app };
