from flask import *
import mysql.connector
import requests
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


@ app.route("/booking")
def booking():
    return render_template("booking.html")


@ app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


@ app.route('/api/attraction/<attractionId>')
def attractionid(attractionId):  # /api/attraction/attractionid
    status_code = 0
    try:
        cursor.execute(
            'SELECT id, name, category, description, address, transport, MRT, latitude, longitude, image  FROM t5 where pid = %s', (attractionId,))
        result = cursor.fetchone()
        # des = result[3].split("，")[0].strip()
        if result:
            # imgs = result[9].split("',")[0]
            # img = imgs.replace("['", '')
            # pic = []
            # pic.append(img)
            # print(pic)
            data = (
                {"data": {"id": result[0], "name": result[1], "category": result[2], "description": result[3], "address": result[4], "transport": "公車：" + result[5], "mrt": result[6], "latitude": result[7], "longitude": result[8], "image": result[9]}})
            # des + "，"
            return jsonify(data)
            status_code = 200
        else:
            err400 = {
                "error": True,
                "message": "Wrong ID"
            }
            status_code = 400
            return jsonify(err400)

    except:
        err500 = {
            "error": True,
            "message": "Server error"
        }
        status_code = 500
        return jsonify(err500)


@app.route('/api/attractions')  # /api/attractions?page=p
def page():
    status_code = 0
    try:
        item_per_page = 12
        page_num = request.args.get("page", 0)
        page_num = int(page_num)
        keyword = request.args.get("keyword", "")
        offset_num = page_num*item_per_page
        # print(f'page_num: {page_num}')
        # print(f'type: {type(page_num)}')

        cursor.execute('SELECT id, name, category, description, address, transport, MRT, latitude, longitude, image  FROM t5 where name like %s LIMIT 12 OFFSET %s', ("%"+keyword+"%", offset_num,)  # "%"+keyword+"%"
                       )
        results = cursor.fetchall()
        result = []
        for r in results:
            data = {
                "id": r[0],
                "name": r[1],
                "category": r[2],
                "description": r[3],
                "address": r[4],
                "transport": '公車：' + r[5],
                "mrt": r[6],
                "latitude": r[7],
                "longitude": r[8],
                "image": r[9]
            }
            # print(data)
            result.append(data)
        print(f'一開始: {len(result)}')

        if page_num == 0:
            offset_num = 0
            print(f'page_num == 0: {len(result)}')
            p_data = (
                {
                    "nextPage": page_num + 1,
                    "data": result
                }
            )
            return jsonify(p_data)
        if page_num >= 1:
            p_data = (
                {
                    "nextPage": page_num + 1,
                    "data": result
                }
            )
            print(f'page_num >= 1: {len(result)}')
            if len(result) < item_per_page:
                p_data = (
                    {
                        "nextPage": None,
                        "data": result
                    }
                )
            else:
                p_data = (
                    {
                        "nextPage": page_num + 1,
                        "data": result
                    }
                )
        return jsonify(p_data)

    except:
        err500 = {
            "error": True,
            "message": "error"
        }
        status_code = 500
        return jsonify(err500)


app.run(host="0.0.0.0", debug=True, port=3000)
