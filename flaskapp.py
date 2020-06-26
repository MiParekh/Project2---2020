import pandas as pd
import sqlite3
import json
from flask import Flask, jsonify, render_template

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func
# from sqlalchemy import desc

# #################################################
# # Database Setup
# #################################################
# engine = create_engine("superheroes.sqlite")

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# Characters = Base.classes.characters
# Powerstats = Base.classes.powerstats
# Rwpowers = Base.classes.rwpowers
# Bio = Base.classes.bio

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/characters")
def characters():
    conn = sqlite3.connect("resources/superheroes.sqlite")
    c = conn.cursor()
    query = """SELECT * FROM characters"""
    data = c.execute(query).fetchall()
    conn.commit()
    conn.close()

    char_list = []
    for ID, name, alignment, gender, eyecolor, race, haircolor, publisher, skincolor, height, weight in data:
        char_dict = {}
        char_dict["ID"] = ID
        char_dict["Name"] = name
        char_dict["Alignment"] = alignment
        char_dict["Gender"] = gender
        char_dict["Eyecolor"] = eyecolor
        char_dict["Race"] = race
        char_dict["HairColor"] = haircolor
        char_dict["Publisher"] = publisher
        char_dict["SkinColor"] = skincolor
        char_dict["Height"] = height
        char_dict["Weight"] = weight
        char_list.append(char_dict)

    return jsonify(char_list)


if __name__ == '__main__':
    app.run(debug=True)
