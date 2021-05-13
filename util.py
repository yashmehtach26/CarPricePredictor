import json
import pickle
import numpy as np
__Brand = None
__Body = None
__EngineType = None
__columns = None
__model = None
__data = None
__scaler = None


def get_data():
    __data = {
        'Brands': __Brand,
        'Body': __Body,
        'Engine': __EngineType
    }
    return __data


def predict(mileage, volume, registration, year, brand, body, engine):
    global __columns
    global __Brand
    global __Body
    global __EngineType
    global __model
    global __scaler

    brand_index = __columns.index(brand.lower())
    body_index = __columns.index(body.lower())
    etype_index = __columns.index(engine.lower())
    x = np.zeros(len(__columns))
    x[0] = mileage
    x[1] = volume
    x[2] = 1 if registration.upper() == 'YES' else 0
    x[3] = year
    x[brand_index] = x[body_index] = x[etype_index] = 1
    xtoscale = x.reshape(1, 19)
    x_scaled = __scaler.transform(xtoscale)
    return round(np.exp(__model.predict(x_scaled)[0]), 2)


def load_brand_body_etype():
    global __columns
    global __Brand
    global __Body
    global __EngineType
    global __model
    global __scaler

    with open("D:/Data Science/Projects/CPP/server/artifacts/Columns.json", 'r') as f:
        __columns = json.load(f)['data_cols']
        __Brand = __columns[4:10]
        __Body = __columns[11:15]
        __EngineType = __columns[16:19]
    with open("D:/Data Science/Projects/CPP/server/artifacts/CarPricePredictionModel.pickle", 'rb') as f:
        __model = pickle.load(f)
    with open("D:/Data Science/Projects/CPP/server/artifacts/Scaler.pickle", 'rb') as f:
        __scaler = pickle.load(f)
    data = get_data()
    return data


if __name__ == '__main__':
    data = load_brand_body_etype()
    print(data)
    # price = predict(21, 2, 'yes', 2013, 'Toyota', 'crossover', 'Petrol')
    # print(price)
