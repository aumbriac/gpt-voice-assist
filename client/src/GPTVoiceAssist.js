export default class GPTVoiceAssist {
  constructor(apiUrl, includeLogs = false) {
    this.includeLogs = includeLogs;
    this.apiUrl = apiUrl;
    this.recognition = null;
    this.triggerPhraseHeard = false;
    this.recognitionInProgress = false;
    this.processingAnswer = false;
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.synth.onvoiceschanged = () => {
      this.voices = this.synth.getVoices();
    };

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!this.synth) {
      console.warn("Your browser does not support Speech Synthesis");
    }

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "en-US";
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    } else {
      console.warn("Your browser does not support Speech Recognition");
    }
  }

  speak(text) {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    this.processingAnswer = true;
    let utterThis = new SpeechSynthesisUtterance(text);
    if (this.voices[33]) {
      utterThis.voice = this.voices[33];
      utterThis.rate = 0.8;
      utterThis.pitch = 1.1;
    }
    this.synth.speak(utterThis);

    utterThis.onend = () => {
      this.processingAnswer = false;
      setTimeout(() => this.listen(), 1000);
    };
  }

  listen() {
    if (
      this.processingAnswer ||
      !this.recognition ||
      this.recognitionInProgress
    )
      return;

    this.recognitionInProgress = true;

    this.recognition.onerror = () => {
      this.recognitionInProgress = false;
      setTimeout(() => this.listen(), 1000);
    };

    this.recognition.onend = () => {
      this.recognitionInProgress = false;
      if (!this.synth.speaking) {
        this.listen();
      }
    };

    this.recognition.onresult = async (event) => {
      const speechResult = event.results[0][0].transcript;
      if (
        this.triggerPhraseHeard &&
        ["cancel", "nevermind", "never mind"].includes(
          speechResult.trim().toLowerCase()
        )
      ) {
        this.triggerPhraseHeard = false;
        return;
      }

      if (
        !this.triggerPhraseHeard &&
        speechResult.trim().toLowerCase() === "gpt"
      ) {
        let audio = new Audio("./magic.mp3");
        audio.play();
        this.triggerPhraseHeard = true;
        return;
      }

      if (this.triggerPhraseHeard) {
        const response = await this.askGPT(speechResult);
        let audio = new Audio("./subtle.mp3");
        audio.play();
        if (response) {
          setTimeout(() => {
            this.triggerPhraseHeard = false;
            this.speak(response);
          }, 1000);
        }
      }
    };

    this.recognition.start();
  }

  isActive() {
    return this.triggerPhraseHeard;
  }

  isListening() {
    return this.recognitionInProgress;
  }

  isProcessingAnswer() {
    return this.processingAnswer;
  }

  async askGPT(question) {
    try {
      this.processingAnswer = true;
      this.includeLogs &&
        console.log(`Calling OpenAI API for question: ${question}`);
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: question }),
      });
      if (response.ok) {
        const data = await response.json();
        this.includeLogs && console.log("Obtained response...", data);
        return data;
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (err) {
      this.processingAnswer = false;
      console.error("Error calling OpenAI:", err);
      throw err;
    }
  }
}
