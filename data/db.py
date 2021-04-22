import requests
import os
import re
import mysql.connector
from flask import Flask, render_template, url_for, json

mydb = mysql.connector.connect(host='localhost',
                               user='k',
                               password='kpython',
                               database="test"
                               )
cursor = mydb.cursor()

# 測試看看每個網址
# photo_http = 'http://www.travel.taipei/d_upload_ttn'
# photo = taipei_fun[1]['file'].split(photo_http)
# for i in range(1, len(photo)):
#     print(f'{photo_http+photo[i]}')

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
json_url = os.path.join(SITE_ROOT,
                        "taipei-attractions.json")
data = json.load(open(json_url))
taipei_fun = data['result']['results']


def info():
    for fun in taipei_fun:
        photo_http = 'http://www.travel.taipei/'
        all_photo_len = len(fun['file'].split(photo_http))
        first_photo = fun['file'].split(photo_http)[1]
        address = fun['address'].replace(' ', '')
        # with open('xbody.txt', 'w+') as body:
        #     xbody = body.write(fun["xbody"])
        # """
        photo_http = 'http://www.travel.taipei/'
        all_photo_len = len(fun['file'].split(photo_http))
        all_photo = fun['file'].split(photo_http)
        # print(all_photo_len)
        photo_links = []

        for i in range(1, all_photo_len):
            photo = fun['file'].split(photo_http)[i]
            if not photo.endswith('mp3'):
                photo_links.append(f'{photo_http+photo}')
        # """
        if fun['MRT']:
            mrt = fun['MRT']
        if fun['info']:
            bus = re.compile(r'\公?\:?\ ?\d{2,3}')  # \公?\:?\ ?\d{2,3}
            bus_info = str(bus.findall(fun['info'])[2:5]).replace(
                '[', '').replace(']', '').replace("'", "").replace("'", "").replace(",", "、")
            # [2:5]
            # print(type(photo_links))
        else:
            bus_info = '原始資料無資訊'

        if bus_info:
            # print(bus_info)
            def insert():
                sql = "INSERT into t5(id, name, category, description, address, transport, MRT, latitude, longitude, image) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                val = (int(fun['RowNumber']), fun['stitle'], fun['CAT2'], fun["xbody"],
                       address, bus_info, mrt, fun["latitude"], fun["longitude"], str(photo_links))  # list
                cursor.execute(sql, val)
                mydb.commit()
                print(cursor.rowcount, "record inserted.")
            # insert()
            """
            print(  # {"data": {
                f' "id": {fun["RowNumber"]},\n',
                f'"name": "{fun["stitle"]}",\n',
                f'"category": "{fun["CAT2"]}",\n',
                f'"description": "{fun["xbody"]}",\n',
                f'"address": "{address}",\n',
                f'"transport": "公車：{bus_info}",\n',
                f'"MRT": "{mrt}",\n',
                f'"latitude": {fun["latitude"]}, \n',
                f'"longitude": {fun["longitude"]}, \n',
                f'"image": {photo_links}, \n',
                # }
                # }
            )
            # """
        # print(type(xbody))


def photo():
    for fun in taipei_fun:
        # http://www.travel.taipei/ #http://www.travel.taipei/d_upload_ttn
        photo_http = 'http://www.travel.taipei/'
        all_photo_len = len(fun['file'].split(photo_http))
        all_photo = fun['file'].split(photo_http)
        # print(all_photo_len)
        photo_links = []

        for i in range(1, all_photo_len):
            photo = fun['file'].split(photo_http)[i]
            if not photo.endswith('mp3'):
                photo_links.append(f'{photo_http+photo}')
                # print((str(photo_links)))
                # print((str(photo_links)))
                # for p in photo_links[2:5]:
                #     print(p)
        # val = (int(fun['RowNumber']), [(p,) for p in photo_links])
        # print(val)

        def insert():
            sql = "INSERT into p4 (pid, image) VALUES (%s,%s)"
            val = (int(fun['RowNumber']), (str(photo_links)))
            cursor.execute(sql, val)
            mydb.commit()
            print(cursor.rowcount, "record inserted.")
        # insert()

        save_photo = (f"{fun['stitle']} ,{photo_links}\n\n")
        # print(save_photo)


info()
# photo()
