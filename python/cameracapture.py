import base64
import cv2

video = cv2.VideoCapture(0)

_, frame = video.read()


for i in range(30):
	_, frame = video.read()
	cv2.waitKey(100)

cv2.imwrite("img.jpg", frame);