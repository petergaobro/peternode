const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'your api key',
  }),
  serviceUrl: 'your service url',
});


const synthesizeParams = {
  text: 'Greeting from PG repo, thank you very much.',
  accept: 'audio/wav',
  voice: 'en-US_AllisonV3Voice',
};

textToSpeech.synthesize(synthesizeParams)
  .then(response => {
    // The following line is necessary only for
    // wav formats; otherwise, `response.result`
    // can be directly piped to a file.
    return textToSpeech.repairWavHeaderStream(response.result);
  })
  .then(buffer => {
    fs.writeFileSync('myAudio.wav', buffer);
  })
  .catch(err => {
    console.log('error:', err);
  });
