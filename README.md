# Energy Consumption Prediction

A full-stack project for exploring, modeling, and serving energy consumption predictions using Jupyter notebooks, a Python FastAPI backend, and a Next.js frontend.

Quick links
- Backend entry: [backend/app.py](backend/app.py)
- Frontend app: [frontend/app/page.tsx](frontend/app/page.tsx)
- Dataset: [data/raw/Energy_consumption.csv](data/raw/Energy_consumption.csv)
- Notebooks: [notebooks/01_eda.ipynb](notebooks/01_eda.ipynb), [notebooks/02_Preprocessing.ipynb](notebooks/02_Preprocessing.ipynb), [notebooks/03_Modeling.ipynb](notebooks/03_Modeling.ipynb), [notebooks/4_Analysis_Results.ipynb](notebooks/4_Analysis_Results.ipynb)

Repository overview

- `backend/` — FastAPI server and model-loading code ([backend/app.py](backend/app.py)).
- `frontend/` — Next.js UI and components.
- `data/raw/` — Raw CSV dataset ([data/raw/Energy_consumption.csv](data/raw/Energy_consumption.csv)).
- `notebooks/` — EDA, preprocessing, modeling, and analysis notebooks.
- `models/` — Trained model artifacts (save `model.pkl` here).
- `requirements.txt` — Python dependencies.

Prerequisites
- Python 3.9+ and a virtual environment manager (venv/virtualenv).
- Node.js 18+ and npm (for frontend).

Backend — run the API

1. Create and activate a Python environment, then install dependencies:

```bash
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
```

2. Start the API (uses `uvicorn`) — the FastAPI app is in `backend/app.py`:

```bash
uvicorn backend.app:app --reload --host 127.0.0.1 --port 8000
```

3. Open interactive docs (if running) at `http://127.0.0.1:8000/docs`.

API endpoints (examples)

The backend exposes the following endpoints (see [backend/app.py](backend/app.py) for implementation details):

- GET / — root welcome message
- GET /health — model health/status
- POST /predict — predict energy consumption; accepts a JSON body with feature values

Health check (cURL)

```bash
curl -X GET http://127.0.0.1:8000/health
```

Predict (cURL)

Example request payload for `POST /predict` — fields match the `InputFeatures` Pydantic model in the API:

```json
{
  "Temperature": 24.5,
  "Humidity": 45.0,
  "SquareFootage": 1200.0,
  "Occupancy": 3.0,
  "RenewableEnergy": 0.2,
  "HeatIndex": null,
  "HVACUsage": "On",
  "LightingUsage": "On",
  "DayOfWeek": "Monday",
  "Holiday": "No"
}
```

Use this cURL command to post a prediction request:

```bash
curl -s -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"Temperature":24.5,"Humidity":45.0,"SquareFootage":1200.0,"Occupancy":3.0,"RenewableEnergy":0.2,"HeatIndex":null,"HVACUsage":"On","LightingUsage":"On","DayOfWeek":"Monday","Holiday":"No"}'
```

Example successful response:

```json
{ "prediction": [123.45] }
```

Notes about the model
- The app expects a serialized model at `models/model.pkl`. The application attempts to load the model on startup and exposes model error details via `/health` if loading fails (see [backend/app.py](backend/app.py)).
- If `HeatIndex` is omitted or null, the API computes a simple fallback: `HeatIndex = Temperature + 0.5 * Humidity`.

Frontend — run the web UI

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` to view the UI.

Makefile & Docker

This repo includes a `Makefile` and `docker-compose.yml` to simplify local development and containerized runs.

Makefile (common targets):
- `make up`: Build and start services with Docker Compose (uses `docker-compose.yml`).
- `make build`: Build backend and frontend containers.
- `make backend`: Start only the backend locally (virtualenv).
- `make frontend`: Start only the frontend (npm).
- `make down`: Stop and remove containers.
- `make logs`: Show combined logs.
- `make clean`: Remove built images and temporary artifacts.

Examples:

```bash
# start with Docker Compose
make up

# run backend locally in venv
make backend

# run frontend locally
make frontend

# stop containers
make down
```

Docker usage (docker-compose):

A `docker-compose.yml` is provided for containerized development. To build and run:

```bash
docker-compose build
docker-compose up -d
docker-compose logs -f
```

The backend exposes port `8000` (FastAPI) and the frontend exposes port `3000` by default — adjust ports in `docker-compose.yml` as needed.

Data & notebooks
- Reproduce analysis and model training with the notebooks in `notebooks/` (recommended order: EDA → Preprocessing → Modeling → Analysis results).
- Store final trained artifacts in `models/` and ensure `backend/app.py` can load `models/model.pkl`.

Development & improvements
- Add a `LICENSE` and `.gitignore` to exclude `myenv/` and large artifacts.
- Add unit tests for preprocessing and API endpoints.
- Consider versioning models (MLflow or timestamped filenames) and adding CI pipelines.

<!-- Contributing
- Open issues or PRs. Describe data splits, hyperparameters, and evaluation metrics when proposing new models.

Contact
- For implementation questions or dataset details, open an issue in this repo. -->

---
