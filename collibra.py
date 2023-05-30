import pandas as pd
import requests
import json
import json

def searchAssetUuid(name, domainId):
    url = "https://fractalanalytics.collibra.com/rest/2.0/"

    search_api = f"{url}/assets"
    search_params = {
        "name": name,
        "domainId": domainId
    }
    headers = {
        'accept': 'application/json',
        'Authorization': 'Basic aHJpc2hhYmguZ29raHJ1OkRlY2VtYmVyQDIwMjJBQkM=',
    }

    response = requests.get(url=search_api, headers=headers, params=search_params)

    if (response.json()["results"]):
        return response.json()["results"][0]["id"]

    return None


def searchAttributeUuid(assetId, attributeName):
    url = "https://fractalanalytics.collibra.com/rest/2.0/"

    search_api = f"{url}/attributes"
    search_params = {
        "assetId": assetId
    }
    headers = {
        'accept': 'application/json',
        'Authorization': 'Basic aHJpc2hhYmguZ29raHJ1OkRlY2VtYmVyQDIwMjJBQkM=',
    }

    response = requests.get(url=search_api, params=search_params, headers=headers)
    attributeId = None

    for i in response.json()["results"]:
        if (i["type"]["name"] == attributeName):
            attributeId = i["id"]

    return attributeId


def setAttribute(attributeId, value):
    url = "https://fractalanalytics.collibra.com/rest/2.0/"

    search_api = f"{url}/attributes/{attributeId}"

    payload = json.dumps({
        "value": value
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic aHJpc2hhYmguZ29raHJ1OkRlY2VtYmVyQDIwMjJBQkM=',
    }

    response = requests.patch(url=search_api, headers=headers, data=payload)
    return response.status_code


def addAttribute(assetId, attributeTypeId, value):
    url = "https://fractalanalytics.collibra.com/rest/2.0/"

    search_api = f"{url}/attributes"

    payload = json.dumps({
        "assetId": assetId,
        "typeId": attributeTypeId,
        "value": value
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic aHJpc2hhYmguZ29raHJ1OkRlY2VtYmVyQDIwMjJBQkM='
    }

    response = requests.post(url=search_api, headers=headers, data=payload)

    return response.status_code


def addTag(assetId, value):
    print(assetId)
    url = "https://fractalanalytics.collibra.com/rest/2.0"
    search_api = f"{url}/assets/{assetId}/tags"
    payload = json.dumps({
        "tagNames": value
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic aHJpc2hhYmguZ29raHJ1OkRlY2VtYmVyQDIwMjJBQkM='
    }
    response = requests.post(search_api, headers=headers, data=payload)

    return response.status_code


def runApprovalWF(assetId):
    start_workflow = 'https://fractalanalytics.collibra.com/rest/2.0/workflowInstances/'
    payload = json.dumps({
        "workflowDefinitionId": 'aa0136f5-4b0d-414a-b5cc-83fa962a96ad',
        'businessItemIds': assetId,
        'businessItemType': 'ASSET',
        "sendNotification": True
    })

    headers = {
        'accept': 'application/json',
        'Authorization': 'Basic aHJpc2hhYmguZ29raHJ1OkRlY2VtYmVyQDIwMjJBQkM=',
        'Content-Type': "application/json"
    }
    response = requests.request('POST', start_workflow, headers=headers, data=payload)
    return response.status_code