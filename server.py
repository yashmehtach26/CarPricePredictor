from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import util

app = Flask(__name__)
CORS(app)


@app.route('/get_attributes')
def get_attributes():
    print('Hi')
    response = jsonify({
        'brand': util.load_brand_body_etype()['Brands'],
        'body': util.load_brand_body_etype()['Body'],
        'EngineType': util.load_brand_body_etype()['Engine']
    })

    return response


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    mileage = float(data['mileage'])
    volume = float(data['volume'])
    registration = data['registration']
    year = int(data['year'])
    brand = data['brand']
    body = data['body']
    engine = data['engine']
    response = jsonify({
        'price': util.predict(mileage, volume, registration, year, brand, body, engine)
    })

    return response


if __name__ == '__main__':
    print('Starting Flask Server for Car price prediction')
    app.run()
