from pathlib import Path

import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(
    title="HEALIX API",
    description="AI-powered healthcare decision-support prototype",
    version="1.0.0"
)

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "MODELS" / "SYMPTOMS"

model = joblib.load(MODEL_DIR / "xgboost_symptom_model.joblib")
label_encoder = joblib.load(MODEL_DIR / "symptom_label_encoder.joblib")
symptom_columns = joblib.load(MODEL_DIR / "symptom_columns.joblib")


class SymptomRequest(BaseModel):
    symptoms: list[str] = Field(min_length=1)


@app.get("/")
def home():
    return {"message": "HEALIX API is running"}


@app.get("/symptoms")
def get_symptoms():
    return {"symptoms": symptom_columns}


@app.post("/predict")
def predict(request: SymptomRequest):
    selected = request.symptoms

    unknown = [
        symptom for symptom in selected
        if symptom not in symptom_columns
    ]

    if unknown:
        raise HTTPException(
            status_code=400,
            detail={"unknown_symptoms": unknown}
        )

    if len(set(selected)) != len(selected):
        raise HTTPException(
            status_code=400,
            detail="Duplicate symptoms are not allowed."
        )

    input_data = np.zeros(
        (1, len(symptom_columns)),
        dtype=np.uint8
    )

    symptom_index = {
        symptom: index
        for index, symptom in enumerate(symptom_columns)
    }

    for symptom in selected:
        input_data[0, symptom_index[symptom]] = 1

    probabilities = model.predict_proba(input_data)[0]
    top_indices = np.argsort(probabilities)[-3:][::-1]

    predictions = []

    for index in top_indices:
        encoded_label = model.classes_[index]
        condition = label_encoder.inverse_transform(
            [int(encoded_label)]
        )[0]

        predictions.append({
            "condition": str(condition),
            "model_score_percent": round(
                float(probabilities[index]) * 100, 2
            )
        })

    return {
        "predictions": predictions,
        "disclaimer": (
            "Experimental model output only. "
            "Not a diagnosis or a substitute for medical care."
        )
    }