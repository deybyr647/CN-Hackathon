from pynotifier import Notification
import json

with open("../client/results.json") as f:
	app = json.loads(f.read())["results"][-1]["app"]

Notification(
	title='You seem upset',
	description=f"maybe try taking a break from '{app}'",
	duration=5,
	urgency=Notification.URGENCY_CRITICAL
).send()