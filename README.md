# Rate My Idea

A web app that rates your idea out of 100 using AI and live GitHub trends.

## Features
- Speedometer-style rating gauge (0–100).
- Heuristic scoring based on trend alignment, clarity, novelty, and commonality penalty.
- Optional # 💡 Rate My Idea

<p align="center">
  <strong>Think it. Test it. Rate its potential.</strong>
  <br />
  An AI-powered idea evaluator that analyzes your ideas using live GitHub trends and gives them a score out of 100.
</p>

<p align="center">
  <a href="https://sgx070.github.io/rate-my-idea/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Try_It-4CAF50?style=for-the-badge" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

---

## 🚀 About the Project

Ever had an interesting project idea but wondered whether it's actually worth building?

**Rate My Idea** helps you explore that question.

Describe your idea, analyze its potential, and receive a score based on several factors, including trend alignment, clarity, novelty, and commonality.

It also brings in recently trending GitHub repositories to give you a glimpse of what's happening in the developer ecosystem.

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 Idea Rating | Get an overall score from 0–100. |
| 📊 Visual Score Gauge | An animated speedometer-style rating display. |
| 📈 Trend Analysis | Compare your idea with recently popular GitHub repositories. |
| 🧠 AI Evaluation | Optional AI-powered evaluation using the OpenAI API. |
| 🔍 Score Breakdown | Understand how different factors influence your score. |
| 🔮 Future Insights | Get thoughts about your idea's potential and possible improvements. |
| ⚡ Lightweight | Pure HTML, CSS and JavaScript. No build tools required. |

## 🖥️ Preview

<!-- Add your actual application screenshot here -->
<p align="center">
  <img src="assets/screenshot.png" alt="Rate My Idea application preview" width="90%" />
</p>

> Replace this placeholder with a screenshot of your actual application.

## ⚙️ How It Works

Your idea is evaluated using a combination of scoring factors:

| Factor | What it evaluates |
|---|---|
| 📈 Trend Alignment | Keyword overlap with trending GitHub projects. |
| 📝 Clarity | How much detail your idea contains. |
| 💡 Novelty | A bonus based on the current heuristic's commonality check. |
| ⚠️ Commonality | A penalty for frequently used project concepts and buzzwords. |
| 🎯 Base Score | A starting score of 30 points. |

The application combines these factors to generate a final score between 0 and 100.

### Rating Verdicts

| Score | Verdict |
|---|---|
| 85–100 | 🔥 Excellent |
| 70–84 | ✅ Strong |
| 50–69 | 🟡 Promising |
| 30–49 | 🟠 Weak |
| 0–29 | ❌ Poor |

*Note: These are heuristic estimates, not scientifically validated predictions of business or project success.*

## 🧠 AI-Powered Evaluation

Want a more AI-driven analysis?

Enable **Use AI** and provide your own OpenAI API key.

The application uses the `gpt-4o-mini` model to evaluate your idea and return:

- An overall score.
- A scoring breakdown.
- Thoughts about future potential.
- Suggestions for improving your idea.

If AI evaluation fails, the application falls back to heuristic scoring.

## 📡 Live GitHub Trends

The application fetches recently created GitHub repositories using the GitHub Search API.

It displays:
- Repository names.
- Project descriptions.
- Star counts.
- Direct links to GitHub repositories.

Trend data is refreshed every five minutes.

## 🛠️ Built With

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub REST API
- OpenAI API (optional)

No frameworks, databases, or build systems are required.

## 🚀 Getting Started

### Option 1: Try Online

No installation required!

👉 **[Launch Rate My Idea](https://sgx070.github.io/rate-my-idea/)**

### Option 2: Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/SGx070/rate-my-idea.git
   ```

2. Open the project folder:

   ```bash
   cd rate-my-idea
   ```

3. Open `index.html` in your browser.

That's it! No dependencies or build steps required.

## 🔑 OpenAI API Configuration

AI evaluation is optional.

1. Obtain an API key from the [OpenAI Platform](https://platform.openai.com/api-keys).
2. Open Rate My Idea.
3. Enter your API key in the API key field.
4. Enable **Use AI**.
5. Enter your idea and click **Rate**.

**Security note:** This is a browser-based application. Your API key and idea are sent directly to OpenAI when AI evaluation is enabled. Do not use a personal API key on a publicly shared deployment. For production use, a secure backend is recommended.

## 📁 Project Structure

```text
rate-my-idea/
│
├── index.html       # Application structure
├── styles.css       # Styling and layout
├── app.js           # Scoring, AI and GitHub integration
├── assets/
│   └── screenshot.png
├── LICENSE
└── README.md
```

The `assets/screenshot.png` file is an optional addition for the README preview.

## 🔮 Future Improvements

Some ideas for future development:

- [ ] More advanced idea analysis.
- [ ] Better novelty and competitor detection.
- [ ] Detailed scoring visualizations.
- [ ] Idea history and saved evaluations.
- [ ] More detailed market and feasibility insights.
- [ ] Improved AI-generated recommendations.

## 🤝 Contributing

Suggestions, bug reports, and contributions are welcome!

1. Fork this repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/SGx070">SGx070</a>
  <br />
  ⭐ If you find this project interesting, consider giving it a star!
</p>AI rating via OpenAI API key.
- Live trending GitHub repositories displayed for context.
- AI thoughts on future performance.

## Run
Click https://sgx070.github.io/rate-my-idea/ to run in a browser. No build step required.
