import requests

response = requests.get("http://api.vedicrishiastro.com/v1/&api_key='9dcdcaaaf86621a33439f6a93ab8d17e'&user_id='619445'")
print(response.status_code)