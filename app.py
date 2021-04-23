from flask import *
import mysql.connector
import requests
import math
import re

mydb = mysql.connector.connect(host='localhost',
                               user='k',
                               password='kpython',
                               database="test"
                               #    auth_plugin='mysql_native_password'
                               )

app = Flask(__name__)
app.secret_key = 'secretkey'
cursor = mydb.cursor()
app.config['JSON_SORT_KEYS'] = False
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Pages


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/attraction/<id>")
def attraction(id):
    return render_template("attraction.html")


@ app.route('/api/attraction/<attractionId>')
def attractionid(attractionId):  # /api/attraction/attractionid
    try:
        cursor.execute(
            'SELECT id, name, category, description, address, transport, MRT, latitude, longitude, image  FROM t5 where pid = %s', (attractionId,))
        result = cursor.fetchone()
        des = result[3].split("，")[0].strip()
        imgs = result[9].split("',")[0]
        img = imgs.replace("['", '')
        pic = []
        pic.append(img)
        # print(pic)
        data = (
            {"data": {"id": result[0], "name": result[1], "category": result[2], "description": des + "，", "address": result[4], "transport": "公車：" + result[5], "mrt": result[6], "latitude": result[7], "longitude": result[8], "image": pic}})
        return jsonify(data)
    except:
        return 'not yet'


@ app.route("/booking")
def booking():
    return render_template("booking.html")


@ app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


app.run(host="0.0.0.0", debug=True, port=3000)
