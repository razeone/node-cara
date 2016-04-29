# MODO DE USO
# python eye_tracker.py img1 margen1 img2 margen2 widthheight


import sys
import cv2
import numpy as np


# Dada una imagen donde hay un ojo (relativamente cerca) y un margen
# calcula la posicion del centro del iris y el radio.
# Devuelve una imagen cuadrada conteniendo al iris y centrada en el centro
# del iris pero con un margen.

def getIris(eye_url, margen):


	img_color = cv2.imread(eye_url)

	img = cv2.imread(eye_url,0)

	img_aux = cv2.GaussianBlur(img,(7,7),2)
	cimg = cv2.cvtColor(img_aux,cv2.COLOR_GRAY2BGR)

	circles = cv2.HoughCircles(img_aux,cv2.HOUGH_GRADIENT,1,2,
	                            param1=60,param2=70,minRadius=0,maxRadius=0)

	if circles == None:
		return []

	circles = np.uint16(np.around(circles))

	"""""
	for i in circles[0,:]:
	    # draw the outer circle
	    cv2.circle(cimg,(i[0],i[1]),i[2],(0,255,0),2)
	    # draw the center of the circle
	    cv2.circle(cimg,(i[0],i[1]),2,(0,0,255),3)

	"""""

	# promedios, radio, x, y

	r_p = 0
	x_p = 0
	y_p = 0

	xs = [c[0] for c in circles[0,:]]
	ys = [c[1] for c in circles[0,:]]
	rs = [c[2] for c in circles[0,:]]

	x_p = sum(xs) / len(circles[0,:])
	y_p = sum(ys) / len(circles[0,:])
	r_p = sum(rs) / len(circles[0,:])

	#the startY and endY coordinates, followed by the startX and endX coordinates
	img_cortada = img_color[y_p - (r_p + margen) : y_p + (r_p + margen), x_p - (r_p + margen): x_p + (r_p + margen) ]

	
	return img_cortada
	#cv2.circle(cimg, (x_p, y_p), r_p, (0,255,0), 2)
	#cv2.circle(cimg, (x_p, y_p), 2, (0,0,255), 3)


	#cv2.imshow('Iris encontrado',cimg)
	#cv2.waitKey(0)
	#cv2.destroyAllWindows()


# son cuadrados!


# Toma una imagen a color y la corta por la mitad haciendo un corte vertical.
# devuelve un arreglo con las dos mitades

def cortaEnMedio(img_color):
	h,w,c = img_color.shape
	return [img_color[ 0 : h , 0 : w / 2], img_color[ 0 : h , w / 2 : w]]





print "Jean desde python "

ojo1 = getIris(sys.argv[1], int(sys.argv[2]))

ojo2 = getIris(sys.argv[3], int(sys.argv[4]))


if(len(ojo1) == 0):
	print "No se detecto iris en el ojo 1"
	sys.exit()


if(len(ojo2) == 0):
	print "No se detecto iris en el ojo 2"
	sys.exit()



r_ojo1 = cv2.resize(ojo1,(int(sys.argv[5]), int(sys.argv[5])),interpolation = cv2.INTER_AREA)
r_ojo2 = cv2.resize(ojo2,(int(sys.argv[5]), int(sys.argv[5])),interpolation = cv2.INTER_AREA)

cortado1 = cortaEnMedio(r_ojo1)
cortado2 = cortaEnMedio(r_ojo2)

cv2.imwrite("iris_izq.png", cortado1[0])

cv2.imwrite("iris_der.png", cortado2[1])

"""""
if alto1 >= alto2:
	#resized = cv2.resize(ojo1,(dims2[0], dims2[1]),interpolation = cv2.INTER_AREA)
	resized = cv2.resize(ojo1,(sys.argv[5], 500),interpolation = cv2.INTER_AREA)
	cv2.imwrite("rezized.png", resized)

if alto1 < alto2:
	#resized = cv2.resize(ojo2,(dims1[0], dims1[1]),interpolation = cv2.INTER_AREA)
	resized = cv2.resize(ojo2,(500, 500),interpolation = cv2.INTER_AREA)
	cv2.imwrite("rezized.png", resized)
"""""

