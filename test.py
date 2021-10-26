import requests

BASE = "http://localhost:9876/"

token = ';)'

response = requests.get(BASE + f"msk/admin/createImg?token={token}", {})
print(response.json())