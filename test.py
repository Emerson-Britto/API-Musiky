import requests

BASE = "http://localhost:9876/"

token = 'BQAAk0NLn9JVN2vOeF8t87ZBjFEJliH3c5-GyYJ_6o2ca4pFnv3vDOjLYymkBRrKNbtn8CS-ZQZmD6Tsvf2jQxWSdpx5XNmaEJ7vSuo6SykqJiG9h2hiqQkL_OmHfHzCUPu5bbhK4mD9CO7j8Wvb4xFC5A1R1IdjK_wXg4wErGH07Ydinw'

response = requests.get(BASE + f"msk/admin/createImg?token={token}", {})
print(response.json())