from pathlib import Path
from typing import Optional, Literal

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Energy Consumption Prediction API")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputFeatures(BaseModel):
    Temperature: float
    Humidity: float
    SquareFootage: float
    Occupancy: float
    RenewableEnergy: float
    HeatIndex: Optional[float] = None
    HVACUsage: str
    LightingUsage: str
    DayOfWeek: str
    Holiday: str


def _model_path() -> Path:
    return Path(__file__).resolve().parents[1] / "models" / "model.pkl"



def load_model(path: Optional[Path] = None):
    path = path or _model_path()
    if not path.exists():
        raise FileNotFoundError(f"Model file not found: {path}")
    return joblib.load(path)


@app.on_event("startup")
def startup_event():
    try:
        app.state.model = load_model()
    except Exception as e:
        app.state.model = None
        app.state.model_error = str(e)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Energy Consumption Prediction API!"}


@app.get("/health")
def health():
    if getattr(app.state, "model", None) is None:
        return {
                "status": "degraded",
                "model_error": getattr(app.state, "model_error",None)
            }
    return {"status": "ok"}


@app.post("/predict")
def predict(features: InputFeatures):
    if getattr(app.state, "model", None) is None:
        raise HTTPException(status_code=500, detail={"error": "Model not loaded", "info": getattr(app.state, "model_error", None)})

    data = features.dict()

    if data.get("HeatIndex") is None:
        data["HeatIndex"] = data["Temperature"] + 0.5 * data["Humidity"]

    df = pd.DataFrame([data])

    try:
        preds = app.state.model.predict(df)
    except Exception as e:
        raise HTTPException(status_code=500, detail={"error": "Prediction failed", "exception": str(e)})

    return {"prediction": preds.tolist()}
