import base64
import cv2

video = cv2.VideoCapture(0)

_, frame = video.read()


for i in range(30):
	_, frame = video.read()

_, im_arr = cv2.imencode('.jpg', frame)
im_b64 = base64.b64encode(im_arr)
print(im_b64.decode('ascii'))