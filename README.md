🧱 STEP 1 — Data Understanding (EDA)
📌 دير:
import pandas as pd

df = pd.read_csv("Energy_consumption.csv")
df.head()
df.info()
df.describe()

خاصك تجاوب على:

شحال عدد rows؟

واش كاين missing values؟

شنو target column؟

واش HVACUsage و LightingUsage categorical؟




📊 STEP 2 — Data Cleaning & Preprocessing
✅ 1. Convert Timestamp
df["Timestamp"] = pd.to_datetime(df["Timestamp"])
df["hour"] = df["Timestamp"].dt.hour
df["month"] = df["Timestamp"].dt.month


حيت time مهم بزاف فـ energy.

الهدف ديالك

Predict:

🔮 Energy Consumption (Target variable)

يعني عندنا Regression Problem (حيت القيمة رقمية).

🧱 STEP 1 — Data Understanding (EDA)
📌 دير:
import pandas as pd

df = pd.read_csv("Energy_consumption.csv")
df.head()
df.info()
df.describe()

خاصك تجاوب على:

شحال عدد rows؟

واش كاين missing values؟

شنو target column؟

واش HVACUsage و LightingUsage categorical؟

📊 STEP 2 — Data Cleaning & Preprocessing
✅ 1. Convert Timestamp
df["Timestamp"] = pd.to_datetime(df["Timestamp"])
df["hour"] = df["Timestamp"].dt.hour
df["month"] = df["Timestamp"].dt.month


حيت time مهم بزاف فـ energy.

✅ 2. Encode Categorical Variables

HVACUsage (On/Off)

LightingUsage (On/Off)

DayOfWeek

Holiday

استعمل:

df = pd.get_dummies(df, drop_first=True)

✅ 3. Separate X and y
X = df.drop("EnergyConsumption", axis=1)
y = df["EnergyConsumption"]

⚙ STEP 3 — Train/Test Split
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

🤖 STEP 4 — Baseline Model

بدا بـ Linear Regression:

from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)

pred = model.predict(X_test)

📏 STEP 5 — Evaluate Model

استعمل:

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

print("MAE:", mean_absolute_error(y_test, pred))
print("RMSE:", mean_squared_error(y_test, pred, squared=False))
print("R2:", r2_score(y_test, pred))

🚀 STEP 6 — Try Better Models

جرب:

Random Forest

Gradient Boosting

XGBoost

from sklearn.ensemble import RandomForestRegressor

rf = RandomForestRegressor()
rf.fit(X_train, y_train)


غالباً Random Forest يعطي نتيجة أحسن.

📈 STEP 7 — Feature Importance

باش تعرف شنو كيأثر أكثر:

import matplotlib.pyplot as plt

importance = rf.feature_importances_
plt.barh(X.columns, importance)
plt.show()

🧠 STEP 8 — Advanced (Optional)

زيد:

Hyperparameter tuning (GridSearchCV)

Cross validation

Feature scaling (StandardScaler)

Time-series split بدل random split

🎓 شنو تعلمتي من هاد المشروع؟

✔ Data Cleaning
✔ Feature Engineering
✔ Regression Models
✔ Model Evaluation
✔ Comparison بين Models

هاد المشروع كيدخلك فـ ML Engineer mode 🔥

🎯 بغيتي نوصلو لمستوى أقوى؟

نقدر نخدمو المشروع بحال production:

FastAPI API

Deploy model

Docker

CI/CD

ولا بغيتي:
نخدمو خطوة بخطوة مع بعضنا من البداية؟

قولّي واش بغيتي نبدأو بالـ EDA دابا 👀

✅ 2. Encode Categorical Variables

HVACUsage (On/Off)

LightingUsage (On/Off)

DayOfWeek

Holiday

استعمل:

df = pd.get_dummies(df, drop_first=True)



energy-consumption-prediction/
│
├── data/
│   ├── raw/
│   │   └── Energy_consumption.csv
│   └── processed/
│
├── notebooks/
│   └── 01_eda.ipynb
│
├── src/
│   ├── data_preprocessing.py
│   ├── train.py
│   ├── evaluate.py
│   └── utils.py
│
├── models/
│   └── model.pkl
│
├── requirements.txt
├── README.md
└── main.py



commande to install env

python3 -m venv venv

pip install pandas numpy matplotlib seaborn scikit-learn joblib







++++++++++++++++++++++++Explanation of the Notebook++++++++++++++++++++++++++++++++
This notebook performs Energy Consumption Prediction using Linear Regression. Here's what each section does:

1. Load Data

df = pd.read_csv("../data/raw/Energy_consumption.csv")
Loads the energy consumption dataset from CSV.

2. Exploratory Data Analysis (EDA)
df.head() - Shows first few rows
df.info() - Shows data types and missing values
df.describe() - Shows statistical summary
sns.histplot() - Shows distribution of Energy Consumption
3. Feature Engineering

df["Timestamp"] = pd.to_datetime(df["Timestamp"])
df["hour"] = df["Timestamp"].dt.hour
df["day"] = df["Timestamp"].dt.day
df["month"] = df["Timestamp"].dt.month
df["year"] = df["Timestamp"].dt.year
df = df.drop("Timestamp", axis=1)
df = pd.get_dummies(df, drop_first=True)
Extracts time features (hour, day, month, year) from Timestamp
Converts categorical variables (HVACUsage, LightingUsage, DayOfWeek, Holiday) to numeric using one-hot encoding
4. Split Data

X = df.drop("EnergyConsumption", axis=1)
y = df["EnergyConsumption"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
Separates features (X) and target (y)
Splits into 80% training and 20% testing data
5. Train Model

model = LinearRegression()
model.fit(X_train, y_train)
Trains a Linear Regression model on training data
6. Evaluation

predictions = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, predictions))
print("R2 Score:", r2_score(y_test, predictions))
Makes predictions on test data
Calculates Mean Squared Error (MSE) and R² Score
7. Visualization
Correlation heatmap showing relationships between features
Scatter plot of Actual vs Predicted Energy Consumption
Results:
The model predicts energy consumption based on features like Temperature, Humidity, SquareFootage, Occupancy, HVAC usage, Lighting usage, etc. The evaluation metrics (MSE and R² Score) show how accurate the predictions are.