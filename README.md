# GPT Voice Assist

A full-stack application that utilizes the OpenAI API and continuously listens for voice input in the background, converts this input to text, processes the text with the GPT-4 model, and converts the model's response back into spoken voice.

## Setup and Installation

### Prerequisites

- Node.js and npm installed on your local machine.
- An OpenAI API key.

### Installation

1. **Clone the repository** to your local machine.

    ```bash
    git clone https://github.com/yourusername/GPT-Voice-Assist.git
    ```

2. Navigate to the `/server` directory.

    ```bash
    cd GPT-Voice-Assist/server
    ```

3. **Rename** `.env.example` to `.env`.

    ```bash
    mv .env.example .env
    ```

4. Open the `.env` file in a text editor and replace `YOUR_OPENAI_KEY` with your OpenAI API key.

5. **Install the dependencies**.

    ```bash
    npm install
    ```

6. **Start the server**.

    ```bash
    node server.js
    ```

7. Open another terminal and navigate to the `/client` directory.

    ```bash
    cd ../client
    ```

8. **Install the dependencies**.

    ```bash
    npm install
    ```

9. **Start the client application**.

    ```bash
    npm start
    ```

You should now have the server running on `http://localhost:3001/` and the client running on `http://localhost:3000/`.

## Usage

1. Click on the **"Click to Speak to GPT" button** to activate voice recognition.

2. To activate GPT, say "GPT" into your device's microphone. A sound effect will play to indicate that GPT is ready to receive your command. You can say "cancel" or "nevermind" to deactivate GPT. GPT may be reactivated at any time by saying "GPT".

3. Speak your command or question to the microphone. The GPT assistant will listen to your command, send it to the OpenAI API, and convert the response back to voice.

4. Open the console to see the input and output logs. Note: logs will display only if `true` is passed as a second parameter to `GPTVoiceAssist`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
