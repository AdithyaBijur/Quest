from flask import Flask,render_template,request
import os
from execute import *
# ML starts

app = Flask(__name__)
@app.route('/')
def index():
	return render_template('index.html')



@app.route('/predict',methods=['GET','POST'])
def predict():
	reqtext = request.get_json()['quest']
	text=predicttt(reqtext)
	return text



if __name__=='__main__':
	port=int(os.environ.get('PORT',5000))
	app.debug = True
	app.run(port=port)