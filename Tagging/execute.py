
import os
from loaded import *
# ML starts
import pickle
import numpy as np
global model, WORDS_TO_INDEX,mlb,tokenize,Nmodel,text_labels,gtokenize,gNmodel,gtext_labels
model, WORDS_TO_INDEX,mlb,tokenize,Nmodel,text_labels,gtokenize,gNmodel,gtext_labels = init()

DICT_SIZE=15000



def Bagpredict(text):
	    text=text[0]
	    from scipy import sparse as sp_sparse
	#     text='Load Machine Learning sklearn models (RandomForestClassifier) through java and send as argument to a function in python file'
	    ptext = sp_sparse.csr_matrix(my_bag_of_words(text, WORDS_TO_INDEX, DICT_SIZE))
	    predicted = model.predict(ptext)
	    final = mlb.inverse_transform(predicted)
	    return(final)


def Nmodelpredict(text):
	# text=['Load Machine Learning sklearn models (RandomForestClassifier) through java and send as argument to a function in python file']
	    yes = tokenize.texts_to_matrix(text)
	    prediction = Nmodel.predict(np.array(yes))
	    predicted_label = text_labels[np.argmax(prediction)]
	    return(predicted_label)


	

def gNmodelpredict(text):   
	#     text=['Load Machine Learning sklearn models (RandomForestClassifier) through java and send as argument to a function in python file']
	    yes = gtokenize.texts_to_matrix(text)
	    prediction = gNmodel.predict(np.array(yes))
	    predicted_label = gtext_labels[np.argmax(prediction)]
	    return(predicted_label)


def predicttt(text):
 global DICT_SIZE
 DICT_SIZE=15000
 global model, WORDS_TO_INDEX,mlb,tokenize,Nmodel,text_labels,gtokenize,gNmodel,gtext_labels
 model, WORDS_TO_INDEX,mlb,tokenize,Nmodel,text_labels,gtokenize,gNmodel,gtext_labels=init()
 print (text)
 text=[text]
 predicted1=gNmodelpredict(text)
		# print('gNmodelpredict   ',predicted)
 predicted2=Nmodelpredict(text)
		# print('Nmodelpredict   ',predicted)
 predicted3=Bagpredict(text)
		# print('Bagpredict   ',predicted)
 predict=str(predicted1)+str(predicted2)+str(predicted3)
 return (predict)











