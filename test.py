import joblib
import pandas as pd

model = joblib.load("models/model.pkl")

new_data = pd.DataFrame([{
    "Temperature": 25,
    "Humidity": 60,
    "SquareFootage": 1500,
    "Occupancy": 5,
    "RenewableEnergy": 1,
    "HeatIndex": 27,
    "HVACUsage": "High",
    "LightingUsage": "Medium",
    "DayOfWeek": "Monday",
    "Holiday": "No"
}])

prediction = model.predict(new_data)

print("Prediction:", prediction)