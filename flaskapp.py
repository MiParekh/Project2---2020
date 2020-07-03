import pandas as pd
import sqlite3
import json
from flask import Flask, jsonify, render_template, url_for

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


#################################################
# HTML ROUTES

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/feat_character")
def feat_character(chosenCharacter):
    character = None
    if character in bio_list:
        character = bio_list["name"]
    return render_template("feat_character.html", chosenCharacter=chosenCharacter, character=character)

@app.route("/charts")
def charts():
    return render_template("charts.html")

@app.route("/bar")
def bar():
    return render_template("bar.html")

@app.route("/scatter")
def scatter():
    return render_template("scatter.html")

@app.route("/sunburst")
def sunburst():
    return render_template("sunburst.html")

@app.route("/wordcloud")
def wordcloud():
    return render_template("wordcloud.html")








#################################################
# JS ROUTES

# Character Route
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


# Power Route
@app.route("/powerstats")
def powerstats():
    conn = sqlite3.connect("resources/superheroes.sqlite")
    c = conn.cursor()
    query = """SELECT * FROM powerstats"""
    data = c.execute(query).fetchall()
    conn.commit()
    conn.close()

    power_list = []
    for name, alignment, intelligence, strength, speed, durability, power, combat, total in data:
        power_dict = {}
        power_dict["Name"] = name
        power_dict["Alignment"] = alignment
        power_dict["Intelligence"] = intelligence
        power_dict["Strength"] = strength
        power_dict["Speed"] = speed
        power_dict["Durability"] = durability
        power_dict["Power"] = power
        power_dict["Combat"] = combat
        power_dict["Total"] = total
        power_list.append(power_dict)

    return jsonify(power_list)

# RWPowers
@app.route("/rwpowers")
def rwpowers():
    conn = sqlite3.connect("resources/superheroes.sqlite")
    c = conn.cursor()
    query = """SELECT * FROM rwpowers"""
    data = c.execute(query).fetchall()
    conn.commit()
    conn.close()

    rw_list = []
    for superhero, superpower, issueresolution in data:
        rw_dict = {}
        rw_dict["superhero"] = superhero
        rw_dict["superpower"] = superpower
        rw_dict["issueresolution"] = issueresolution
        rw_list.append(rw_dict)

    return jsonify(rw_list)

# Bio
@app.route("/bio")
def bio():
    conn = sqlite3.connect("resources/superheroes.sqlite")
    c = conn.cursor()
    query = """SELECT * FROM bio"""
    data = c.execute(query).fetchall()
    conn.commit()
    conn.close()

    bio_list = []
    for name, full_name, alter_egos, birthplace, occupation, image_url in data:
        bio_dict = {}
        bio_dict["name"] = name
        bio_dict["full_name"] = full_name
        bio_dict["alter_egos"] = alter_egos
        bio_dict["birthplace"] = birthplace
        bio_dict["occupation"] = occupation
        bio_dict["image_url"] = image_url
        bio_list.append(bio_dict)

    return jsonify(bio_list)

# chosenCharacter
@app.route("/profile/<chosenCharacter>")
def chosenCharacter(chosenCharacter):
    conn = sqlite3.connect("resources/superheroes.sqlite")
    c = conn.cursor()
    query = f"""SELECT * FROM bio
                WHERE name ='{chosenCharacter.title()}'"""
    data = c.execute(query).fetchall()
    conn.commit()
    conn.close()

    bio_list = []
    for name, full_name, alter_egos, birthplace, occupation, image_url in data:
        bio_dict = {}
        bio_dict["name"] = name
        bio_dict["full_name"] = full_name
        bio_dict["alter_egos"] = alter_egos
        bio_dict["birthplace"] = birthplace
        bio_dict["occupation"] = occupation
        bio_dict["image_url"] = image_url
        bio_list.append(bio_dict)

    return jsonify(bio_list)


if __name__ == '__main__':
    app.run(debug=True)



