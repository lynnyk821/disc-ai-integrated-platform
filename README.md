# DISC Team Insights App

The DISC Team Insights App is a full-stack, AI-powered platform designed to analyze team dynamics using the DISC behavioral framework. It provides leaders and HR professionals with interactive visualizations, employee comparisons, and an AI chatbot for natural language insights into team behavior.

## 📖 Overview

This application helps visualize, compare, and analyze team members' behavioral profiles based on their DISC assessment scores.
It is designed as a full-stack solution with:

-- A powerful Spring Boot backend
-- A planned React frontend
-- Integrated AI capabilities for insights

Integrated AI capabilities for insights
## 🎯 Key Features

- **Data Upload**: Upload DISC assessment data from CSV or Excel files.
   - **Excel** → full employee information
   - **CSV** → lightweight chart data
- **Interactive Visualization**: Plot employees on a Cartesian DISC chart to see their behavioral tendencies at a glance.
- **Employee Comparison**: Select and compare multiple employees to analyze their behavioral profiles and potential synergies or conflicts.
- **AI Chatbot**: Get AI-powered insights by asking natural language questions about your team's dynamics.
- **RESTful API**: A robust backend provides comprehensive services for data management and analysis.

## 🏗️ Architecture

The application is a full-stack solution with the following components:

- **Backend**: A Spring Boot REST API handles all data processing, business logic, and API endpoints.
- **Frontend**: A modern web application using React.
- **AI Integration**: The OpenAI API powers the natural language processing for the chatbot.
- **Database**: PostgreSQL provides persistent storage for all employee and assessment data.
- **Containerization**: The entire application is packaged with Docker for easy, consistent deployment.

## 🚀 Quick Start with Docker Compose

These instructions will get the backend server up and running on your local machine.

### Prerequisites

- Docker and Docker Compose must be installed on your system.
- An OpenAI API key is required for the chatbot functionality.

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lynnyk821/disc-ai-integrated-platform
   cd disc-ai-integrated-platform
   ```

2. **Set up environment variables:**
   Configure the `docker-compose.yml` file and add your OpenAI API key:
   ```yaml
   OPENAI_API_KEY=your_open_ai_api_key
   ```
3. ** 

4. **Build and start the application:**
   ```bash
   docker-compose up --build
   ```

### Access the Application

- **Backend API**: http://localhost:8080
- **Frontend**: http://localhost:3000
- **PostgreSQL Database**: Available on port 5432
- **Redis**: Available on port 1


## 🔌 API Endpoints

The backend provides the following RESTful endpoints:

| Endpoint                 | Method | Description |
|--------------------------|--------|-------------|
| `/api/chart`             | GET | Retrieves all employee data for chart visualization. |
| `/api/employees`         | GET | Fetches a list of all employees. |
| `/api/compare/employees` | POST | Compares selected employees and returns analytical insights. |
| `/api/upload/disc`       | POST | Uploads and processes DISC assessment data from a file. |
| `/api/assistant/ask`     | POST | Sends a natural language query to the AI chatbot. |

## 🛠️ Technologies Used

### Backend
- **Spring Boot**: Application framework for the API.
- **Spring Web**: Used for developing RESTful APIs.
- **Lombok**: Reduces boilerplate code.
- **OpenCSV & Apache POI**: For parsing CSV and Excel files.
- **Redis** For AI temporary memory
- **PostgreSQL**: The relational database.
- **OpenAI Java Client**: Integrates the OpenAI API.
- **Docker**: Containerization.

### AI Service
- **Assistant**: Powers the natural language processing for insightful responses.

## 🎨 Visualization

Employees are plotted on a Cartesian plane, with each axis representing a DISC dimension:

- **Y+ axis**: Conscientiousness (C)
- **Y- axis**: Influence (I)
- **X+ axis**: Dominance (D)
- **X- axis**: Steadiness (S)

All axes range from -100 to 100, providing a clear visual representation of each employee's behavioral style.

## 💬 Chatbot Examples

You can ask the AI chatbot various questions about your team:

- "Which team members are most detail-oriented?"
- "Show me employees with high influence scores."
- "Who would work best together on a creative project?"

## 📈 Next Steps & Future Enhancements

The project has a clear roadmap for future development:

- Implement the frontend visualization component.
- Add user authentication and authorization.
- Enhance comparison algorithms with machine learning.
- Add export functionality for reports.
- Develop a mobile application version.

## 🐛 Known Limitations

- Currently supports basic CSV and Excel formats only.
- Chatbot responses depend on OpenAI API availability.
- No user management system is implemented yet.
- Visualization is currently backend-only (frontend is pending).

## 🤝 Contributing

This project is not open for public contributions at this time.

## 📄 License

This project is proprietary software developed for assessment purposes.

## 🆘 Support

For any technical issues or questions, please refer to the API documentation or contact the development team.