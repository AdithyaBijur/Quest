import pickle
import numpy as np
def init():
	DICT_SIZE=15000
	with open('/home/adithya/Desktop/mybag_vectorizer','rb') as f:
	    model=pickle.load(f)
	with open('/home/adithya/Desktop/WORDS_TO_INDEX','rb') as f:
	   WORDS_TO_INDEX=pickle.load(f)
	with open('/home/adithya/Desktop/mlb','rb') as f:
	    mlb=pickle.load(f)


	# Now multi neural

	with open('/home/adithya/Desktop/tokenize','rb') as f:
	    tokenize=pickle.load(f)
	with open('/home/adithya/Desktop/Nmodel','rb') as f:
	    Nmodel=pickle.load(f)
	with open('/home/adithya/Desktop/text_labels','rb') as f:
	    text_labels=pickle.load(f)


	with open('/home/adithya/Desktop/gtokenize','rb') as f:
	    gtokenize=pickle.load(f)
	with open('/home/adithya/Desktop/gNmodel','rb') as f:
	    gNmodel=pickle.load(f)
	with open('/home/adithya/Desktop/gtext_labels','rb') as f:
	    gtext_labels=pickle.load(f)
	return model, WORDS_TO_INDEX,mlb,tokenize,Nmodel,text_labels,gtokenize,gNmodel,gtext_labels

def my_bag_of_words(text, words_to_index, dict_size):
    """
        text: a string
        dict_size: size of the dictionary
        
        return a vector which is a bag-of-words representation of 'text'
    """
    
    result_vector = np.zeros(dict_size)
    for word in text.split():
        if word in words_to_index:
            result_vector[words_to_index[word]] += 1
    
    return result_vector