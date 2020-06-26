import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import desc

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("superheroes.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Characters = Base.classes.characters
Powerstats = Base.classes.powerstats
Rwpowers = Base.classes.rwpowers
Bio = Base.classes.bio

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

# Convert the query results to a dictionary using `date` as the 
# key and `prcp` as the value.
@app.route("/characters")
def precipitation():
    session = Session(engine)
    results = session.query(Characters).all()
    session.close()

    char_list = []
    for name, alignment, gender in results:
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
        _list.append(char_dict)
    
    return jsonify(char_list)

if __name__ == '__main__':
    app.run(debug=True)
